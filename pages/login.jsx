// react and next
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
// bootstap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
const Login = () => {
  const [checkIfEmailNotExist, setCheckIfEmailNotExist] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCheckIfEmailNotExist(false);
    setWrongPassword(false);
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });
      if (localStorage.getItem("student-portal-student-mail")) {
        localStorage.removeItem("student-portal-student-mail"); // same device can be used by 2 diff accounts
      }
      localStorage.setItem(
        "student-portal-student-mail",
        JSON.stringify(email)
      );
      console.log(res);
      route.push("/currentuser");
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data === "Either Password or email is wrong")
        setWrongPassword(true);
      else setCheckIfEmailNotExist(true);
    }
  };
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {checkIfEmailNotExist && (
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {wrongPassword && (
            <Form.Text className="text-muted ">
              <p className="text-danger">Wrong Password</p>
            </Form.Text>
          )}
        </Form.Group>
        <Container>
          <Button
            onClick={(e) => handleSubmit(e)}
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </Container>
      </Form>
      <Link href="/forgot_password">
        <Button className="p-2 m-2" variant="success" type="button">
          Forgot Password
        </Button>
      </Link>
    </Container>
  );
};

export default Login;
