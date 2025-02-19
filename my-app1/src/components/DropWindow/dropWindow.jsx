import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

function LoginWindow(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle}>
        Вход
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Авторизоваться</ModalHeader>
        <ModalBody>
          <Input type="text" placeholder="Логин" />
          <Input type="password" placeholder="Пароль" />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Войти
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Отмена
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginWindow;
