import React from "react";
import {Modal, Button} from "react-bootstrap";

export default function SuccessExchangeModal({show, onClose}) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Вы подтвердили обмен!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Спасибо, что используете наш сервис!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={onClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
}