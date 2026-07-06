import fs from "fs";
import path from "path";
import os from "os";

const CONFIG_FILENAME = "nyxo.config.json";
const GLOBAL_CONFIG_PATH = path.join(
  os.homedir(),
  ".nyxo",
  "config.json"
);

function getLocalConfigPath(cwd = process.cwd()) {
  return path.join(cwd, CONFIG_FILENAME);
}

export function saveLocalConfig(data, cwd = process.cwd()) {
  fs.writeFileSync(
    getLocalConfigPath(cwd),
    JSON.stringify(data, null, 2)
  );
}

export function loadLocalConfig(cwd = process.cwd()) {
  const configPath = getLocalConfigPath(cwd);

  if (!fs.existsSync(configPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

export function saveGlobalConfig(data) {
  const dir = path.dirname(GLOBAL_CONFIG_PATH);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(
    GLOBAL_CONFIG_PATH,
    JSON.stringify(data, null, 2)
  );
}

export function loadGlobalConfig() {
  if (!fs.existsSync(GLOBAL_CONFIG_PATH)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(GLOBAL_CONFIG_PATH, "utf8"));
}