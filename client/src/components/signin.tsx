import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { backendUrl } from "../config";
import { useNavigate } from "react-router-dom";
import SimpleSnackbar from "./snackbar";

interface SigninCardProps {
  onChangeUsername: React.ChangeEventHandler<HTMLInputElement>;
  onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  interface ApiResponse {
    message: string;
    token: string;
  }

  interface ApiError {
    message:string
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
        console.log('signin')
        console.log(localStorage.getItem("token"));
        navigate("/users");
      })
      .catch((error:AxiosError<ApiError>) => {
        if(error.response?.data.message){
            setMessage(error.response?.data.message)
        }else setMessage('Could not signin')
        setOpen(true)
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
        <SimpleSnackbar message={message} open={open} setOpen={setOpen}></SimpleSnackbar>
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
