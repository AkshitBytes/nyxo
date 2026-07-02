import { Command } from "commander";

import { welcome } from "./welcome.js"
import { help } from "./help.js"
import { login } from "./login.js"
import { whoami } from "./whoami.js"
import { logout } from "./logout.js"


    
const program = new Command();
    
program
    .name("nyxo")
    .description("Nyxo CLI")
    .version("1.0.0");
    
program
    .action(()=>{
        welcome();
    })
    
program
    .command("login")
    .description("Login to your Nyxo account")
    .action(login);


program
    .command("whoami")
    .description("Show the currently logged in user")
    .action(whoami);


program
    .command("help")
    .description("Show available commands")
    .action(help);
program 
    .command("logout")
    .description("Logout of you nyxo account")
    .action(logout);

program.parse();