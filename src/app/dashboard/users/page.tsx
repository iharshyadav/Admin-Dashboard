// "use server"
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search"
import styles from "@/app/ui/dashboard/user/user.module.css"
import { deleteUser } from "@/lib/action";
import { getUsers, oneUser } from "@/lib/data";
import connectToDb from "@/lib/model";
import Image from "next/image";
import Link from "next/link"

const UserPage = async ({id,searchParams}:any) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const user = await getUsers(q,page)
  // console.log(user); 

  // const deluser = 

  const deleteU = async ()=>{
    "use server"
    try {
      // await connectToDb()
    await deleteUser(id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {user?.map((users)=>(
            <tr key={users.id}>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                {users.username}
              </div>
            </td>
            <td>{users.email}</td>
            {/* <td>22.1.2024</td> */}
            <td>{users.createdAt?.toString().slice(4,16)}</td>
            <td>{(users.isAdmin) ? "Admin" : "Client"}</td>
            <td>{(users.isActive) ? "Active" : "Passive"}</td>
            <td>
              <div className={styles.buttons}>
                <Link href={`/dashboard/users/${users.id}`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <form action={deleteUser}>
                  <input type="hidden" name="id" value={users.id} />
                <button className={`${styles.button} ${styles.delete}`}>
                  Delete
                </button>
                </form>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      <Pagination/>
    </div>
  );
}

export default UserPage