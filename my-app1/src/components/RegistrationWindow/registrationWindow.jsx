import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from 'reactstrap';

function SignInWindow(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
        <Button color="success" onClick={toggle}>
          Регистрация
        </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Регистрация</ModalHeader>
        <ModalBody>
          <Input
            type="name"
            placeholder="Имя"
          />
          <Input
              type="lastName"
              placeholder="Фамилия"
          />
          <Input
            type="phone"
            placeholder="Номер телефона"
          />
          <Input
              type="email"
              placeholder="Электронная почта"
          /> 
          <Input
            type="text"
            placeholder="Логин"
          />
          <Input
              type="password"
              placeholder="Пароль"
          />
          <Input
              type="password"
              placeholder="Подтвердите пароль"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Зарегистрироваться
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Отмена
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SignInWindow;