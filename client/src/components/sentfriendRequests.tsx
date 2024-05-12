import { useState, useEffect } from "react";
import {
  getSentFriendRequests,
  sentFriendRequestsReponse,
} from "../requests/requests";
import SimpleSnackbar from "./snackbar";
import { GradientCircularProgress } from "./loading";
import { DisplayUser } from "./Users";

function sentFriendRequests() {
  const [users, setUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    async function getAndSetUsers() {
      console.log("response");
      const sentFriendRequestResponse: sentFriendRequestsReponse =
        await getSentFriendRequests();
      console.log(sentFriendRequestResponse);
      setUsers(sentFriendRequestResponse.sentFriendRequestsUsername);
      setIsLoading(false);
    }
    getAndSetUsers();
  }, []);

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
              Sent Friend Requests
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <SimpleSnackbar
                message={"Friend Request Sent Successfully"}
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
                    handleClick={() => {}}
                    buttonText="Unsend Friend Request"
                    button={false}
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
            <h1>No New Users To Send Request To.</h1>{" "}
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
          <h1>No New Users To Send Request To.</h1>{" "}
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

export default sentFriendRequests;
