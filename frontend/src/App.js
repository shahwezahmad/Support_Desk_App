import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/NewTicket";
import PrivateRoute from "./components/PrivateRoute";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";

function App() {
  return (
    <>
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-ticket" element = {<PrivateRoute />} >
          <Route path="/new-ticket" element = {<NewTicket />} />
          </Route >
          <Route path="/tickets" element = {<PrivateRoute />} >
            <Route path="/tickets" element = {<Tickets />} />
            </Route>
            <Route path="/ticket/:id" element = {<PrivateRoute />} >
              <Route path="/ticket/:id" element = {<Ticket />} />
            </Route>
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
