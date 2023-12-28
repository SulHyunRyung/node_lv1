import express from "express";
import Product from "../schemas/products.schema.js";
import Joi from "joi";

const router = express.Router();

/** GET */
router.get("/product", async (req, res) => {
  try {
    const { productId } = req.params;
    const getData = await Product.find(
      {},
      {
        _id: "$_id",
        pName: "$pName",
        pDescription: "$pDescription",
        wName: "$wName",
        pStatus: "$pStatus",
        wDate: "$wDate",
      }
    ).sort("-wDate");

    if (!getData) {
      throw {
        name: noData,
      };
    }
    return res.status(200).json({ getData });
  } catch (error) {
    next(error);
  }
});

/** POST */
router.post("/product", async (req, res, next) => {
  try {
    const pDate_errorck = Joi.object({
      pName: Joi.string().min(1),
      pDescription: Joi.string().min(1),
      wName: Joi.string().min(1),
      password: Joi.string().min(1),
    });

    const Vali = await pDate_errorck.validateAsync(req.body);

    const { pName, pDescription, wName, password } = Vali;

    const pData = new Product({
      pName: pName,
      pDescription: pDescription,
      wName: wName,
      password: password,
      pStatus: "FOR_SALE",
      wDate: new Date(),
    });

    await pData.save();

    return res
      .status(200)
      .json({ messege: "상품이 정상적으로 등록되었습니다." });
  } catch (error) {
    next(error);
  }
});

/** PACTH */
router.patch("/product/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const getData = await Product.findOne({
      _id: productId,
      password: "$password",
    }).exec();

    if (!getData) {
      throw { name: "noData" };
    }

    const pDate_errorck = Joi.object({
      pName: Joi.string().min(1),
      pDescription: Joi.string().min(1),
      wName: Joi.string().min(1),
      password: Joi.string().min(1),
    });
    const Vali = await pDate_errorck.validateAsync(req.body);

    if (Vali.password !== getData.password)
      throw {
        name: "pwDifferent",
      };
    Product.updateMany({
      _id: productId,
      pName: Vali.pName,
      pDescription: Vali.pDescription,
      pStatus: Vali.pStatus,
    }).exec();

    return res.status(200).json({ message: "상품 정보를 수정하였습니다." });
  } catch (error) {
    next(error);
  }
});

/** Delete */
router.delete("/product/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;

    const getdata = await Product.findOne({
      _id: productId,
      password: "$password",
    }).exec();

    if (!getdata) {
      throw { name: "CastError" };
    }

    const pDate_errorck = Joi.object({
      password: Joi.string().min(1),
    });

    const Vali = await pDate_errorck.validateAsync(req.body);

    if (Vali.password !== getdata.password)
      throw {
        name: "pwDifferent",
      };

    //삭제
    await Product.deleteOne({ _id: productId }).exec();

    return res.status(200).json({ message: "삭제가 완료되었습니다." });
  } catch (error) {
    next(error);
  }
});

export default router;
