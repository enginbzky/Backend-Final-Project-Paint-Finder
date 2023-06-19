import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "./object.strorage.service.js";
import createPaint from "../repository/paint-repository.js";

export async function uploadImage(pPaintId, pPaintImage) {
  //upload the image into the cloud
  //get the url of the image from the cloud
  //find the paint and update the image url

  const fileName = `paintFinder_${uuidv4()}`;
  const paintImagePath = await uploadFile(
    pPaintImage.buffer,
    fileName,
    process.env.AWS_BUCKET_NAME
  );
  return paintImagePath;
}
