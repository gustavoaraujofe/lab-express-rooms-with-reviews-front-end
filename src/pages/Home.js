import RoomsList from "../components/RoomsList";

function Home() {
  return (
    <div className="text-center mt-5">
      <h1>Quartos disponíveis</h1>
      <div className="d-flex justify-content-center">
        <RoomsList />
      </div>
    </div>
  );
}

export default Home;
