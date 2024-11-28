import express from 'express';
import crimeControllers from '../controllers/crimeControllers.js';

const caseRouter=express.Router()

caseRouter.post('/addcrime',crimeControllers.addCase)
caseRouter.get('/crimes',crimeControllers.getcase)

caseRouter.post('/verifycrime',crimeControllers.verifyCrime)

export default caseRouter