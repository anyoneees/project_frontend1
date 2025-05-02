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
        <div className="Icon-section">
          <div className="Icon-section-conteiner">
          <div className="Buttons">
            <Button className="Info"
              style={{ backgroundColor: "#D9D9D9", borderColor: "#D9D9D9", borderRadius: "15px"}}
            >
              <img
                className="Info-pic"
              />
            </Button>
            <Button className="Pfp"
              style={{ backgroundColor: "#D9D9D9", borderColor: "#D9D9D9" , borderRadius: "60px"}}
            >
              <img
                className="Profile-pic"
              />
            </Button>
            <Button className="Settings"
              style={{ backgroundColor: "#D9D9D9", borderColor: "#D9D9D9" , borderRadius: "15px"}}
            >
              <img
                className="Settings-pic"
              />
            </Button>
            </div>
            <div className="Acc-name">

            </div>
            </div>
        </div>
      
      </div>
    </a>
  );
}
export default Profile;
