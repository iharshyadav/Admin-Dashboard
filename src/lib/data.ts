import connectToDb from "./model"
import { Product, User } from "./schema";

export const getUsers = async(q,page)=>{
  const regex = RegExp(q,"i");

  const ITEM_PER_PAGE = 40;
  
    try {
      await connectToDb();
      const user = await User.find({username: { $regex:regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page-1));
      return user;
    } catch (error) {
        console.log(error)
    }
}

export const oneUser = async (id)=>{
  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error)
    // throw new Error("Failed to fetch user!");
  }
}

export const getProduct = async ()=>{
  try {
    await connectToDb();
    const product = await Product.find();
    return product;
    console.log(product);
  } catch (error) {
    console.log(error)
  }
}