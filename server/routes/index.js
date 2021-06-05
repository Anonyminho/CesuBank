import { Router } from 'express';
import pages from './page.js';

const routes = Router();

routes.use(pages);

export default routes;
