import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import api from "../apis/api";
import ErrorAlert from "../components/ErrorAlert";

function ViewRoom() {
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    reviews: [],
  });
  const [newComment, setNewComment] = useState({
    comment: "",
    roomId: "",
  });
  const [editComment, setEditComment] = useState({
    comment: "",
    roomId: "",
  });
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [optionEdit, setOptionEdit] = useState(false);
  const [idCommentEdit, setIdCommentEdit] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [comments, setComments] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function user() {
      try {
        const response = await api.get("/found-user");

        setUserName(response.data.name);
      } catch (e) {
        console.log(e);
      }
    }
    user();
  }, []);

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
  }, [refresh]);

  useEffect(() => {
    function commentsAdd() {
      let arrTemp = [];
      roomData.reviews.forEach((currentReview) => {
        let temp = {};
        temp.name = currentReview.userName;
        temp.comment = currentReview.comment;
        temp.id = currentReview._id;
        arrTemp.push(temp);
      });
      setComments(arrTemp);
    }
    commentsAdd();
  }, [roomData]);

  async function deleteComment(id) {
    try {
      const response = await api.delete(`/room/delete-review/${id}`);
      console.log(response);
      setRefresh(!refresh);
    } catch (e) {
      console.log(e);
    }
  }

  function handleChange(e) {
    setNewComment({ roomId: params.id, [e.target.name]: e.target.value });
  }

  function handleChangeEdit(e) {
    setEditComment({ roomId: params.id, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/room/create-review", newComment);
      console.log(response);
      setRefresh(!refresh);
      setNewComment({ comment: "" });
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }

  async function handleSubmitEdit(e) {
    e.preventDefault();
    try {
      const response = await api.patch(
        `/room/edit-review/${idCommentEdit}`,
        editComment
      );
      console.log(response);
      setOptionEdit(false);
      setRefresh(!refresh);
      setEditComment({ comment: "" });
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }

  function EditComment(id) {
    setOptionEdit(!optionEdit);
    setIdCommentEdit(id);
  }

  return (
    <div className="container mt-5">
      <div className="card mb-3">
        <img className="card-img-top" src={roomData.imageUrl} alt="quarto" />
        <div className="card-body">
          <h3 className="card-title">{roomData.name}</h3>
          <p className="card-text mt-3">{roomData.description}</p>
          <h4 className="card-text mt-5">Comentários</h4>
          <div>
            {comments.map((currentComment) => {
              return (
                <div
                  key={currentComment.id}
                  className="list-group-item list-group-item-action flex-column align-items-start mt-4"
                >
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{currentComment.name}</h5>
                  </div>
                  <p class="mb-1 mt-3 text-black-50">
                    {currentComment.comment}
                  </p>
                  {userName === currentComment.name ? (
                    <>
                      <button
                        className="btn "
                        onClick={() => EditComment(currentComment.id)}
                      >
                        Editar
                      </button>
                      {optionEdit ? (
                        <div>
                          <form className="mt-4" onSubmit={handleSubmitEdit}>
                            <div className="form-group h5">
                              <label htmlFor="exampleFormControlTextarea1">
                                Alterar
                              </label>
                              <textarea
                                className="form-control"
                                name="comment"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                onChange={handleChangeEdit}
                                value={editComment.comment}
                              ></textarea>
                              <div className="mt-2">
                                <button
                                  className="btn btn-primary "
                                  type="submit"
                                >
                                  Confirmar alteração
                                </button>
                                <button
                                  onClick={() =>
                                    deleteComment(currentComment.id)
                                  }
                                  className="btn btn-danger ms-2"
                                >
                                  Deletar
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>

          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="form-group h5">
              <label htmlFor="exampleFormControlTextarea1">Comentar</label>
              <textarea
                className="form-control"
                name="comment"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={handleChange}
                value={newComment.comment}
              ></textarea>
              <button className="btn btn-primary mt-1 mb-2" type="submit">
                Enviar
              </button>
              {error ? (
                <ErrorAlert>Você não pode comentar em seu anúncio</ErrorAlert>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ViewRoom;
