import { input, password } from "@inquirer/prompts";
import { login as authenticate } from "./auth.js";

export async function login() {

    const username = await input({
        message: "Username:"
    });

    const pass = await password({
        message: "Password:"
    });

    await authenticate(username, pass);

    console.log(`\n✅ Logged in as ${username}`);
}