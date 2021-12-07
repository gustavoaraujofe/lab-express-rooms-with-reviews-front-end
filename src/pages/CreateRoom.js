import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apis/api"

import FormField from "../components/form/FormField";
import ErrorAlert from "../components/ErrorAlert";

function CreateRoom() {
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  // Loading
  const [loading, setLoading] = useState(false);
  // Tratamento do erro
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleChange(e) {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await api.post(
        "/create-rooms",
        roomData
      );

      console.log(response);

      setLoading(false);

      navigate("/");
    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err.response) {
        console.error(err.response);
        setError(err.response.data);
      }
    }
  }

  return (
    <div>
      <h1>Criar Quarto</h1>

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


        <div className="mb-3">
          <button disabled={loading} type="submit" className="btn btn-primary">
            {loading ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            ) : null}
            Cadastrar
          </button>
        </div>

        {error ? <ErrorAlert>{error}</ErrorAlert> : null}
      </form>
    </div>
  );
}

export default CreateRoom;