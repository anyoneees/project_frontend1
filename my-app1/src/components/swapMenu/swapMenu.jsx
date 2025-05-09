import {Container, Button} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/navBar";
import SuccessModal from "../successModal/SuccessModal";

function SwapMenu() {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleExchange = () => {

        setTimeout(() => {
            setShowModal(true);
        }, 1000);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const deleteFirstItem = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/clothing-items/${id}/`, {
                headers: {
                    Authorization: `Token 973bdf511dbddbdb130686cdb7543d2c9d0507ad`, // Замените на реальный токен
                },
            });
            console.log("Item deleted successfully:", response.status);
        } catch (error) {
            console.error("Error deleting item:", error.response?.data || error.message);
        }
    };
    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/clothing-items/${id}/`, {
                    headers: {
                        Authorization: `Token 973bdf511dbddbdb130686cdb7543d2c9d0507ad`, // Замените YOUR_AUTH_TOKEN на реальный токен
                    },
                });
                setItem(response.data);
            } catch (error) {
                setError("Error fetching item details");
            }
        };

        fetchItemDetails();
    }, [id]);

    if (error) {
        return <Container><p>{error}</p></Container>;
    }

    if (!item) {
        return <Container><p>Loading...</p></Container>;
    }
    return (
        <div className="Item-menu">
            <SuccessModal show={showModal} onClose={closeModal}/>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                crossOrigin="anonymous"
            />
            <NavBar/>


            <div className="Item-menu-main-block">
                <div className="info-menu-image-block">
                    <div className="Image-panel-swapMenu">
                        <img className="Image-swapMenu" src={item.image}/>

                    </div>
                </div>
                <div className="Info-menu-main-block">
                    <div className="Item-menu-info-block">
                        <div className="Info-text">
                            {item.title}
                        </div>
                        <div className="Info-description">
                            {item.description}
                        </div>
                    </div>
                    <Button style={{ backgroundColor: "#D9D9D9", borderColor: "#D9D9D9"}} onClick={handleExchange} className="trade-button"
                    >
                        Обменяться
                    </Button>
                    <Button style={{ backgroundColor: "#D9D9D9", borderColor: "#D9D9D9"}}onClick={deleteFirstItem} className="delete-trade-button"
                    >
                        Удалить
                    </Button>
                </div>

            </div>

        </div>
    );
}

export default SwapMenu;
