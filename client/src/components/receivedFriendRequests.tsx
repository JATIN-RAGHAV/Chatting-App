import { useState, useEffect } from "react";
import {
  getReceivedFriendRequests,
  receivedFriendRequestsResponse,
  acceptFriendRequest,
} from "../requests/requests";
import SimpleSnackbar from "./snackbar";
import { GradientCircularProgress } from "./loading";
import { DisplayUser } from "./Users";

function receivedFriendRequests() {
  const [users, setUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function getAndSetUsers() {
      console.log("response");
      const receivedFriendRequests: receivedFriendRequestsResponse =
        await getReceivedFriendRequests();
      console.log(receivedFriendRequests);
      setUsers(receivedFriendRequests.receivedFriendRequestsUsername);
      setIsLoading(false);
    }
    getAndSetUsers();
  }, []);

  const acceptFriendRequestFuncttion: Function = async (username: string) => {
    const response = await acceptFriendRequest(username);
    if (response.message) {
        setMessage(response.message);
        setUsers(users => users.filter(user => user != username))
        setOpen(true);
    } else {
        setMessage("Could not accept Request");
        setOpen(true);
    }
  };

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
                message={message}
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
                    handleClick={() => acceptFriendRequestFuncttion(user)}
                    buttonText="Accept"
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
            <h1>No New Request Received.</h1>{" "}
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
          <h1>No New Request Received.</h1>{" "}
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

export default receivedFriendRequests;
