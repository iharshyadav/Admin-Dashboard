"use server"
import { revalidatePath } from "next/cache";
import connectToDb from "./model";
import { User } from "./schema";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt"
import { signIn } from "@/app/auth";

interface AuthenticateArgs {
  formData: [string, string][];
}

export const addUser = async (formData:AuthenticateArgs)=>{
  const {username,email,password,phone,isAdmin,isActive} = Object.fromEntries(formData);

  try {
    connectToDb();
    const user = await User.findOne({username});
    if(user){
        console.log("user already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    const newUser = new User({
      username,
      email,
      password : hashPassword,
      phone,
      isAdmin,
      isActive,
    });
    await newUser.save();
    console.log("saved to db");
    
  } catch (error) {
    console.log(error)
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}


export const deleteUser = async (formData:AuthenticateArgs)=>{
  const {id} = Object.fromEntries(formData);

  try {
   connectToDb();
   await User.findByIdAndDelete(id);
    console.log("User deleted");
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/dashboard/users");
}

export const updateUser = async (formData:AuthenticateArgs)=>{
  const {id,username,email,password,phone,isAdmin,isActive} = Object.fromEntries(formData);

  try {
    connectToDb();
    const update = {
      username,
      email,
      password,
      phone,
      isAdmin,
      isActive,
    };

    Object.keys(update).forEach((key)=>(update[key]=== "" || undefined) && delete update[key]);
    await User.findByIdAndUpdate(id,update);
  } catch (error) {
    console.log(error)
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export const authenticate = async (formData: any) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { username, password });
    console.log("successful");
  } catch (error) {
    if (error.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw error;
  }
};
