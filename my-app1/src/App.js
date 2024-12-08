import "./App.css";
import ItemList from "./components/itemList/itemList.jsx";

export default function App() {
  return (
    <div className="App-header">
      <header >
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossorigin="anonymous"
        />
        <ItemList itemData= {"Hello World"}/>
      </header>
    </div>
  );
}
