import {Container, Button, Card, Row, Col, ListGroup} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/navBar";
import SuccessModal from "../successModal/SuccessModal";
import "./SwapMenu.css";
import SuccessExchangeModal from "../SucessExchangeModal/SuccessExchangeModal";

function SwapMenu() {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalAccept, setShowModalAccept] = useState(false);
    const [isLoadingOffers, setIsLoadingOffers] = useState(false);
    const token = localStorage.getItem("authToken");

    const createOffer = async (itemId) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/offers/create/`,
                {item: itemId},
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            fetchItemOffers(); // Обновляем список офферов после создания
            return response.data;
        } catch (error) {
            console.error('Ошибка при создании оффера:', error.response?.data);
            throw error;
        }
    };

    const fetchItemOffers = async () => {
        setIsLoadingOffers(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/items/${id}/offers/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setOffers(response.data);
        } catch (error) {
            console.error('Ошибка при получении офферов:', error.response?.data);
        } finally {
            setIsLoadingOffers(false);
        }
    };

    const handleExchange = () => {
        createOffer(item.id).then(() => {
            setShowModal(true);
        });
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const handleExchangeAccept = () => {
        setTimeout(() => {
            setShowModalAccept(true);
        }, 1000);
    };
    const closeModalAccept = () => {
        setShowModalAccept(false);
    };


    const deleteFirstItem = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/clothing-items/${id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            // Перенаправление после удаления
            window.location.href = '/my-items';
        } catch (error) {
            console.error("Error deleting item:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/clothing-items/${id}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setItem(response.data);
                fetchItemOffers(); // Загружаем офферы после получения данных о предмете
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
            <SuccessExchangeModal show={showModalAccept} onClose={closeModalAccept}/>
            <SuccessModal show={showModal} onClose={closeModal}/>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                crossOrigin="anonymous"
            />
            <NavBar/>

            <Container className="mt-4 mb-5">
                <Row>
                    <Col md={7}>
                        <Card className="shadow-sm mb-4">
                            <Card.Body className="p-4">
                                <Row>
                                    <Col md={6} className="mb-4 mb-md-0">
                                        <div className="image-container">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="item-image img-fluid rounded"
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <h1 className="fw-bold mb-3">{item.title}</h1>
                                        <p className="text-muted mb-4">{item.description}</p>

                                        {item.owner.id.toString() === localStorage.getItem("userID") ? (
                                            <Button
                                                variant="outline-danger"
                                                onClick={deleteFirstItem}
                                                className="w-100 py-2"
                                            >
                                                Удалить
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="success"
                                                onClick={handleExchange}
                                                className="w-100 py-3 fw-bold"
                                            >
                                                Обменяться
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    {item.owner.id.toString() === localStorage.getItem("userID") ?
                        <Col md={5}>
                            <Card className="shadow-sm">
                                <Card.Header className="bg-white border-bottom-0">
                                    <h4 className="mb-0">Предложения обмена</h4>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    {isLoadingOffers ? (
                                        <div className="text-center p-4">Загрузка предложений...</div>
                                    ) : offers.length === 0 ? (
                                        <div className="text-center p-4">Пока нет предложений обмена</div>
                                    ) : (
                                        <ListGroup variant="flush">
                                            {offers.map(offer => (
                                                <ListGroup.Item key={offer.id} className="py-3 px-4">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h6 className="mb-1">{offer.creator.username}</h6>
                                                            <small className="text-muted">
                                                                {new Date(offer.created_at).toLocaleString()}
                                                            </small>
                                                        </div>
                                                        <Button
                                                            variant="outline-success"
                                                            size="sm"
                                                            onClick={handleExchangeAccept}
                                                        >
                                                            Принять
                                                        </Button>
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col> : <></>}
                </Row>
            </Container>
        </div>
    );
}

export default SwapMenu;