import { Router } from "express"
import {
  CCreateUser,
  CDeleteUser,
  CFindUsers,
  CUpdateUser,
} from "../controllers/user.controller"

const router = Router()

router.get("/", CFindUsers)
router.post("/", CCreateUser)
router.put("/", CUpdateUser)
router.delete("/:id", CDeleteUser)

export default router
