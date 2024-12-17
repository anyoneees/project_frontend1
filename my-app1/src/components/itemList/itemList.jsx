function ItemList({ itemData }) {
  console.log(itemData);
  return (
    <div className="Item-block">
      <div className="Item-image"></div>
      <div className="Item-title">{itemData}</div>
      <div className="Item-text">{itemData}</div>
    </div>
  );
}
export default ItemList;
