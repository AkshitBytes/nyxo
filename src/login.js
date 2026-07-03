import axios from 'axios';
import open from 'open';
import ora from 'ora';
import chalk from 'chalk';
import { saveConfig } from './storage.js';
import { API_BASE_URL } from '../constants.js';

export async function login() {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/device/start`);
    const { deviceCode, userCode, verificationUrl, expiresIn, interval } = data;

    console.log(chalk.cyan(`\nYour code: ${chalk.bold(userCode)}`));
    console.log(`Opening browser to confirm login...\n`);
    await open(verificationUrl);

    const spinner = ora('Waiting for authorization...').start();
    const deadline = Date.now() + expiresIn * 1000;

    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, interval * 1000));

      const res = await axios.post(`${API_BASE_URL}/auth/device/poll`, { deviceCode });

      if (res.data.status === 'authorized') {
        spinner.succeed('Login successful!');
        saveConfig({ apiKey: res.data.apiKey });
        console.log(chalk.green('You are now logged in to Nyxo.'));
        return;
      }
      // status === 'pending' → loop and poll again
    }

    spinner.fail('Login timed out — please run `nyxo login` again.');
  } catch (err) {
    console.error(chalk.red('Login failed:'), err.response?.data?.error || err.message);
  }
}