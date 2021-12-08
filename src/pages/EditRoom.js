import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../apis/api";
import FormField from "../components/form/FormField";
import ErrorAlert from "../components/ErrorAlert";

function Signup() {
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const params = useParams();

  // Loading
  const [loading, setLoading] = useState(false);
  // Tratamento do erro
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function room() {
      try {
        const response = await api.get(`/rooms/${params.id}`);

        delete response.data._id;

        setRoomData({ ...roomData, ...response.data });
      } catch (e) {
        console.log(e);
      }
    }
    room();
  }, []);

  function handleChange(e) {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (roomData.password !== roomData.confirmPassword) {
      return setError("Senha e confirmação diferentes.");
    }

    try {
      setLoading(true);
      setError(null);

      const response = await api.patch(`/edit-rooms/${params.id}`, roomData);

      setLoading(false);
      console.log(response)
        
      navigate("/list-rooms");
    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err.response) {
        console.error(err.response);
        setError(err.response.data);
      }
    }
  }

  async function deleteRoom() {
    try {
      setLoading(true);
      const responseDelete = await api.delete(`/room/delete/${params.id}`);
    
      console.log(responseDelete)
      setLoading(false);
      navigate("/list-rooms");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-50 d-flex flex-column m-auto">
      <h1 className="text-center mt-5 mb-4">Editar quarto</h1>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Nome do quarto"
          id="signupFormName"
          required
          name="name"
          onChange={handleChange}
          value={roomData.name}
          readOnly={loading}
        />

        <FormField
          label="Descrição"
          id="signupFormDescription"
          required
          name="description"
          onChange={handleChange}
          value={roomData.description}
          readOnly={loading}
        />

        <FormField
          label="URL da Imagem"
          id="signupFormImage"
          required
          name="imageUrl"
          onChange={handleChange}
          value={roomData.imageUrl}
          readOnly={loading}
        />
        <div className="d-flex gap-4">
          <div className="mb-3">
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : null}
              Atualizar
            </button>
          </div>
          <div className="mb-3">
            <button
              disabled={loading}
              type="button"
              className="btn btn-danger"
              onClick={deleteRoom}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : null}
              Deletar
            </button>
          </div>
        </div>
        {error ? <ErrorAlert>{error}</ErrorAlert> : null}
      </form>
    </div>
  );
}

export default Signup;
