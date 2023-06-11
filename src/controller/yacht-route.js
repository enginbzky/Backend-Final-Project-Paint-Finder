import express from "express";
import yachtRepository from "../repository/yacht-repository";

const router = express.Router();

// Get all paints
router.get("/paints", async (req, res) => {
  try {
    const { selectedType, selectedMaterial, season, selectedSpeed, budget } =
      req.query;

    const selectedOptions = {
      selectedType,
      selectedMaterial,
      season,
      selectedSpeed,
      budget,
    };

    const paintData = await yachtRepository.getProperPaint(selectedOptions);
    return res.status(200).json(paintData);
  } catch (error) {
    console.error("Error fetching paint data:", error);
    return res.status(500).json({ error: "Error fetching paint data" });
  }
});

export default router;
