import readline from 'readline';
import detectProjectType from '../utils/detectProjectType.js';
import { loadGlobalConfig, loadLocalConfig, saveLocalConfig } from '../utils/configManager.js';
import apiClient from '../utils/apiClient.js';
import chalk from 'chalk';

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (answer) => { rl.close(); resolve(answer); }));
}

async function init() {
  const globalConfig = loadGlobalConfig();
  if (!globalConfig?.apiKey) {
    console.log(chalk.red('You are not logged in. Run `nyxo login` first.'));
    return;
  }

  const existing = loadLocalConfig();
  if (existing) {
    console.log(chalk.yellow('This project is already initialized with Nyxo.'));
    return;
  }

  const detected = detectProjectType(process.cwd());
  console.log(chalk.cyan(`Detected project type: ${detected.type}`));

  let { type, entryPoint, buildCommand } = detected;

  if (type === 'unknown') {
    type = await ask('Could not detect project type. Enter "backend" or "frontend": ');
  }

  const name = await ask('Project name: ');

  try {
    const { data } = await apiClient.post(
      '/projects',
      { name, type, entryPoint, buildCommand },
      { headers: { 'x-api-key': globalConfig.apiKey } }
    );

    saveLocalConfig({
    projectId: data.project._id,
    slug: data.project.slug,
    type: data.project.type,
    entryPoint: data.project.entryPoint,
    buildCommand: data.project.buildCommand
    });

    console.log(chalk.green(`\nProject "${name}" registered as "${data.project.slug}".`));
    console.log(chalk.gray('nyxo.config.json created in this folder.'));
  } catch (err) {
    console.error(chalk.red('Failed to register project:'), err.response?.data?.error || err.message);
  }
}

export { init };