import NavBar from "../NavBar/navBar";
import ItemList from "../itemList/itemList";
import { Button } from "react-bootstrap";
function Profile() {
  return (
    <a href="http://localhost:3000/profile">
      <div className="Profile-panel">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
        <NavBar />
        <div className="Icon-panel">
          <div className="Icon-background">
            <div className="Icon-buttons-profile">
              <Button
                style={{ backgroundColor: "#73688D", borderColor: "#73688D" }}
              >
                <img className="Item-give" src="item-give.png" />
              </Button>
              <Button style={{ backgroundColor: "#73688D", borderColor: "#73688D" }}>
                <img className ="Item-take" src="item-take.png"/>
              </Button>
            </div>
          </div>
        </div>
        <div className="Item-block-profile">
          <div className="My-item">
            <ItemList itemData={"Hello World"} />
            <ItemList itemData={"привет мир"} />
            <ItemList itemData={"привет мир"} />
          </div>
        </div>
      </div>
    </a>
  );
}
export default Profile;
