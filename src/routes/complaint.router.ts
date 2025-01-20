import { Router } from "express"
import {
  CCreateComplaint,
  CFindComplaints,
  CFindOneComplaint,
  CUpdateComplaint,
} from "../controllers/complaint.controller"

const router = Router()

router.get("/", CFindComplaints)
router.get("/:id", CFindOneComplaint)
router.post("/", CCreateComplaint)
router.put("/", CUpdateComplaint)
// router.delete("/:id", CDeleteUser)

export default router
