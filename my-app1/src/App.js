import "./App.css";
import ItemList from "./components/itemList/itemList.jsx";
import NavPanel from "./components/navPanel/navPanel.jsx";

export default function App() {
  return (
    <body className="Main-page">
      <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
            crossOrigin="anonymous"
        />
    <div className="Nav-bar" >
      <header className="App-header">
        <div className="Logo-link"><NavPanel/></div>
        <div className="Item-create"><NavPanel/></div>
        <div className="Profile-button"><NavPanel/></div>
      </header>
    </div>
    <div className="Item-section"> 
      <ItemList itemData= {"Hello World"}/>
      <ItemList itemData= {"привет мир"}/>
      <ItemList itemData= {"Hello World"}/>
      <ItemList itemData= {"привет мир"}/>
      <ItemList itemData= {"Hello World"}/>
      <ItemList itemData= {"привет мир"}/>
      <ItemList itemData= {"Hello World"}/>
      <ItemList itemData= {"привет мир"}/>
    </div>
    </body>
  );
}
