import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../../assets/cross_icon.png'
import { backend_url } from "../../App";
const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async() => {
   await fetch(`${backend_url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
  }

  useEffect(() => {
    fetchInfo();
  }, [])
  const remove_product = async (id) => {
    await fetch(`${backend_url}/removeproduct`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })

    fetchInfo();
  }

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p> <p>Title</p> <p>Old Price</p> <p>New Price</p> <p>Category</p> <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {
          allproducts.map((product,index)=>{
            return <div key={index} className="listproduct-format-main listproduct-format">
              <img className="listproduct-product-icon" src={backend_url+product.image} alt="" />
              <p className="cartitems-product-title">{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_product(product.id)}}className="listproduct-remove-icon"  src={cross_icon} alt="" />
            </div>
          })
        }
        </div>
        </div>
  );
};

export default ListProduct;
