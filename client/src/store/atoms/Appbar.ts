import { atom } from "recoil";

interface user{
    username:null|string,
    isLoading:boolean
}

export const userState = atom<user>({
    key:'userState',
    default:{
        username:null,
        isLoading:true
    }
})