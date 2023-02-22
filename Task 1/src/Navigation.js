import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Customers from "./Customers";
import Trainings from "./Trainings";
import "./Navigation.css";

export default function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <div className="Navigation">
          <Link to="/customers"> Customers </Link>
          <Link to="/trainings"> Trainings </Link>
        </div>

        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/trainings" element={<Trainings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
