import { Router } from "express"
import { CFindRoles } from "../controllers/role.controller"

const router = Router()

router.get("/", CFindRoles)

export default router
