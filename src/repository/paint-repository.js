import Paint from "../model/paint-model.js";

const getPaints = async () => {
  try {
    const paints = await Paint.findAll();
    console.log(paints);
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
    if (!pPaint.paintName) {
      throw new Error("Paint name is required"); // Ekledim, paintName boş ise hata fırlatıyoruz
    }

    // Check if paint with provided paintName already exists
    const existingPaint = await Paint.findOne({
      where: { paintName: pPaint.paintName },
    });
    if (existingPaint) {
      throw new Error("Paint with this paint name already exists");
    }
    // Create new user if email does not exist

    const newPaint = await Paint.create(pPaint);
    console.log("AABBB********1111**", newPaint);
    return newPaint;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePaintById = async (pPaintId) => {
  try {
    const deletedPaint = await Paint.destroy({
      where: {
        id: pPaintId,
      },
    });

    if (deletedPaint) {
      return deletedPaint; // Silinen boyayı geri döndür
    } else {
      throw new Error(`Failed to delete paint with id ${pPaintId}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const changePaintInfo = async (
  pPaintId,
  pPaintImagePath,
  { brand, type, paintName, material, season, budget, description, maxSpeed }
) => {
  try {
    const result = await Paint.update(
      {
        brand,
        type,
        paintName,
        material,
        season,
        budget,
        description,
        maxSpeed,
        image: pPaintImagePath,
      },
      {
        where: { id: pPaintId },
      }
    );
    const updatedPaint = await Paint.findByPk(pPaintId); // Güncellenen boya kaydını yeniden sorgula
    return updatedPaint;
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
