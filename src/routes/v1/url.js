import { Router } from "express"
import { createShortUrl } from "../../controllers/v1/url.js"

const urlRouter = Router()

urlRouter.post("/shorten/", createShortUrl)

export default urlRouter
