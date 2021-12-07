import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditUser from "./pages/EditUser";
import CreateRoom from "./pages/CreateRoom";
import ListRoomsUser from "./pages/ListRoomsUser";
import EditRoom from "./pages/EditRoom";
import ViewRoom from "./pages/ViewRoom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <AuthContextComponent>
        <Navbar />
        <div className="container w-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/edit-user" element={<EditUser />} />
            <Route path="/create-room" element={<CreateRoom />} />
            <Route path="/list-rooms" element={<ListRoomsUser />} />
            <Route path="/edit-room/:id" element={<EditRoom />} />
            <Route path="/view-room/:id" element={<ViewRoom />} />
          </Routes>
        </div>
      </AuthContextComponent>
    </div>
  );
}

export default App;
