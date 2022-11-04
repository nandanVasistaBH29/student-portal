import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
const Logout = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const route = useRouter();
  const handleLogout = () => {
    fetch("/api/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    localStorage.removeItem("student-portal-student-mail");
    route.push("/");
  };
  return (
    <Container>
      <Button variant="danger" onClick={handleShow}>
        Logout
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You Wanna Logout</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Logout;
