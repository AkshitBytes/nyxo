import fs from "fs";
import os from "os";
import path from "path";

const nyxoDir = path.join(os.homedir(), ".nyxo");
const configFile = path.join(nyxoDir, "config.json");

export function saveUser(user) {
    if (!fs.existsSync(nyxoDir)) {
        fs.mkdirSync(nyxoDir, { recursive: true });
    }

    fs.writeFileSync(configFile, JSON.stringify(user, null, 2));
}

export function getUser() {
    if (!fs.existsSync(configFile)) {
        return null;
    }

    return JSON.parse(fs.readFileSync(configFile, "utf-8"));
}

export function removeUser() {
    if (fs.existsSync(configFile)) {
        fs.unlinkSync(configFile);
    }
}