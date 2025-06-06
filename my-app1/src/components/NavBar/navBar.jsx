import {Button} from 'reactstrap';
import LoginWindow from "../DropWindow/dropWindow.jsx";
import SignInWindow from "../RegistrationWindow/registrationWindow.jsx";
import SearchComponent from "../searchComponent/searchComponent.js";
import CreateClothingItemModal from "../CreateClothingItemModal/CreateClothingItemModal";
import React, {useState} from "react";

function NavBar(props) {
    const [modalShow, setModalShow] = useState(false);
    const handleSearch = (query) => {
        console.log('Search query:', query);
    };
    const handleItemCreated = (newItem) => {
        props.setItems((prevItems) => [...prevItems, newItem]);
    };
    const handleLogOut =()=>{
        localStorage.removeItem('authToken');
        localStorage.removeItem('username')
        localStorage.removeItem('userID');
    };
    return (
        <div className="Nav-bar">
            <header className="App-header">
                <div className="Logo-link">
                    <a href="http://localhost:3000">
                        <img className="Logo" src="http://localhost:3000/circula.png"/>
                    </a>
                </div>
                <SearchComponent onSearch={handleSearch}/>
                <CreateClothingItemModal
                    show={modalShow}
                    handleClose={() => setModalShow(false)}
                    onItemCreated={handleItemCreated}
                />
                <div className="Chat-button">
                    <a href="http://localhost:3000/chat">
                        <Button
                            style={{backgroundColor: "#4F646F", borderColor: "#4F646F"}}
                        >
                            <img className="Chat-pic" src="http://localhost:3000/chat.png"/>
                        </Button>
                    </a>
                </div>
                <div className="Item-create">
                    <Button style={{backgroundColor: "#4F646F", borderColor: "#4F646F", borderRadius: "25px"}}
                            onClick={() => setModalShow(true)}>
                        <img className="Create-pic" src="http://localhost:3000/create.png"/>
                    </Button>
                </div>
                <div className="Profile-button">
                    <a href="http://localhost:3000/profile">
                        <Button
                            style={{backgroundColor: "#4F646F", borderColor: "#4F646F"}}
                        >
                            <img
                                className="profile-pic"
                                src="http://localhost:3000/profile.png"
                            />
                        </Button>
                    </a>
                </div>
                {(localStorage.getItem("authToken") !== undefined && localStorage.getItem("authToken")) !== null ?
                    <></> :
                    <div className="Login-button">
                        <LoginWindow/>
                    </div>}
                {(localStorage.getItem("authToken") !== undefined && localStorage.getItem("authToken")) !== null ? <Button color="danger" onClick={handleLogOut}>Выйти</Button> :
                    <></>}

            </header>
        </div>
    );
}

export default NavBar;
