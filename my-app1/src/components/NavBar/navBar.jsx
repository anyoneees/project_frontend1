import { Button } from "react-bootstrap";
function NavBar() {
  return (
    <div className="Nav-bar">
      <header className="App-header">
        <div className="Logo-link">
          <a href="http://localhost:3000">
            <img className="Logo" src="circula.png" />
          </a>
        </div>
        <div className="Item-create">
          <Button style={{ backgroundColor: "#73688D", borderColor: "#73688D" }}>
             <img src="create.png" className="Create-pic"/></Button>
        </div>
        <div className="Chat-button">
          <a href="http://localhost:3000/chat">
            <Button style={{ backgroundColor: "#73688D", borderColor: "#73688D" }}>
               <img src="chat.png" className="Chat-pic"/></Button>
          </a>
        </div>
        <div className="Notification-button">
          <Button style={{ backgroundColor: "#73688D", borderColor: "#73688D" }}>
            <img src="notif2.png" className="Notification-pic"/>
          </Button>
        </div>
        <div className="Profile-button">
          <a href="http://localhost:3000/profile">
            <Button style={{ backgroundColor: "#73688D", borderColor: "#73688D" }}>
              <img className="profile-pic" src="profile.png"/>
            </Button>
          </a>
        </div>
      </header>
    </div>
  );
}
export default NavBar;
