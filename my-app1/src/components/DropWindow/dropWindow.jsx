import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Modal, Input, Alert} from 'reactstrap';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function LoginWindow() {
    const [modal, setModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/auth/login/',
                {username, password},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }

                }
            );
            const token = response.data.token;

            localStorage.setItem('authToken', token);

            axios.defaults.headers.common['Authorization'] = `Token ${token}`;

            setModal(false);
        } catch (err) {
            setError(err.response?.data?.detail || 'Ошибка авторизации');
        }
    };

    return (
        <>
            <Button color="success" onClick={() => setModal(true)}>Войти</Button>

            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <div className="modal-header">
                    <h5 className="modal-title">Авторизация</h5>
                </div>
                <div className="modal-body">
                    {error && <Alert color="danger">{error}</Alert>}
                    <Input
                        type="text"
                        placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mb-3"
                    />
                    <Input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <Button color="primary" onClick={handleLogin}>Войти</Button>
                    <Button color="secondary" onClick={() => setModal(false)}>Отмена</Button>
                </div>
            </Modal>
        </>
    );
}

export default LoginWindow;