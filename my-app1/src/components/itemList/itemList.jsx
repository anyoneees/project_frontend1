function ItemList({ itemData }) {
  console.log(itemData);
  return (
    <div className="Item-block">
      <a href="http://localhost:3000/swap-menu" className="Link-decoration">
        <div className="Item-image"></div>
        <div className="Item-title">{itemData}</div> 
        <div className="Item-text">{itemData}</div>
      </a>
    </div>
  );
}
export default ItemList;
