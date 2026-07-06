import chalk from "chalk";
import {
  loadLocalConfig,
  loadGlobalConfig,
} from "../utils/configManager.js";
import apiClient from "../utils/apiClient.js";

export async function status() {
  const localConfig = loadLocalConfig();
  const globalConfig = loadGlobalConfig();

  if (!localConfig) {
    console.log(
      chalk.red("This folder is not a Nyxo project. Run `nyxo init` first.")
    );
    return;
  }

  if (!globalConfig?.apiKey) {
    console.log(
      chalk.red("You are not logged in. Run `nyxo login` first.")
    );
    return;
  }

  try {
    const { data } = await apiClient.get(
      `/projects/${localConfig.projectId}`,
      {
        headers: {
          "x-api-key": globalConfig.apiKey,
        },
      }
    );

    const p = data.project;

    console.log(chalk.cyan(`Project: ${p.name}`));
    console.log(`Slug: ${p.slug}`);
    console.log(`Type: ${p.type}`);
    console.log(
      chalk.gray(
        "(Runtime status will be available once deploy is implemented.)"
      )
    );
  } catch (err) {
    console.error(
      chalk.red("Failed to fetch status:"),
      err.response?.data?.error || err.message
    );
  }
}