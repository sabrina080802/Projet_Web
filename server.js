const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');

const FRONT_URL = 'https://projet-web-3xcx.onrender.com';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: FRONT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


const apiRoutesDir = path.join(__dirname, 'routes');
fs.readdirSync(apiRoutesDir, { recursive: true }).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = require(path.join(apiRoutesDir, file).replaceAll('\\', '/'));
        const routeName = file.replace('.js', '').replaceAll('\\', '/');
        const routePath = `api/${routeName}`;
        app.use(route);
        console.log(`Route -> /${routePath} loaded`);
    }
});

app.listen(PORT, '0.0.0.0');
