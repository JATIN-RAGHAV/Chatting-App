import { useState, useEffect } from "react";
import {
    getFriends,
    FriendsResponse
} from "../requests/requests";
import SimpleSnackbar from "./snackbar";
import { GradientCircularProgress } from "./loading";
import { DisplayUser } from "./Users";
import axios, { AxiosResponse } from "axios";
import { backendUrl } from "../config";
import { useNavigate } from "react-router-dom";

interface ApiResponse {
    username: string;
    // Add more properties as needed
  }

function Friends() {
    const navigate = useNavigate()
  const [users, setUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    async function getAndSetUsers() {
      console.log("response");
      const friends: FriendsResponse =await getFriends();
      console.log(friends);
      setUsers(friends.friends);
      setIsLoading(false);
    }
    getAndSetUsers();
  }, []);

  const gotoChat:Function =async (receiver: string) => {
    try{
        const response:AxiosResponse<ApiResponse> = await axios.get<any, AxiosResponse<ApiResponse>> (backendUrl + '/user/me',{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
        const sender:string = response.data.username
        navigate(`/chat/:${sender}/:${receiver}`);
    }
    catch(err){

    }

  }

  if (!isLoading) {
    if (users.length > 0) {
      if (users[0] != "") {
        return (
          <>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: -25,
              }}
            >
              Received Friend Requests
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <SimpleSnackbar
                message={'yo'}
                open={open}
                setOpen={setOpen}
              ></SimpleSnackbar>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 50,
                  alignContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {users.map((user) => (
                  <DisplayUser
                    key={user}
                    username={user}
                    handleClick={() => gotoChat(user)}
                    buttonText="Chat"
                    button={true}
                  ></DisplayUser>
                ))}
              </div>
            </div>
          </>
        );
      } else
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              height: "100vh",
            }}
          >
            <h1>You Don't have any Friends. Fuck.</h1>{" "}
          </div>
        );
    } else
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            height: "100vh",
          }}
        >
          <h1>You Don't have any Friends. Fuck.</h1>{" "}
        </div>
      );
  } else
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          height: "100vh",
        }}
      >
        {" "}
        <div
          style={{
            alignContent: "center",
            justifyContent: "center",
            marginTop: -200,
          }}
        >
          <GradientCircularProgress />
        </div>{" "}
      </div>
    );
}

export default Friends;
