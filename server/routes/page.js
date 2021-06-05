import { Router } from 'express';
import pages from '../pages/loadingPages.js';

const router = Router();

router.get('/', pages.home);

export default router;
