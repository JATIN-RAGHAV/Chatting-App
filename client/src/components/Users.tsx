import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import { getUsers, UsersResponse, FriendsResponse, sendFriendRequest, getFriends, sendFriendRequestResponse, getSentFriendRequests, sentFriendRequestsReponse, getReceivedFriendRequests, receivedFriendRequests } from "../requests/requests";
import SimpleSnackbar from "./snackbar";
import { GradientCircularProgress } from "./loading";



function Users() {
    const [users, setUsers] = useState<({username: string})[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        async function getAndSetUsers () {
            const usersResponse: UsersResponse = await getUsers();
            const friendsResponse: FriendsResponse = await getFriends();
            const sentFriendRequestResponse: sentFriendRequestsReponse = await getSentFriendRequests();
            const receivedFriendRequestsResponse: receivedFriendRequests = await getReceivedFriendRequests();
            usersResponse.Users = usersResponse.Users.filter(user => !friendsResponse.friends.includes(user.username) && !sentFriendRequestResponse.sentFriendRequestsUsername.includes(user.username) && !receivedFriendRequestsResponse.receivedFriendRequestsUsername.includes(user.username))
            setUsers(usersResponse.Users)
            setIsLoading(false)
        }
        getAndSetUsers(); 
    }, []);

    const handleSendFriendRequest = async (username: string) => {
        // @ts-ignore
        const sendFriendRequestResponseHere:sendFriendRequestResponse = await sendFriendRequest(username);
        setUsers(users => users.filter(user => user.username != username))
        setOpen(true)
    }

    if (!isLoading) {
        if(users.length>0){
            return (
            <>  
                <h1 style={{display:'flex', justifyContent:'center', marginBottom:-25}}>Users</h1>
                <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                    <SimpleSnackbar message={"Friend Request Sent Successfully"} open={open} setOpen={setOpen}></SimpleSnackbar>
                    <div style={{display:'flex', justifyContent:'center',marginTop:50,alignContent:'center',flexWrap:'wrap' }}>
                        {users.map(user => <DisplayUser key={user.username} username={user.username} handleSendFriendRequest={handleSendFriendRequest}></DisplayUser>)}
                    </div>
                </div>
            </>
            );
        }else return <div style={{display:'flex', justifyContent:'center', alignContent:'center', height:'100vh'}}><h1>No New Users To Send Request To.</h1> </div>
  } else return <div style={{display:'flex', justifyContent:'center', alignContent:'center', height:'100vh'}} > <div style={{alignContent:'center', justifyContent:'center', marginTop:-200}}><GradientCircularProgress/></div> </div>
}

const DisplayUser = (props:{username:string, handleSendFriendRequest:Function}) => {
    return <Card  style={{display:'flex', flexDirection:'column', justifyContent:'space-between',height:200, marginBottom:10}}>
        <h3 style={{marginLeft:10}}>{props.username}</h3>
        <Button style={{marginRight:10, margin:10}} onClick={() => props.handleSendFriendRequest(props.username)} variant="contained">Add Friend</Button>
    </Card>
}

export default Users;
