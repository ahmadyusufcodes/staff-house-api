import requestsControllers from '../controllers/requestsController';
import express from 'express';
const router = express.Router();

router.get('/', requestsControllers.getRequests);
router.post('/', requestsControllers.createRequest);
router.put('/review/:id', requestsControllers.reviewRequest);
export default router;