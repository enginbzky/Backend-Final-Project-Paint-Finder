import express from "express";
import paintRepository from "../repository/paint-repository.js";
import { uploadImage } from "../service/paint.service.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const upload = multer();

// router.post ('/paintImages/:paintId/image/', upload.single('paintImage'), async (req, res)=>{
//   try{
//     const paintId =req.params.paintId;
//     const paintImage = req.file;

//     const paint = await updateImage(paintId, paintImage);

//     res.status(201).json(paint);
//   } catch (err){
//     console.error(err);
//     res.status(500).send();
//   }
// })

// Get all paints
router.get("/paints", async (req, res) => {
  try {
    const paints = await paintRepository.getPaints();
    return res.status(200).send(paints);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching paints" });
  }
});

// Get paint by id
router.get("/paints/:id", async (req, res) => {
  try {
    const paintId = req.params.id;
    const paint = await paintRepository.getPaintById(paintId);
    return res.status(200).send(paint);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching paints" });
  }
});

// Create a new paint
router.post("/paints", upload.single("paintImage"), async (req, res, next) => {
  try {
    const {
      paintName,
      type,
      brand,
      material,
      season,
      budget,
      description,
      maxSpeed,
    } = JSON.parse(req.body.paint);
    // console.log(
    //   "aaaaaaaaaaAAAAAAEBBBE",
    //   JSON.parse(req.body.paint),
    //   req.body.paint.paintName
    // );
    const paintImage = req.file;

    if (!paintImage) {
      return res.status(400).send({ message: "Missing paint image" });
    }

    const newPaint = {
      brand,
      type,
      paintName,
      season,
      budget,
      material,
      description,
      maxSpeed,
      image: "test",
    };

    try {
      const savedFile = await uploadImage(uuidv4(), paintImage);
      newPaint.image = savedFile.Location;
      const paint = await paintRepository.createPaint(newPaint);
      return res.status(201).send(paint);
    } catch (error) {
      console.log("BURDAMISINNNNN ERROR", error);
    }

    // await notifyPaint(paint.paintName);
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

// Delete a paints by id
router.delete("/paints/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const paint = await paintRepository.deletePaintById(id);
    if (!paint) {
      return next({ status: 404, message: "Paint" + id + " does not exist" });
    }
    res.json(`paint with the id ${id} deleted`);
  } catch (err) {
    console.error(err);
    next({ status: 404, message: `failed to delete paint ${id}` });
  }
});

router.put("/paints/:id", async (req, res, next) => {
  try {
    const paintId = req.params.id;
    const aPaint = req.body;
    const changePaintInfo = await paintRepository.changePaintInfo(
      paintId,
      aPaint
    );
    res.status(200).json(changePaintInfo);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
