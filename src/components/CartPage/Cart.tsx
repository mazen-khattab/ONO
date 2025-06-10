import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import { ShoppingBag } from "lucide-react";
import "./Cart.css";
import { useCart } from "../../Services/CartContext";
import AddToCart from "../AddToCart/AddToCart";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../Services/authContext";
import api from "../../Services/api.js";

const CartPage = () => {
  const { user } = useAuth();
  const { i18n, t } = useTranslation("Cart");
  const {
    cartItems,
    loading,
    cartCount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
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
    fullyAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    onSubmit?.(formData);
  };

  const totalQuantity = cartCount;

  const DeleteProduct = async (product) => {
    if (user) {
      try {
        const response = await api.delete("/Cart/DeleteItem", {
          params: { userId: user.userId, productId: product.productId },
        });
      } catch (error) {
        console.error(error);
      }
    }

    removeFromCart(product);
  };

  if (user && loading) {
    return null;
  }

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
    <div className="cart-page">
      <Navbar></Navbar>
      <div className="cart-container">
        <h2>{t("Shopping")}</h2>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <div className="img-container">
                  <img
                    src={item.imageUrl}
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
                      quant={item.productAmount}
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
                      (total, item) => total + item.price * item.productAmount,
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
                      (total, item) => total + item.price * item.productAmount,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>

              <button
                className="complete-order"
                onClick={() => setFromActive(!formActive)}
              >
                {t("complete")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="checkout-container"
        style={formActive ? { display: "block" } : { display: "none" }}
      >
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-header">
            <h2 className="checkout-title">{t("contact_info")}</h2>
            <i
              className="fa-solid fa-xmark form-close-btn"
              onClick={() => setFromActive(!formActive)}
            ></i>
          </div>

          <div className="order-contact-info">
            <input
              type="text"
              name="name"
              placeholder={t("name")}
              required
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder={t("phone")}
              required
              autoComplete="off"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder={t("email")}
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="governorate"
              placeholder={t("select_governorate")}
              required
              autoComplete="off"
              value={formData.governorate}
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder={t("select_city")}
              required
              autoComplete="off"
              value={formData.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="fullyAddress"
              placeholder={t("address")}
              required
              autoComplete="off"
              value={formData.fullyAddress}
              onChange={handleChange}
            />
          </div>

          <div className="payment-methods">
            <h2 className="checkout-title">{t("payment_method")}</h2>
            <div className="payment-method">
              <label>
                <input type="radio" name="payment" value="cash" />{" "}
                {t("cash_on_delivery")}
              </label>
            </div>
          </div>

          <button type="submit" className="complete-order">
            {t("complete")}
          </button>
        </form>

        <div className="modal-overlay"></div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CartPage;
