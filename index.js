import express from 'express';
import path from 'path';
import routesWeb from './server/routes/index.js';
import routesAPI from './app/routes/index.js';

// Server WEB -> Folder server
const app = express();
const PORT = 3000;

const __dirname = path.resolve();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(routesWeb);

app.listen(PORT, () => console.log(`Server running in PORT: ${PORT}`));

// Rest API -> Folder app
const api = express();
const PORTAPI = 5000;

api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(routesAPI);

api.listen(PORTAPI, () => console.log(`Api listening to PORT: ${PORTAPI}`));
