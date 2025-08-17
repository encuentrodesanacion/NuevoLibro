const express = require("express");
const path = require("path");
require("dotenv").config();
const paypal = require("@paypal/checkout-server-sdk");
const { Pool } = require("pg"); // 1. Importamos Pool de pg
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const pgUri = process.env.PG_URI; // 2. Obtenemos la URI de PostgreSQL
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verificar que las credenciales y la URI existen
if (!clientId || !clientSecret || !pgUri) {
  console.error(
    "❌ ERROR: PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET o PG_URI no encontrados en el archivo .env."
  );
  process.exit(1);
}

// 3. Conexión a la base de datos PostgreSQL
const pool = new Pool({
  connectionString: pgUri,
});

// 4. Función para crear la tabla de pedidos si no existe
const createOrdersTable = async () => {
  try {
    const client = await pool.connect();
    const query = `
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        paypal_order_id VARCHAR(255) UNIQUE NOT NULL,
        payer_id VARCHAR(255),
        payer_name VARCHAR(255),
        payer_email VARCHAR(255),
        price VARCHAR(20),
        status VARCHAR(50),
        purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await client.query(query);
    console.log("✅ Tabla de pedidos verificada o creada con éxito.");
    client.release();
  } catch (err) {
    console.error("❌ Error al crear la tabla de pedidos:", err);
  }
};

createOrdersTable();

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// Endpoint para crear una orden de pago
app.post("/api/orders", async (req, res) => {
  console.log("➡️ Petición recibida para crear una orden de pago.");

  // Recibir el precio desde el frontend
  const { price } = req.body;

  if (!price) {
    return res.status(400).json({ error: "Falta el precio del producto." });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: price, // Usar el precio recibido del frontend
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    console.log("✅ Orden de PayPal creada con éxito. ID:", order.result.id);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error("❌ ERROR al crear la orden de PayPal:", err);
    res.status(500).json({ error: err.message });
  }
});
// ...código existente

// Endpoint para registrar la información de envío
app.post("/api/registro-envio", async (req, res) => {
  console.log("➡️ Petición recibida para registrar información de envío.");

  const {
    nombre_completo,
    numero_telefono,
    region,
    comuna,
    direccion_casa,
    correo_electronico,
    codigo_postal,
  } = req.body;

  // Validación básica de los datos
  if (
    !nombre_completo ||
    !numero_telefono ||
    !region ||
    !comuna ||
    !direccion_casa ||
    !correo_electronico
  ) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  try {
    const query = `
      INSERT INTO usuarios_envio (nombre_completo, numero_telefono, region, comuna, direccion_casa, correo_electronico, codigo_postal)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
    `;
    const values = [
      nombre_completo,
      numero_telefono,
      region,
      comuna,
      direccion_casa,
      correo_electronico,
      codigo_postal,
    ];

    const result = await pool.query(query, values);
    const nuevoRegistroId = result.rows[0].id;

    // Lógica para enviar el correo de notificación
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: correo_electronico,
      subject: "¡Hemos recibido tu información de envío!",
      html: `
        <p>Hola ${nombre_completo},</p>
        <p>¡Gracias por tu compra! Hemos recibido tu información de envío y te avisaremos en cuanto tu libro esté listo para ser enviado.</p>
        <p>A continuación, un resumen de los datos que nos proporcionaste:</p>
        <ul>
          <li><strong>Dirección:</strong> ${direccion_casa}, ${comuna}, ${region}</li>
          <li><strong>Código Postal:</strong> ${codigo_postal || "N/A"}</li>
          <li><strong>Teléfono de contacto:</strong> ${numero_telefono}</li>
        </ul>
        <p>Estamos trabajando para que tu libro "Levántate y Pelea" llegue lo antes posible.</p>
        <p>¡Saludos cordiales!</p>
        <p>El equipo de Levántate y Pelea</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(
      "✅ Información de envío guardada y correo de notificación enviado con éxito. ID:",
      nuevoRegistroId
    );
    res.status(201).json({
      message:
        "Información de envío guardada y correo de notificación enviado con éxito.",
      id: nuevoRegistroId,
    });
  } catch (err) {
    console.error(
      "❌ ERROR al guardar la información de envío o al enviar el correo:",
      err
    );
    res.status(500).json({ error: "Error al procesar la solicitud." });
  }
});
// Endpoint para capturar el pago y guardar en la DB
// Endpoint para capturar el pago y guardar en la DB
app.post("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  console.log(`➡️ Petición recibida para capturar el pago con ID: ${orderID}`);
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    console.log("✅ Pago capturado con éxito. Detalles:", capture.result);

    const paypalOrder = capture.result;
    if (paypalOrder.status === "COMPLETED") {
      const payerInfo = paypalOrder.payer;

      // Obtener el precio desde la nueva ubicación en la respuesta de PayPal
      const orderPrice =
        paypalOrder.purchase_units[0].payments.captures[0].amount.value;

      const client = await pool.connect();
      try {
        const query = `
          INSERT INTO orders(paypal_order_id, payer_id, payer_name, payer_email, price, status)
          VALUES($1, $2, $3, $4, $5, $6)
          ON CONFLICT (paypal_order_id) DO NOTHING;
        `;
        const values = [
          paypalOrder.id,
          payerInfo.payer_id,
          `${payerInfo.name.given_name} ${payerInfo.name.surname}`,
          payerInfo.email_address,
          orderPrice,
          paypalOrder.status,
        ];
        await client.query(query, values);
        console.log("✅ Datos del pedido guardados en PostgreSQL.");
      } finally {
        client.release();
      }
    }

    res.json({ capture: capture.result });
  } catch (err) {
    console.error("❌ ERROR al capturar el pago:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de backend escuchando en http://localhost:${PORT}`);
});
