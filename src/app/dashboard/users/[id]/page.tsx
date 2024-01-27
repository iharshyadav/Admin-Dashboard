import Image from "next/image"
import styles from "@/app/ui/dashboard/user/SingleUser/singleUser.module.css"
import { oneUser } from "@/lib/data"
import { updateUser } from "@/lib/action"


const SingleUser = async ({params}) => {
    
  const { id } = params;
  const user = await oneUser(id);

  // const handlesubmit = async ({id}:any={})=>{
  //  try {
  //   connectToDb();
    // const user = await oneUser(id);
  //  } catch (error) {
  //   console.log(error)
  //  }
  // }

  return (
    <div className={styles.container}>
    <div className={styles.infoContainer}>
      <div className={styles.imgContainer}>
        <Image src={user.img || "/noavatar.png"} alt="" fill />
      </div>
      {user.username}
      {/* Harsh Yadav */}
    </div>
    <div className={styles.formContainer}>
      <form action={updateUser} className={styles.form}>
        <input type="hidden" name="id" value={user.id}/>
        <label>Username</label>
        <input type="text" name="username" placeholder={user.username}  />
        <label>Email</label>
        <input type="email" name="email" placeholder={user.email} />
        <label>Password</label>
        <input type="password" name="password" placeholder={user.password} />
        <label>Phone</label>
        <input type="text" name="phone" placeholder={user.phone}  />
        <label>Address</label>
        <textarea type="text" name="address" placeholder={user.address} />
        <label>Is Admin?</label>
        <select name="isAdmin" id="isAdmin">
          <option value={true} selected={user.isAdmin}>Yes</option>
          <option value={false} selected={!user.isAdmin}>No</option>
        </select>
        <label>Is Active?</label>
        <select name="isActive" id="isActive" value={user.isActive}>
          <option value={true} selected={user.isActive}>Yes</option>
          <option value={false} selected={!user.isActive}>No</option>
        </select>
        <button>Update</button>
      </form>
    </div>
  </div>
  )
}

export default SingleUser