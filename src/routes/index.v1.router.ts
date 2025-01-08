import { Router } from "express"
import authRoute from "./auth.router"
import userRoute from "./user.router"

const router = Router()

router.use("/auth", authRoute)
router.use("/users", userRoute)

export default router
