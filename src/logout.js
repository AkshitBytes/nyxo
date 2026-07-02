import { getUser, removeUser } from "./storage.js";
export function logout(){
    const user = getUser();
    if(!user){
        console.log("Not logged in");
        return;
    }

    removeUser();

    console.log("logged out");
}