import React, {useState} from "react";
import {Modal, Button, Form, Alert} from "react-bootstrap";
import axios from "axios";

const CreateClothingItemModal = ({show, handleClose, onItemCreated}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        size: "",
        image: null,
        is_available: true,
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("title", formData.title);
        form.append("description", formData.description);
        form.append("size", formData.size);
        form.append("image", formData.image);
        form.append("is_available", formData.is_available);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/clothing-items/", form, {
                headers: {
                    Authorization: `Token 9eb006f269041fddfd765332b2357b8d8c145f30`,
                    "Content-Type": "multipart/form-data",
                },
            });

            onItemCreated(response.data); // Вызываем callback после успешного создания
            handleClose(); // Закрываем модальное окно
        } catch (err) {
            setError(err.response?.data || "An error occurred");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Создать обьявление</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите текст"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Введите текст"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="size">
                        <Form.Label>Размер</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter size"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="is_available">
                        <Form.Check
                            type="checkbox"
                            label="Available"
                            name="is_available"
                            checked={formData.is_available}
                            onChange={(e) =>
                                setFormData((prev) => ({...prev, is_available: e.target.checked}))
                            }
                        />
                    </Form.Group>

                    <Button  type="submit" style={{backgroundColor: "#4F646F", borderColor: "#4F646F" }}>
                    <img className="Create-pic" src="create.png"/>
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateClothingItemModal;
