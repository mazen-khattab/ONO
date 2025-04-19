import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import { ShoppingBag } from "lucide-react";
import "./Cart.css";
import { useCart } from "../../CartContext";
import AddToCart from "../AddToCart/AddToCart";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const { i18n, t } = useTranslation("Cart");
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formActive, setFromActive] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    governorate: "",
    city: "",
  });

  const governorates = ["Cairo", "Giza", "Alexandria"];
  const citiesByGovernorate = {
    Cairo: ["Nasr City", "Heliopolis", "Maadi"],
    Giza: ["Dokki", "Mohandessin", "6th October"],
    Alexandria: ["Smouha", "Stanley", "Gleem"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    onSubmit?.(formData);
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const DeleteProduct = (product) => {
    removeFromCart(product);
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar></Navbar>

        <div className="cart-content-empty">
          <ShoppingBag className="empty-cart-icon" />
          <h2>{t("empty_cart")}</h2>
          <h3>{t("no_items")}</h3>
          <a href="./AllProducts" className="cart-shop-now">
            {t("shop_now")}
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
        <h2>{t("Shopping")}</h2>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
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
                  <p style={{ marginBottom: "10px" }}>${item.price}</p>
                  <div>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => DeleteProduct(item)}
                    ></i>
                    <AddToCart
                      Product={item}
                      quant={item.quantity}
                      disable={false}
                      increaseable={true}
                    ></AddToCart>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="price-container">
            <div className="complete">
              <h2>{t("summary")}</h2>

              <div className="items-details">
                <p>{t("items")}</p>
                <p>{totalQuantity}</p>
              </div>

              <div className="sub-price">
                <p>{t("price")}</p>
                <p>
                  $
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>

              <div className="discount-details">
                <p>{t("discount")}</p>
                <p>{discount}</p>
              </div>

              <div className="total-price">
                <p>{t("total")}</p>
                <p>
                  $
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>

              <button className="complete-order" onClick={() => setFromActive(!formActive)}>{t("complete")}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-container" style={formActive ? {display: "block"} : {display: "none"}}>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <i className="fa-solid fa-xmark form-close-btn" onClick={() => setFromActive(!formActive)}></i>
          <h2 className="checkout-title">Contact Info</h2>

          <div className="order-contact-info">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <select
              name="governorate"
              required
              value={formData.governorate}
              onChange={handleChange}
            >
              <option value="">Select Governorate</option>
              {governorates.map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>

            <select
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.governorate}
            >
              <option value="">Select City</option>
              {formData.governorate &&
                citiesByGovernorate[formData.governorate].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>

            <input
              type="text"
              name="fullyAddress"
              placeholder="Address"
              autoComplete="off"
              required
            />
          </div>

          <button type="submit" className="complete-order">
            Complete Order
          </button>
        </form>

        <div className="modal-overlay"></div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CartPage;
