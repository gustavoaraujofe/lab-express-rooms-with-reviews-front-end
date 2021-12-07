function CardRoom(props) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={props.img} className="card-img-top" alt="imagem quarto" />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text text-black-50">{props.description}</p>
      </div>
    </div>
  );
}

export default CardRoom;
