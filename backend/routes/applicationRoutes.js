import express from 'express'
import ApplicationController from '../controllers/ApplicationController.js'

const applicationRouter=express.Router()

applicationRouter.post('/apply',ApplicationController.apply)

applicationRouter.get('/getapplications',ApplicationController.getStatus)

applicationRouter.post('/accept',ApplicationController.acceptApplication)
applicationRouter.post('/reject',ApplicationController.RejectApplication)

applicationRouter.post('/verify',ApplicationController.VerifyApplication)

export default applicationRouter
