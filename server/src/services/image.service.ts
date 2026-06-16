import { UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

import cloudinary from "../config/cloudinary";

import {
  createImage,
  createManyImages,
} from "../repositories/image.repository";

const uploadBuffer = (
  buffer: Buffer
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "nsbm-lostlink",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(
              result as UploadApiResponse
            );
          }
        }
      );

    Readable.from(buffer).pipe(uploadStream);
  });
};

export const uploadSingleImage = async (
  file: Express.Multer.File,
  itemId: string
) => {
  const result = await uploadBuffer(
    file.buffer
  );

  return createImage(
    result.secure_url,
    itemId
  );
};

export const uploadMultipleImages = async (
  files: Express.Multer.File[],
  itemId: string
) => {
  const uploads = await Promise.all(
    files.map((file) =>
      uploadBuffer(file.buffer)
    )
  );

  const imageUrls = uploads.map(
    (upload) => upload.secure_url
  );

  await createManyImages(
    imageUrls,
    itemId
  );

  return imageUrls;
};