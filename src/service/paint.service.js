import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "./object.strorage.service.js";

export async function uploadImage(pPaintImage) {
  const fileName = `paintFinder_${uuidv4()}`;
  const paintImagePath = await uploadFile(
    pPaintImage.buffer,
    fileName,
    process.env.AWS_BUCKET_NAME
  );
  return paintImagePath;
}
