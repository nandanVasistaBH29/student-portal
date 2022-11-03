// react and next
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// bootstap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
const Admin = () => {
  const [checkAdmin, setCheckAdmin] = useState(false);
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/admin-login", {
        email,
        password,
      });
      route.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <h2>Admin Login Page</h2>
      <Form>
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="admin@admin.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {checkAdmin && (
            <Form.Text className="text-muted ">
              <p className="text-danger">
                This Email Doesn't exists in our Database.Please Register
              </p>
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button onClick={(e) => handleClick(e)} variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Admin;
