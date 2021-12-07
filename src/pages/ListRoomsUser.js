import api from "../apis/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardRoom from "../components/CardRoom";

function ListRoomsUser() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function roomsList() {
      try {
        const response = await api.get("/rooms-user");

        setRooms(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    roomsList();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Seus Quartos</h1>
      <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-start flex-wrap gap-4 mt-5">
          {rooms.map((currentRoom) => {
            return (
              <Link
                key={currentRoom._id}
                to={`/edit-room/${currentRoom._id}`}
                className="text-decoration-none text-dark"
              >
                <CardRoom
                  title={currentRoom.name}
                  description={currentRoom.description}
                  img={currentRoom.imageUrl}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListRoomsUser;
