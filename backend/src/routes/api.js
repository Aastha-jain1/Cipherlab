import { Router } from 'express';
import { cipher, hash, history } from '../controllers/cipherController.js';
const router = Router();
router.post('/cipher/:operation(encrypt|decrypt)', cipher);
router.post('/hash', hash);
router.get('/history', history);
export default router;
