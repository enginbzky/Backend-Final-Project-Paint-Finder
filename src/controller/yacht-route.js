import express from "express";
import yachtRepository from "../repository/yacht-repository.js";

const router = express.Router();

// Get all paints
router.get("/selectedPaints", async (req, res) => {
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

router.post("/savePaintData", async (req, res, next) => {
  try {
    const {
      boatName,
      boatLength,
      boatDraft,
      selectedType,
      selectedMaterial,
      season,
      selectedSpeed,
      budget,
    } = req.body;
    const newYacht = {
      boatName,
      boatLength,
      boatDraft,
      selectedType,
      selectedMaterial,
      season,
      selectedSpeed,
      budget,
      userId: req.user.id,
    };
    const yacht = await yachtRepository.createYachtData(newYacht);
    // await notifyPaint(paint.paintName);
    return res.status(201).send(yacht);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({ message: "Invalid paint input" });
    } else if (error.message === "Paint with this paint name already exists") {
      return next({ message: "A paint with this paint already exists" });
    } else {
      return next(error);
    }
  }
});

export default router;
