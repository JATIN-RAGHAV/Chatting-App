import { userState } from "../atoms/Appbar";
import { selector } from "recoil";

export const usernameState = selector({
    key:'usernameState',
    get:({get}) => {
        const user = get(userState)
        return user.username
    }
})

export const isLoadingState = selector({
    key:'isLoadingState',
    get:({get}) => {
        const user = get(userState)
        return user.isLoading
    }
})