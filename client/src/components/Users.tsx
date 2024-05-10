import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import { getUsers, UsersResponse, FriendsResponse, sendFriendRequest, getFriends, sendFriendRequestResponse, getSentFriendRequests, sentFriendRequestsReponse, getReceivedFriendRequests, receivedFriendRequests } from "../requests/requests";



function Users() {
    const [users, setUsers] = useState<({username: string})[]>([]);

    useEffect(() => {
        async function getAndSetUsers () {
            const usersResponse: UsersResponse = await getUsers();
            const friendsResponse: FriendsResponse = await getFriends();
            const sentFriendRequestResponse: sentFriendRequestsReponse = await getSentFriendRequests();
            const receivedFriendRequestsResponse: receivedFriendRequests = await getReceivedFriendRequests();
            usersResponse.Users = usersResponse.Users.filter(user => !friendsResponse.friends.includes(user.username) && !sentFriendRequestResponse.sentFriendRequestsUsername.includes(user.username) && !receivedFriendRequestsResponse.receivedFriendRequestsUsername.includes(user.username))
            setUsers(usersResponse.Users)
        }
        getAndSetUsers(); 
    }, []);

    const handleSendFriendRequest = async (username: string) => {
        const sendFriendRequestResponseHere:sendFriendRequestResponse = await sendFriendRequest(username);
        setUsers(users => users.filter(user => user.username != username))
        alert(sendFriendRequestResponseHere.message)
    }

    if (users) {
        return (
        <>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{display:'flex', justifyContent:'center',marginTop:50,alignContent:'center', flexDirection:'column' }}>
                    {users.map(user => <DisplayUser key={user.username} username={user.username} handleSendFriendRequest={handleSendFriendRequest}></DisplayUser>)}
                </div>
            </div>
        </>
        );
  } else return <>Loading....</>
}

const DisplayUser = (props:{username:string, handleSendFriendRequest:Function}) => {
    return <Card  style={{display:'flex', justifyContent:'space-between', width:'60vw', marginBottom:10}}>
        <h3 style={{marginLeft:10}}>{props.username}</h3>
        <Button style={{marginRight:10, margin:10}} onClick={() => props.handleSendFriendRequest(props.username)} variant="contained">Add Friend</Button>
    </Card>
}

export default Users;
