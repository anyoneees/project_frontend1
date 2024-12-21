import ItemList from "../itemList/itemList.jsx";
import NavBar from "../NavBar/navBar.jsx";

export default function MainPage() {
    return (
      <div className="Main-page">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
        <NavBar/>
        <div className="Item-section">
          <ItemList itemData={"Hello World"} />
          <ItemList itemData={"привет мир"} />
          <ItemList itemData={"Hello World"} />
          <ItemList itemData={"привет мир"} />
          <ItemList itemData={"Hello World"} />
          <ItemList itemData={"привет мир"} />
          <ItemList itemData={"Hello World"} />
          <ItemList itemData={"привет мир"} />
        </div>
      </div>
    );
  }