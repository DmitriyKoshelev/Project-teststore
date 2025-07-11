import { test as base, expect, request } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

type User = {
  [x: string]: any;
  email: string;
  password: string;
  token?: string;
};

type Fixtures = {
  loginUser: User;
};

export const test = base.extend<Fixtures>({
    loginUser: async ({}, use) => {
        // Read from JSON file
        const filePath = path.join(__dirname, '../data/login-data.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const user: User = JSON.parse(rawData);
    
        // Use the user data in the test
        await use(user);
    }
    });
    export { expect, request };