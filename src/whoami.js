import { getUser } from "./storage.js";

export function whoami() {

    const user = getUser();

    if (!user) {
        console.log("❌ Not logged in.");
        return;
    }

    console.log(`${user.username}`);
}