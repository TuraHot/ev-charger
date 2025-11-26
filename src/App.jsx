import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import StationPage from "./pages/StationPage";
import PaymentPage from "./pages/PaymentPage";
import SettingPage from "./pages/SettingPage";
import UserPage from "./pages/UserPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/ev-charger">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/station" element={<StationPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
