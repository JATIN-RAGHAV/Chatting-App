import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { backendUrl } from "../config";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GradientCircularProgress } from "./loading";

interface ApiResponse {
  username: string;
  // Add more properties as needed
}

function Appbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState<Boolean>(true)
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
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setUsername('')
        setIsLoading(false)
      });
  };

  useEffect(() => {
    async function name() {
        await getMe();
        console.log('pathname')
        console.log(location.pathname)
        if(username && ['/signin','/'].includes(location.pathname)){
            navigate('/users')
        }
    }
    name();
  }, [location]);

  const handleLogout = async() => {
    localStorage.removeItem("token");
    await getMe();
    navigate("/signin");
  };
  if(isLoading){
    return (
        <>
          <Card style={{ display: "flex", justifyContent: "space-between", height:50}}>
            <h3 style={{ margin: 10 }}>Kaizoku</h3>
            <GradientCircularProgress/>
          </Card>
        </>
      );
  }
  if (username) {
    return (
      <>
        <Card style={{ display: "flex", justifyContent: "space-between" ,height:50}}>
          <h3 style={{ margin: 10 }}>Kaizoku</h3>
          <div style={{ display: "flex", justifyContent:"space-evenly" }}>
          <Button
              variant="contained"
              style={{ height: 35 , margin:10}}
              onClick={() => navigate('/users')}
            >
              Users
            </Button>
            <Button
              variant="contained"
              style={{ height: 35 , margin:10}}
              onClick={() => navigate('/sent-friend-requests')}
            >
              OutGoing Requests
            </Button>
            <Button
              variant="contained"
              style={{ height: 35 , margin:10}}
              onClick={handleLogout}
            >
              Log Out
            </Button>
            <h3 style={{ margin: 10,marginTop:15 }}>{username}</h3>
          </div>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Card style={{ display: "flex", justifyContent: "space-between" ,height:50}}>
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
