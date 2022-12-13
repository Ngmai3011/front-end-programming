import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./Home";
import Customers from "./Customers";
import Trainings from "./Trainings";
import "./Navigation.css";

export default function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <div className="Navigation">
          <Link to="/"> Home</Link>
          <Link to="/customers"> Customers </Link>
          <Link to="/trainings"> Trainings </Link>
        </div>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/trainings" element={<Trainings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
