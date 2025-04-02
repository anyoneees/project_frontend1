import { Button } from "react-bootstrap";
import LoginWindow from "../DropWindow/dropWindow.jsx";
import SignInWindow from "../RegistrationWindow/registrationWindow.jsx";
function NavBar() {
  return (
    <div className="Nav-bar">
      <header className="App-header">
        <div className="Logo-link">
          <a href="http://localhost:3000">
            <img className="Logo" src="http://localhost:3000/circula.png" />
          </a>
        </div>
        <div className="Chat-button">
          <a href="http://localhost:3000/chat">
            <Button
              style={{ backgroundColor: "#D9D9D9", borderColor: "#73688D" }}
            >
              <img className="Chat-pic" src="http://localhost:3000/chat.png" />
            </Button>
          </a>
        </div>
        <div className="Notification-button">
          <a href="http://localhost:3000/notification">
            <Button
              style={{ backgroundColor: "#D9D9D9", borderColor: "#73688D" }}
            >
              <img
                className="Notification-pic"
                src="http://localhost:3000/notif2.png"
              />
            </Button>
          </a>
        </div>
        <div className="Profile-button">
          <a href="http://localhost:3000/profile">
            <Button
              style={{ backgroundColor: "#D9D9D9", borderColor: "#73688D" }}
            >
              <img
                className="profile-pic"
                src="http://localhost:3000/profile.png"
              />
            </Button>
          </a>
        </div>
        <div className="Login-button">
          <LoginWindow />
        </div>
        <div className="SignIn-button">
          <SignInWindow />
        </div>
        <div className="searchBar">
          
        </div>
      </header>
    </div>
  );
}

export default NavBar;
