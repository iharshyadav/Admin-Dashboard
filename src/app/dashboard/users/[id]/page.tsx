import Image from "next/image"
import styles from "@/app/ui/dashboard/user/SingleUser/singleUser.module.css"

const SingleUser = () => {
    

  return (
    <div className={styles.container}>
    <div className={styles.infoContainer}>
      <div className={styles.imgContainer}>
        <Image src="/noavatar.png" alt="" fill />
      </div>
      {/* {user.username} */}
      Harsh Yadav
    </div>
    <div className={styles.formContainer}>
      <form action="" className={styles.form}>
        <input type="hidden" name="id" />
        <label>Username</label>
        <input type="text" name="username" placeholder="harsh" />
        <label>Email</label>
        <input type="email" name="email" placeholder="email" />
        <label>Password</label>
        <input type="password" name="password" />
        <label>Phone</label>
        <input type="text" name="phone" placeholder="phone no." />
        <label>Address</label>
        <textarea type="text" name="address" placeholder="address" />
        <label>Is Admin?</label>
        <select name="isAdmin" id="isAdmin">
          <option value={true} selected>Yes</option>
          <option value={false} selected>No</option>
        </select>
        <label>Is Active?</label>
        <select name="isActive" id="isActive">
          <option value={true} selected>Yes</option>
          <option value={false} selected>No</option>
        </select>
        <button>Update</button>
      </form>
    </div>
  </div>
  )
}

export default SingleUser