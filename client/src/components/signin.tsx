import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { backendUrl } from "../config";
import { useNavigate } from "react-router-dom";

interface SigninCardProps {
  onChangeUsername: React.ChangeEventHandler<HTMLInputElement>;
  onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  interface ApiResponse {
    message: string;
    token: string;
    // Add more properties as needed
  }

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const signin = () => {
    const data = { username, password };
    axios
      .post<any, AxiosResponse<ApiResponse>>(backendUrl + "/signin", data)
      .then((response: AxiosResponse<ApiResponse>) => {
        localStorage.setItem("token", response.data.token);
        console.log(response.data.message);
        console.log(localStorage.getItem("token"));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <SigninCard
          onChangeUsername={onChangeUsername}
          onChangePassword={onChangePassword}
          onClick={signin}
        />
      </div>
    </>
  );
}

const SigninCard: React.FC<SigninCardProps> = ({
  onChangeUsername,
  onChangePassword,
  onClick,
}) => {
  const navigate = useNavigate();
  return (
    <Card style={{ padding: 70 }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Signin</h1>
        </div>
        <TextField
          id="contained-basic"
          label="Username"
          variant="outlined"
          onChange={onChangeUsername}
        />
        <br /> <br />
        <TextField
          id="contained-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={onChangePassword}
        />
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="contained" onClick={onClick}>
            Signin
          </Button>
        </div>
        <div style={{ display: "flex", alignContent: "space-between" }}>
          <h4>Already a User??</h4>{" "}
          <Button
            variant="contained"
            style={{ margin: 13, height: 35 }}
            onClick={() => navigate("/")}
          >
            Login
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Signin;
