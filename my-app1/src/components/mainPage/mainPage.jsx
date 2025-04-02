import React, {useState, useEffect} from "react";
import ItemList from "../itemList/itemList.jsx";
import NavBar from "../NavBar/navBar.jsx";
import axios from "axios";
import CreateClothingItemModal from "../CreateClothingItemModal/CreateClothingItemModal";
import {Button} from "react-bootstrap";

export default function MainPage() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/clothing-items/", {
                    headers: {
                        Authorization: `Token fe1242edcdcb90517e61704406d53be9d4d2020a`, // Замените YOUR_AUTH_TOKEN на реальный токен
                    },
                });
                setItems(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchItems();
    }, []);
    const handleItemCreated = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    };

    return (
        <div className="Main-page">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                crossOrigin="anonymous"
            />
            <NavBar/>
            <div className="Item-create">
                <Button style={{ backgroundColor: "#4F646F", borderColor: "#73688D", borderRadius:"25px" }}
                        onClick={() => setModalShow(true)}>
                    <img className="Create-pic" src="create.png"/>
                </Button>
            </div>
            <CreateClothingItemModal
                show={modalShow}
                handleClose={() => setModalShow(false)}
                onItemCreated={handleItemCreated}
            />
            <div className="Item-section">
                {error ? (
                    <p style={{color: "red"}}>Error: {error}</p>
                ) : (
                    items.map((item) => <ItemList key={item.id} itemData={item}/>)
                )}
            </div>
        </div>
    );
}
