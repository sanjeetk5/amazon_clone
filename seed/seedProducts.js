import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  { name: "Laptop", description: "Powerful laptop", price: 1200, image: "laptop.jpg" },
  { name: "Phone", description: "Smartphone with features", price: 800, image: "phone.jpg" },
  { name: "Headphones", description: "Noise cancelling", price: 150, image: "headphones.jpg" }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("✅ Products seeded");
  mongoose.disconnect();
});
