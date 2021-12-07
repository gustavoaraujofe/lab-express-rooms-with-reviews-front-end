import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [userName, setUserName] = useState("");

  const params = useLocation();

  const json = localStorage.getItem("loggedInUser");
  const storedUser = JSON.parse(json || '""');

  useEffect(() => {
    if (storedUser !== "") {
      setUserName(storedUser.user.name.split(" ")[0]);
    }
  }, [storedUser, params]);

  function logout() {
    localStorage.removeItem("loggedInUser");
    setUserName("");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <p className="m-auto h5">
          {userName !== "" ? `Olá, ${userName}` : "Ironshop"}
        </p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-end "
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Cadastrar
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/edit-user" className="nav-link">
                Editar Cadastro
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create-room" className="nav-link">
                Criar Quarto
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/list-rooms" className="nav-link">
                Quartos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" onClick={logout} className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
