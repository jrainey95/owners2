import "./index.scss";
import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../../utils/mutations";
import auth from "../../../utils/auth";

const LoginPage = () => {
  const [backgroundColor, setBackgroundColor] = useState("#3332");
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    const colors = ["#3334", "#3335", "#3336"];
    let currentIndex = 0;

    const updateBackgroundColor = () => {
      setBackgroundColor(colors[currentIndex]);
      currentIndex = (currentIndex + 1) % colors.length;
    };

    const interval = setInterval(updateBackgroundColor, 5000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <Form
          id="loginForm"
          noValidate
          validated={validated}
          onSubmit={handleFormSubmit}
        >
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            Something went wrong with your login credentials!
          </Alert>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
          </Form.Group>
          <Button
            id="loginBtn"
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
