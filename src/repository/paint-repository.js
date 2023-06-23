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

const changePaintInfo = async (paintId, paintData) => {
  try {
    const {
      brand,
      type,
      paintName,
      material,
      season,
      budget,
      description,
      maxSpeed,
      imagePath,
    } = paintData;

    const updatedPaint = {
      brand,
      type,
      paintName,
      material,
      season,
      budget,
      description,
      maxSpeed,
      image: imagePath, // URL'yi güncellenmiş image alanına atıyoruz
    };

    const [rowsUpdated] = await Paint.update(updatedPaint, {
      where: { id: paintId },
    });

    if (rowsUpdated === 0) {
      throw new Error("Paint not found");
    }

    const updatedPaintData = await Paint.findByPk(paintId);
    return updatedPaintData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getPaints,
  createPaint,
  deletePaintById,
  getPaintById,
  changePaintInfo,
};
