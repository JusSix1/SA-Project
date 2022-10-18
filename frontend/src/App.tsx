import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FullAppBar from "./components/FullAppBar";

import Login from './components/Login_UI';
import Employee_entry from "./components/EmployeeData_UI";
import Patient_UI from './components/Patient_UI';
import Diagnostic from "./components/Diagnostic_UI";
import Dispensation from './components/Dispensation_UI';
import Appointment_UI from './components/Appointment_UI';
import Bill_UI from './components/Bill_UI';

export default function App() {
  return (
  <Router>
    <div>
      <FullAppBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<Employee_entry />} />
        <Route path="/patient" element={<Patient_UI />} />
        <Route path="/diagnostic" element={<Diagnostic />} />
        <Route path="/dispensation" element={<Dispensation />} />
        <Route path="/appointment" element={<Appointment_UI />} />
        <Route path="/Bill" element={<Bill_UI />} />
      </Routes>
    </div>
  </Router>
  );
}