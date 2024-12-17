import { Button } from "react-bootstrap";
function NavBar() {
  return (
    <div className="Nav-bar">
      <header className="App-header">
        <div className="Logo-link">
          <img className="Logo" src="logo-image.png" />
        </div>
        <div className="Item-create">
          <Button>Create</Button>
        </div>
       <div className="Chat-button">
          <Button>Chat</Button>
        </div>
        <div className="Notification-button">
          <Button>Notif</Button>
        </div>
        <div className="Profile-button">
          <Button>To-profile</Button>
        </div>
      </header>
    </div>
  );
}
export default NavBar;
