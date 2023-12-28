import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  /** 
     p[-] = Product [-]
     w[-] = Writer / Write [-]
     */
  pName: {
    type: String,
    required: true,
  },
  pDescription: {
    type: String,
    required: true,
  },
  wName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pStatus: {
    type: String,
  },
  wDate: {
    type: Date,
  },
});

export default mongoose.model("Product", productsSchema);
