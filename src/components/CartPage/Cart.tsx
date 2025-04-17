import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import { ShoppingBag } from "lucide-react";
import "./Cart.css";
import { useCart } from "../../CartContext";
import AddToCart from "../AddToCart/AddToCart";

const CartPage = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [discount, setDiscount] = useState(0);
  const [formData, setFormData] = useState({
    products: [],
    discount: 0,
    price: 0,
    totalPrice: 0,
  });

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ products: [], discount: 0, price: 0, totalPrice: 0 });
  };

  const DeleteProduct = (id) => {
    removeFromCart(id);
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar></Navbar>

        <div className="cart-content-empty">
          <ShoppingBag className="empty-cart-icon" />
          <h2>العربه فارغة</h2>
          <h3>لم يتم اضافة اي منتجات الى العربة</h3>
          <a href="./AllProducts" className="cart-shop-now">
            Shop Now
          </a>
        </div>

        <Footer></Footer>
      </div>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="cart-container">
        <h2>Shopping Cart</h2>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="img-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Age: {item.ageRange}</p>
                  <p style={{marginBottom: "10px"}}>${item.price}</p>
                  <div>
                    <i className="fa-solid fa-trash" onClick={() => DeleteProduct(item.id)}></i>
                    <AddToCart Product={item} quant={item.quantity} disable={false} increaseable={true}></AddToCart>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form className="price-container" onSubmit={handleSubmit}>
            <h2>Order summary</h2>

            <div className="items-details">
              <p>Items</p>
              <p>{totalQuantity}</p>
            </div>

            <div className="sub-price">
              <p>Price</p>
              <p>
                $
                {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}
              </p>
            </div>

            <div className="discount-details">
              <p>Discount</p>
              <p>{discount}</p>
            </div>

            <div className="total-price">
              <p>Total</p>
              <p>
                $
                {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}
              </p>
            </div>

            <button>Complete the order</button>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CartPage;
