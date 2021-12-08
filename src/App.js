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
import ProtectedRoute from "./pages/auth/ProtectRoute";

function App() {
  return (
    <div>
      <AuthContextComponent>
        <Navbar />
        <div className="container w-100">
          <Routes>
            <Route path="/" element={<ProtectedRoute component={Home} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/edit-user"
              element={<ProtectedRoute component={EditUser} />}
            />
            <Route
              path="/create-room"
              element={<ProtectedRoute component={CreateRoom} />}
            />
            <Route
              path="/list-rooms"
              element={<ProtectedRoute component={ListRoomsUser} />}
            />
            <Route
              path="/edit-room/:id"
              element={<ProtectedRoute component={EditRoom} />}
            />
            <Route
              path="/view-room/:id"
              element={<ProtectedRoute component={ViewRoom} />}
            />
          </Routes>
        </div>
      </AuthContextComponent>
    </div>
  );
}

export default App;
