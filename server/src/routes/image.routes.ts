import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

import {
  uploadImage,
  uploadImages,
} from "../controllers/image.controller";

const router = Router();

router.post(
  "/upload",
  authenticate,
  upload.single("image"),
  uploadImage
);

router.post(
  "/upload-multiple",
  authenticate,
  upload.array("images", 5),
  uploadImages
);

export default router;