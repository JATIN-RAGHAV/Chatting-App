import axios,{AxiosResponse} from "axios"
import { backendUrl } from "../config"

const headers = {headers: {
    authorization: 'bearer '+ localStorage.getItem('token')
}}

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

  export interface receivedFriendRequests{
    receivedFriendRequestsUsername:string[]
  }
  

export const getFriends = async (): Promise<FriendsResponse> => {
    try {
        const res = await axios.get<any, AxiosResponse<FriendsResponse>>(backendUrl+'/user/friends',headers)
        return res.data
    }catch(err){
        console.log(err)
        return {friends:[]};
    }
}  

export const getUsers = async (): Promise<UsersResponse> => {
    try {
        const response = await axios.get<any, AxiosResponse<UsersResponse>>(backendUrl + "/user/users", headers);
        return response.data

    } catch (err) {
        console.log(err);
        return {Users:[]}
    }
};

export const sendFriendRequest = async(username: string) => {
    try{
        const response =await axios.post<any, AxiosResponse<sendFriendRequestResponse>>(backendUrl+'/user/send-friend-request',{username},headers)
        return response.data
    }catch(err) {
        console.error(err)
        return {message: 'Could not send friend request'}
    }
}

export const getSentFriendRequests = async(): Promise<sentFriendRequestsReponse> => {
    try{
        const response =await axios.get<any, AxiosResponse<sentFriendRequestsReponse>>(backendUrl+'/user/sent-friend-requests',headers)
        return response.data
    }catch(err) {
        console.error(err)
        console.log('from here')
        return {sentFriendRequestsUsername: ['']}
    }
}

export const getReceivedFriendRequests = async(): Promise<receivedFriendRequests> => {
    try{
        const response =await axios.get<any, AxiosResponse<receivedFriendRequests>>(backendUrl+'/user/received-friend-requests',headers)
        return response.data
    }catch(err) {
        console.error(err)
        console.log('from here')
        return {receivedFriendRequestsUsername: ['']}
    }
}
