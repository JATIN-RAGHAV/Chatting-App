import { useParams } from "react-router-dom";
import { getChat, getChatResponse, sendChat } from "../requests/requests";
import { useEffect, useState } from "react";
import { Card, TextField } from "@mui/material";
import Button from "@mui/material/Button";


function Chat() {
    const [message, setMessage] = useState('')
    let {sender, receiver} = useParams();
    sender = sender?.substring(1)
    receiver = receiver?.substring(1);

    const asyncFunction = async () => {
        if(receiver){
            const chatTrial =await getChat(receiver);
            if(chatTrial.chat){
                setChat(chatTrial)
            }
        }
    }
    useEffect(() => {
        // Set up the interval
        const intervalId = setInterval(asyncFunction, 500);
    
        // Immediately call asyncFunction
        asyncFunction();
    
        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
      };    

    const handleSendMessage=async()=>{
        if(receiver){
            sendChat(receiver, message)
            if(sender){
                setChat(prevChat => {
                        if(prevChat.chat){
                            return {...chat, chat:[...prevChat.chat,{sender, message}]}
                        }else{
                            return{...prevChat,chat:[{sender, message}]}
                        }
                })
            }
            setMessage('')
        }
    }

    const [chat, setChat] = useState<getChatResponse>({message:'not yet'})
    return<>
    <Card >
        <h2 style={{margin:5}}>{receiver}</h2>
    </Card>
    <Card style={{margin:5, height:'80vh'}}>
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
    </Card>
    <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
        <TextField
        value={message}
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
