import Paint from "../model/paint-model.js";

export const getProperPaint = async (selectedOptions) => {
  try {
    const { selectedType, selectedMaterial, season, selectedSpeed, budget } =
      selectedOptions;

    const paintData = await Paint.findOne({
      where: {
        type: selectedType,
        material: selectedMaterial,
        season: season,
        maxSpeed: selectedSpeed,
        budget: budget,
      },
    });

    return paintData;
  } catch (error) {
    throw new Error("Error retrieving paint data");
  }
};
