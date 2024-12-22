import {Button} from "react-bootstrap";

function NavBar() {
    return (
        <div className="Nav-bar">
            <header className="App-header">
                <div className="Logo-link">
                    <a href="http://localhost:3000">
                        <img className="Logo" src="logo-image.png"/>
                    </a>
                </div>
                <div className="Chat-button">
                    <a href="http://localhost:3000/chat">
                        <Button style={{backgroundColor: "#73688D", borderColor: "#73688D"}}>Чат</Button>
                    </a>
                </div>
                <div className="Notification-button">
                    <Button style={{backgroundColor: "#73688D", borderColor: "#73688D"}}>Уведомления</Button>
                </div>
                <div className="Profile-button">
                    <a href="http://localhost:3000/profile">
                        <Button style={{backgroundColor: "#73688D", borderColor: "#73688D"}}>
                            <img className="profile-pic" src="profile.png"/>
                        </Button>
                    </a>
                </div>
            </header>
        </div>
    );
}

export default NavBar;
