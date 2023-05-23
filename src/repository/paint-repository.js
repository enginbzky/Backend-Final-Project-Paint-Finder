import Paint from "../model/paint-model.js";

const getPaints = async () => {
  try {
    const paints = await Paint.findAll();
    return paints;
  } catch (error) {
    throw new Error("error while getting paints");
  }
};

const getPaintById = async (pId) => {
  try {
    const paint = await Paint.findOne({
      where: {
        id: pId,
      },
    });
    return paint;
  } catch (error) {
    throw new Error("error while getting paints");
  }
};

const createPaint = async (pPaint) => {
  try {
    // Check if paint with provided paintName already exists
    const existingPaint = await Paint.findOne({
      where: { paintName: pPaint.paintName },
    });
    if (existingPaint) {
      throw new Error("Paint with this paint name already exists");
    }
    // Create new user if email does not exist
    const newPaint = await Paint.create(pPaint);
    return newPaint;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePaintById = async (pPaintId) => {
  return await Paint.destroy({
    where: {
      id: pPaintId,
    },
  });
};

const changePaintInfo = async (
  pPaintId,
  { brand, paintName, material, description, maxSpeed }
) => {
  try {
    const result = await Paint.update(
      {
        brand,
        paintName,
        material,
        description,
        maxSpeed,
      },
      {
        where: { id: pPaintId },
      }
    );
    console.log(result); // Prints the updated paint
  } catch (error) {
    console.error(error);
  }
};

export default {
  getPaints,
  createPaint,
  deletePaintById,
  getPaintById,
  changePaintInfo,
};
