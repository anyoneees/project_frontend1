import React, {useState} from "react";
import {Modal, Button, Form, Alert} from "react-bootstrap";
import axios from "axios";

const CreateClothingItemModal = ({show, handleClose, onItemCreated}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        size: "default",
        image: null,
        is_available: true,
        category: "clothing",
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
        form.append("category", formData.category);

        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.post("http://127.0.0.1:8000/api/clothing-items/", form, {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            onItemCreated(response.data);
            handleClose();
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

                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Категория</Form.Label>
                        <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="clothing">Одежда</option>
                            <option value="furniture">Мебель</option>
                            <option value="toys">Игрушки</option>
                            <option value="household">Бытовые предметы</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Изображение</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Form.Group>

                    <Button type="submit" style={{backgroundColor: "#4F646F", borderColor: "#4F646F" }}>
                        <img className="Create-pic" src="create.png"/>
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateClothingItemModal;