import { Router } from "express"
import {
  CCreateReport,
  CFindOneReport,
  CUpdateReport,
} from "../controllers/report.controller"
import { upload } from "../configs/multer"

const router = Router()

router.post("/", upload.single("file"), CCreateReport)
router.put("/", upload.single("file"), CUpdateReport)
router.get("/:id", CFindOneReport)

export default router
