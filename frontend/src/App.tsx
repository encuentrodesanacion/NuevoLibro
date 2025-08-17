// src/App.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SuccessPage from "./SucessPage";
import FailedPage from "./Failedpage"; //a

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pago-exitoso" element={<SuccessPage />} />
      <Route path="/pago-fallido" element={<FailedPage />} />
    </Routes>
  );
};

export default App;
