import { saveUser } from "./storage.js";

export async function login(username, password) {


    const user = {
        username,
        password 
    };

    saveUser(user);

    return user;
}