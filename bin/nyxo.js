#!/usr/bin/env node

const { Command } = require("commander");

const program = new Command();

program
  .name("nyxo")
  .description("Nyxo CLI")
  .version("1.0.0");


program
.action(()=>{
  console.log(`
███╗   ██╗██╗   ██╗██╗  ██╗ ██████╗
████╗  ██║╚██╗ ██╔╝╚██╗██╔╝██╔═══██╗
██╔██╗ ██║ ╚████╔╝  ╚███╔╝ ██║   ██║
██║╚██╗██║  ╚██╔╝   ██╔██╗ ██║   ██║
██║ ╚████║   ██║   ██╔╝ ██╗╚██████╔╝
╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝

Version  : v0.0.1-alpha
Status   : Under Development

Available Commands

  welcome    Display welcome banner
  help       Show available commands

Type "nyxo help" for more information.

Crafted with ☕ by Akshit Kumar
    `)
})
program
  .command("welcome")
  .description("Welcome to Nyxo")
  .action(() => {
    console.log(`
███╗   ██╗██╗   ██╗██╗  ██╗ ██████╗
████╗  ██║╚██╗ ██╔╝╚██╗██╔╝██╔═══██╗
██╔██╗ ██║ ╚████╔╝  ╚███╔╝ ██║   ██║
██║╚██╗██║  ╚██╔╝   ██╔██╗ ██║   ██║
██║ ╚████║   ██║   ██╔╝ ██╗╚██████╔╝
╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝

──────────────────────────────────────────────

Version      v0.0.1-alpha
Status       Under Development
Launch       Coming Soon

Crafted with ☕ by Akshit Kumar

Type nyxo help to see available commands.

──────────────────────────────────────────────
`);
  });


program
  .command("help")
  .description("show available options")
  .action(()=>{
    console.log(`
      Available Commands


      nyxo welcome    shows the welcome banner
      nyxo help       shows the current available commands
      ----------------------------------------------------
      more commands comming soon.....
      `)
  })
program.parse();