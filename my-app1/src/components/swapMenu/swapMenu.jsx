import { Container, Button, Card, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/navBar";
import SuccessModal from "../successModal/SuccessModal";
import "./SwapMenu.css";

function SwapMenu() {
    const { id } = useParams();
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
            const token = localStorage.getItem("authToken");
            const response = await axios.delete(`http://127.0.0.1:8000/api/clothing-items/${id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
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
                const token = localStorage.getItem("authToken");
                const response = await axios.get(`http://127.0.0.1:8000/api/clothing-items/${id}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
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
        <div className="swap-menu-container">
            <SuccessModal show={showModal} onClose={closeModal}/>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                crossOrigin="anonymous"
            />
            <NavBar/>

            <Container className="mt-4">
                <Card className="shadow-sm">
                    <Row className="g-0">
                        <Col md={6} className="d-flex align-items-center justify-content-center p-4">
                            <div className="image-container">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="item-image img-fluid"
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <Card.Body className="h-100 d-flex flex-column p-4">
                                <div className="mb-auto">
                                    <Card.Title className="item-title mb-3">{item.title}</Card.Title>
                                    <Card.Text className="item-description">
                                        {item.description}
                                    </Card.Text>
                                </div>

                                <div className="button-group mt-4 d-flex">
                                    <Button
                                        variant="success"
                                        onClick={handleExchange}
                                        className="action-button-swap exchange-button me-3"
                                    >
                                        Обменяться
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={deleteFirstItem}
                                        className="action-button-swap delete-button"
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    );
}

export default SwapMenu;