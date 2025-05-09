import React, {useState, useEffect} from "react";
import ItemList from "../itemList/itemList.jsx";
import NavBar from "../NavBar/navBar.jsx";
import axios from "axios";

export default function MainPage() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/clothing-items/", {
                    headers: {
                        Authorization: `Token 973bdf511dbddbdb130686cdb7543d2c9d0507ad`, // Замените YOUR_AUTH_TOKEN на реальный токен
                    },
                });
                setItems(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="Main-page">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                crossOrigin="anonymous"
            />
            <NavBar setItems={setItems}/>
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
