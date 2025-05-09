import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Input, Alert } from 'reactstrap';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function LoginWindow() {
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const ensureCsrfToken = async () => {
    try {
      await axios.get('http://127.0.0.1:8000/api/csrf/');
    } catch (err) {
      console.error('CSRF token fetch error:', err);
    }
  };

  const handleLogin = async () => {
    try {
      await ensureCsrfToken();

      const response = await axios.post(
          'http://127.0.0.1:8000/api/auth/login/',
          { username, password },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
      );

      console.log('Login success:', response.data);
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