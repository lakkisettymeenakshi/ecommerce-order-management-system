import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/products"
      );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8080/api/products",
        formData
      );

      setFormData({
        name: "",
        price: "",
        quantity: ""
      });

      loadProducts();

    } catch (error) {

      console.log(error);

    }
  };

  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/products/${id}`
      );

      loadProducts();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="container mt-5">

      <h1 className="text-center mb-4">
        E-Commerce Order Management System
      </h1>

      <form onSubmit={addProduct} className="card p-4 mb-4">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="form-control mb-3"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="form-control mb-3"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="form-control mb-3"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Product
        </button>

      </form>

      {products.map(product => (

        <div
          key={product.id}
          className="card p-3 mb-3"
        >

          <h4>{product.name}</h4>

          <p>Price: ${product.price}</p>

          <p>Quantity: {product.quantity}</p>

          <button
            className="btn btn-danger"
            onClick={() => deleteProduct(product.id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default Products;