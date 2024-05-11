import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { backendUrl } from "../config";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface ApiResponse {
  username: string;
  // Add more properties as needed
}

function Appbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const getMe = async () => {
    console.log('from function')
    await axios.get<any, AxiosResponse<ApiResponse>>(backendUrl + "/user/me", {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((response: AxiosResponse<ApiResponse>) => {
        console.log('data'+response.data)
        setUsername(response.data.username);
      })
      .catch((err) => {
        console.log(err);
        setUsername('')
      });
  };

  useEffect(() => {
    if(['/signin','/'].includes(location.pathname)){
        localStorage.removeItem('token')
    }
    getMe();
    console.log("location");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    getMe();
    navigate("/signin");
  };

  if (username) {
    return (
      <>
        <Card style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: 10 }}>Kaizoku</h3>
          <div style={{ display: "flex", justifyContent:"space-evenly", width:'20vw' }}>
          <Button
              variant="contained"
              style={{ height: 35 }}
              onClick={() => navigate('/users')}
            >
              Users
            </Button>
            <Button
              variant="contained"
              style={{ height: 35 }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
            <h3 style={{ margin: 10 }}>{username}</h3>
          </div>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Card style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: 10 }}>Kaizoku</h3>
          <Button
            variant="contained"
            style={{ height: 35, marginLeft: 10 }}
            onClick={() => navigate("/")}
          >
            Login
          </Button>
        </Card>
      </>
    );
  }
}

export default Appbar;
