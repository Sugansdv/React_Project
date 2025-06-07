import React, { useState } from "react";
import "../App.css";


const sampleProducts = [
  { id: 1, name: "Apple", category: "Fruits", price: 80 },
  { id: 2, name: "Carrot", category: "Vegetables", price: 30 },
  { id: 3, name: "Banana", category: "Fruits", price: 50 },
  { id: 4, name: "Broccoli", category: "Vegetables", price: 60 },
  { id: 5, name: "Milk", category: "Dairy", price: 40 },
  { id: 6, name: "Cheese", category: "Dairy", price: 90 },
];

export default function Proj5() {
  const [products] = useState(sampleProducts);
  const [cart, setCart] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState(100);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    setCart([]);
  };

  const filteredProducts = products.filter((p) => {
    return (
      (categoryFilter === "All" || p.category === categoryFilter) &&
      p.price <= priceFilter
    );
  });

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container mt-4 product-page">
      <h2 className="text-center mb-5"> Project 5: Ecommerce Product List</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">Filter by Category</label>
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="priceRange" className="form-label">
            Show products priced up to: ₹{priceFilter}
          </label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="100"
            step="10"
            value={priceFilter}
            className="form-range"
            onChange={(e) => setPriceFilter(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="row">
        {filteredProducts.length === 0 ? (
          <p>No products match the filter.</p>
        ) : (
          [...filteredProducts]
            .sort((a, b) => b.price - a.price) 
            .map((product) => (
              <div key={product.id} className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Category: {product.category}</p>
                    <p className="card-text">Price: ₹{product.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>

      <hr />
      <h4 className="mt-4"> Cart Items</h4>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center w-50"
              >
                <div>
                  {item.name} - ₹{item.price}
                </div>
                <button
                  className="btn btn-danger btn-sm "
                  onClick={() => removeFromCart(index)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
          <h5>Total: ₹{totalPrice}</h5>
          <button className="btn btn-warning mt-2" onClick={clearCart}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

