import Paint from "../model/paint-model.js";
import Yacht from "../model/yacht-model.js";
import User from "../model/user-model.js";

const getProperPaint = async (selectedOptions) => {
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

// const createYachtData = async (pYacht) => {
//   try {
//     // Check if paint with provided paintName already exists
//     const existingYacht = await Yacht.findOne({
//       where: { boatName: pYacht.boatName },
//     });
//     if (existingYacht) {
//       throw new Error("The Yacht with this name already exists");
//     }
//     // Create new yacht if yacht does not exist
//     const newYacht = await Yacht.create({ ...pYacht, UserId: pYacht.userId });
//     return newYacht;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

const addYacht = async (email, yachtData) => {
  console.log("addYacht");
  console.log(yachtData);
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const newYacht = await Yacht.create(yachtData);

    await user.addYacht(newYacht);

    return newYacht;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getYachtByUserId = async (userId) => {
  try {
    const yacht = await Yacht.findAll({ where: { userId } });
    return yacht;
  } catch (error) {
    throw new Error("Error retrieving yacht data");
  }
};

export default { getProperPaint, addYacht, getYachtByUserId };
