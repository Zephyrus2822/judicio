import express from 'express';
import PrisonerController from '../controllers/PrisonerController.js';

const prisonerRouter=express.Router();
prisonerRouter.post('/addprisoner',PrisonerController.addprisoner)

prisonerRouter.get('/getprisoners',PrisonerController.getprisoner)
prisonerRouter.post('/updateprisoners',PrisonerController.updateprisoner)

export default prisonerRouter