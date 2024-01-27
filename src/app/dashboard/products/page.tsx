import Pagination from "@/app/ui/dashboard/pagination/pagination"
import Search from "@/app/ui/dashboard/search/search"
import Image from "next/image"
import Link from "next/link"
import styles from "@/app/ui/dashboard/products/products.module.css"
import { getProduct } from "@/lib/data"

const ProductPage = async () => {

  const product = await getProduct();
  return (
    <div className={styles.container}>
    <div className={styles.top}>
      <Search placeholder="Search for a products..." />
      <Link href="/dashboard/products/add">
        <button className={styles.addButton}>Add New</button>
      </Link>
    </div>
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Title</td>
          <td>Description</td>
          <td>Price</td>
          <td>Created At</td>
          <td>Stock</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {product?.map((products:any)=>(
          <tr key={products.id}>
          <td>
            <div className={styles.product}>
              <Image
                src={products.img || "/noproduct.jpg"}
                alt=""
                width={40}
                height={40}
                className={styles.productImage}
              />
              {products.title}
            </div>
          </td>
          <td>{products.desc}</td>
          <td>₹{products.price}</td>
          {/* <td>{products.createdAt.toString().splice(4,16)}</td> */}
          <td>72</td>  
          <td>Action</td>
          <td>
            <div className={styles.buttons}>
              <Link href="/dashboard/products/test">
                <button className={`${styles.button} ${styles.view}`}>
                  View
                </button>
              </Link>
              <button className={`${styles.button} ${styles.delete}`}>
                Delete
              </button>
            </div>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    <Pagination/>
  </div>
  )
}

export default ProductPage