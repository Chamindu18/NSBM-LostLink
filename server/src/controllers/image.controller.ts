import { RequestHandler } from "express";

import {
  uploadSingleImage,
  uploadMultipleImages,
} from "../services/image.service";

export const uploadImage: RequestHandler = async (
  req,
  res
) => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).json({
        success: false,
        message: "No image provided",
      });
      return;
    }

    const itemId = req.body.itemId;

    const image = await uploadSingleImage(
      file,
      itemId
    );

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Upload failed",
    });
  }
};

export const uploadImages: RequestHandler = async (
  req,
  res
) => {
  try {
    const files =
      req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({
        success: false,
        message: "No images provided",
      });
      return;
    }

    const itemId = req.body.itemId;

    const imageUrls =
      await uploadMultipleImages(
        files,
        itemId
      );

    res.status(201).json({
      success: true,
      message: "Images uploaded successfully",
      data: imageUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Upload failed",
    });
  }
};