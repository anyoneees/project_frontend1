import React, {useState, useEffect} from "react";
import ItemList from "../itemList/itemList.jsx";
import NavBar from "../NavBar/navBar.jsx";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";

export default function MainPage() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        const fetchItems = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/clothing-items/", {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setItems(response.data);
                setFilteredItems(response.data);
            } catch (err) {
                setError("Войдите в аккаунт прежде чем пользоваться сервисом");
            }
        };

        fetchItems();
    }, []);

    const filterItems = (category) => {
        setActiveFilter(category);
        if (category === "all") {
            setFilteredItems(items);
        } else {
            const filtered = items.filter(item => item.category === category);
            setFilteredItems(filtered);
        }
    };

    const getCategoryName = (category) => {
        switch(category) {
            case "clothing": return "Одежда";
            case "furniture": return "Мебель";
            case "toys": return "Игрушки";
            case "household": return "Бытовые предметы";
            default: return "Все";
        }
    };

    return (
        <div className="Main-page">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                crossOrigin="anonymous"
            />
            <NavBar setItems={setItems} />

            <div className="container mt-4 mb-4">
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <Button
                            variant={activeFilter === "all" ? "primary" : "outline-primary"}
                            onClick={() => filterItems("all")}
                            className="me-2"
                        >
                            Все
                        </Button>
                        <Button
                            variant={activeFilter === "clothing" ? "primary" : "outline-primary"}
                            onClick={() => filterItems("clothing")}
                            className="me-2"
                        >
                            Одежда
                        </Button>
                        <Button
                            variant={activeFilter === "furniture" ? "primary" : "outline-primary"}
                            onClick={() => filterItems("furniture")}
                            className="me-2"
                        >
                            Мебель
                        </Button>
                        <Button
                            variant={activeFilter === "toys" ? "primary" : "outline-primary"}
                            onClick={() => filterItems("toys")}
                            className="me-2"
                        >
                            Игрушки
                        </Button>
                        <Button
                            variant={activeFilter === "household" ? "primary" : "outline-primary"}
                            onClick={() => filterItems("household")}
                        >
                            Бытовые предметы
                        </Button>
                    </Col>
                </Row>
            </div>

            <div className="container mb-3">
                <h4>{getCategoryName(activeFilter)}</h4>
            </div>

            <div className="Item-section container">
                {error ? (
                    <p style={{color: "red"}}>{error}</p>
                ) : filteredItems.length === 0 ? (
                    <p>Нет товаров в категории "{getCategoryName(activeFilter)}"</p>
                ) : (
                    filteredItems.map((item) => <ItemList key={item.id} itemData={item} />)
                )}
            </div>
        </div>
    );
}