import React, {useState, useEffect} from "react";
import NavBar from "../NavBar/navBar";
import ItemList from "../itemList/itemList";
import {Button, Spinner} from "react-bootstrap";
import axios from "axios";
import "./Profile.css";

function Profile() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserItems = async () => {
            try {
                // Получаем токен из localStorage
                const token = localStorage.getItem("authToken");

                const response = await axios.get(
                    "http://127.0.0.1:8000/api/clothing-items/",
                    {
                        headers: {
                            Authorization: `Token 973bdf511dbddbdb130686cdb7543d2c9d0507ad`,
                        },
                    }
                );

                setItems(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Ошибка загрузки предметов");
            } finally {
                setLoading(false);
            }
        };

        fetchUserItems();
    }, []);

    return (
        <div className="profile-page">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                crossOrigin="anonymous"
            />

            <NavBar/>

            <div className="profile-container">
                <div className="user-panel">
                    <div className="user-avatar">
                        <div className="avatar-placeholder">
                            <img src="https://i.pravatar.cc/150?img=9"/>
                        </div>
                    </div>

                    <div className="user-actions">
                        <Button variant="primary" className="action-button">
                            <img src="item-give.png" alt="Отдать предмет"/>
                        </Button>
                        <Button variant="primary" className="action-button">
                            <img src="item-take.png" alt="Взять предмет"/>
                        </Button>
                    </div>
                </div>

                <div className="items-section">
                    <h3>Мои предметы</h3>

                    {loading ? (
                        <div className="loading-spinner">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : items.length > 0 ? (
                        <div className="items-grid">
                            {items.map((item) => (
                                <div key={item.id} className="item-card">
                                    <img src={item.image} alt={item.name}/>
                                    <h5>{item.name}</h5>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-items">У вас пока нет предметов</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;