import dotenv from 'dotenv';
dotenv.config();

import {App} from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT): 3001;
try{
    const app = new App(PORT);
    app.start();
} catch(error) {
    console.error('Failed to start server', error);
}