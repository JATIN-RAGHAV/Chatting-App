import { useParams } from "react-router-dom";
import { getChat, getChatResponse, sendChat } from "../requests/requests";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

function Chat() {
    const [message, setMessage] = useState('')
    let {sender, receiver} = useParams();
    sender = sender?.substring(1)
    receiver = receiver?.substring(1);

    const asyncFunction = async () => {
        console.log('receiver')
        console.log(receiver)
        if(receiver){
            const chatTrial =await getChat(receiver);
            if(chatTrial.chat){
                setChat(chatTrial)
            }
        }
    }

    useEffect(() => {
        asyncFunction()
    },[])

    const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
        console.log(message)
      };    

    const handleSendMessage=async()=>{
        if(receiver){
            const response = await sendChat(receiver, message)
            console.log(response)
            asyncFunction()
        }
    }

    const [chat, setChat] = useState<getChatResponse>({message:'not yet'})
    return<>
    <div style={{margin:50,display:'flex', justifyContent:'center', flexDirection:'column',alignContent:'center'}}>
        {chat.chat?.map(chatSingle => {
            return(
                <div key={chatSingle.message+chatSingle.sender+Math.random() } style={{justifyContent:'end'}}>
                    <div style={{display:'flex',margin:5, justifyContent:chatSingle.sender == receiver?'start':'end'}}>
                        {chatSingle.message}
                    </div>
                </div>
            )
        })}
    </div>
    <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
        <TextField
        label='message'
        id='contained-basic'
        variant="outlined"
        onChange={onChangeMessage}
        />
        <Button variant="contained" onClick={handleSendMessage}>
            Send Message
        </Button>
    </div>

    </>
}



export default Chat;
