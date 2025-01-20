import { Router } from "express"
import { MAuth } from "../middlewares/auth.middleware"
import authRoute from "./auth.router"
import userRoute from "./user.router"
import roleRoute from "./role.router"
import complaintRoute from "./complaint.router"
import reportRoute from "./report.router"

const router = Router()

router.use("/auth", authRoute)
router.use("/users", MAuth, userRoute)
router.use("/roles", MAuth, roleRoute)
router.use("/complaints", MAuth, complaintRoute)
router.use("/reports", MAuth, reportRoute)

export default router
