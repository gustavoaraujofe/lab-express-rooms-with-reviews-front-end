import api from "../apis/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardRoom from "../components/CardRoom";

function RoomsList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function roomsList() {
      try {
        const response = await api.get("/rooms");

        setRooms(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    roomsList();
  }, []);

  return (
    <div className="d-flex justify-content-start flex-wrap gap-4 mt-5">
      {rooms.map((currentRoom) => {
        return (
          <Link
            key={currentRoom._id}
            to={`/view-room/${currentRoom._id}`}
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
  );
}

export default RoomsList;
