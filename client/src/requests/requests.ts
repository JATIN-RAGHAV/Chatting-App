import axios,{AxiosResponse} from "axios"
import { backendUrl } from "../config"


export interface FriendsResponse {
    friends: string[];
  }
  
  export interface UsersResponse {
      Users: {username: string}[]
  }
  
  export interface sendFriendRequestResponse {
      message: string
  }

  export interface sentFriendRequestsReponse{
    sentFriendRequestsUsername:string[]
  }

  export interface receivedFriendRequestsResponse{
    receivedFriendRequestsUsername:string[]
  }

  export interface acceptFriendRequestResponse{
    message:string
  }

  export interface getChatResponse{
    chat?:{
        sender: string 
        message: string
    }[],
    message:string
  }

  export interface sendChatResponse{
    message:string
  }
  

export const getFriends = async (): Promise<FriendsResponse> => {
    const headers = {authorization:`bearer ${localStorage.getItem('token')}`}
    try {
        const res = await axios.get<any, AxiosResponse<FriendsResponse>>(backendUrl+'/user/friends',{headers})
        return res.data
    }catch(err){
        console.log(err)
        return {friends:[]};
    }
}  

export const getUsers = async (): Promise<UsersResponse> => {
    const headers = {authorization:`bearer ${localStorage.getItem('token')}`}
    try {
        const response = await axios.get<any, AxiosResponse<UsersResponse>>(backendUrl + "/user/users", {headers});
        console.log('url');
        console.log(backendUrl + "/user/users");
        console.log('response')
        console.log(response.data);
        return response.data
    } catch (err) {
        console.log(err);
        return {Users:[]}
    }
};

export const sendFriendRequest = async(username: string) => {
    const headers = {authorization:`bearer ${localStorage.getItem('token')}`}
    try{
        const response =await axios.post<any, AxiosResponse<sendFriendRequestResponse>>(backendUrl+'/user/send-friend-request',{username},{headers})
        return response.data
    }catch(err) {
        console.error(err)
        return {message: 'Could not send friend request'}
    }
}

export const getSentFriendRequests = async(): Promise<sentFriendRequestsReponse> => {
    const headers = {authorization:`bearer ${localStorage.getItem('token')}`}
    try{
        const response =await axios.get<any, AxiosResponse<sentFriendRequestsReponse>>(backendUrl+'/user/sent-friend-requests',{headers})
        return response.data
    }catch(err) {
        console.error(err)
        return {sentFriendRequestsUsername: ['']}
    }
}

export const getReceivedFriendRequests = async(): Promise<receivedFriendRequestsResponse> => {
    const headers = {authorization:`bearer ${localStorage.getItem('token')}`}
    try{
        const response =await axios.get<any, AxiosResponse<receivedFriendRequestsResponse>>(backendUrl+'/user/received-friend-requests',{headers})
        return response.data
    }catch(err) {
        console.error(err)
        return {receivedFriendRequestsUsername: ['']}
    }
}

export const acceptFriendRequest = async(username:string): Promise<acceptFriendRequestResponse> => {
    const headers = {authorization:`bearer ${localStorage.getItem('token')}`}
    try{
        const response =await axios.post<any, AxiosResponse<acceptFriendRequestResponse>>(backendUrl+'/user/accept-friend-request',{username},{headers})
        return response.data
    }catch(err) {
        console.error(err)
        return {message: ''}
    }
}

export const getChat = async(receiver:string): Promise<getChatResponse> => {
    const headers = {authorization:`bearer ${localStorage.getItem('token')}`}
    try{
        const response =await axios.post<any, AxiosResponse<getChatResponse>>(backendUrl+'/user/chat/get',{with:receiver},{headers})
        return response.data
    }catch(err) {
        console.error(err)
        return {message: ''}
    }
}

export const sendChat = async(receiver:string, message:string): Promise<sendChatResponse> => {
    const headers = {authorization:`bearer ${localStorage.getItem('token')}`}
    try{
        const response =await axios.post<any, AxiosResponse<sendChatResponse>>(backendUrl+'/user/chat/send',{receiver, message},{headers})
        return response.data
    }catch(err) {
        console.error(err)
        return {message: ''}
    }
}

