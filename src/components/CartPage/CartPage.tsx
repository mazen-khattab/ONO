import { useState, useEffect } from "react";
import Navbar from "../Navbar.js";
import Footer from "../Footer/Footer.js";
import { ShoppingBag } from "lucide-react";
import "./CartPage.css";
import { useCart } from "../../Services/CartContext.js";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../Services/authContext.js";
import api from "../../Services/api.js";

const CartPage = () => {
  const { user, setUser, guestId, getUserProfile } = useAuth();
  const [completeLoading, setCompleteLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [orderCompletedActive, setOrderCompletedActive] = useState(false);
  const { t } = useTranslation("Cart");
  type CartItem = {
    productId: number;
    imageUrl: string;
    name: string;
    description: string;
    ageRange: string;
    price: number;
    productAmount: number;
    stockUnit: number;
    reserved: number;
  };

  const {
    cartItems,
    setCartItems,
    cartLoading,
    cartCount,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    migrateGuestCartData,
    getUserProducts,
  }: {
    cartItems: CartItem[];
    loading: boolean;
    cartCount: number;
    removeFromCart: (item: CartItem) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
  } = useCart();
  const [discount, setDiscount] = useState(0);
  const [formActive, setFromActive] = useState(false);
  const [userProfile, setUserProfile] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    orderNotes: "",
    address: {
      governorate: "",
      city: "",
      fullAddress: "",
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setFormData(response);
        setUserProfile(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleUserRegistration = async () => {
    setRegisterError("");

    const criteria = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phoneNumber: formData.phone,
      email: formData.email.trim(),
      password: formData.password,
      confirmPassword: formData.password,
    };

    try {
      await api.post("/Auth/Register", criteria);
    } catch (error) {
      console.error(error);
      setRegisterError(
        error.response?.data || "Registration failed. Please try again."
      );
      return false;
    }

    try {
      await migrateGuestCartData();
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setCompleteLoading(false);
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCompleteLoading(true);
    const totalprice = cartItems.reduce(
      (total, item) => total + item.price * item.productAmount,
      0
    );

    let productItems = cartItems;

    if (!user) {
      const response = await handleUserRegistration();

      if (!response) {
        setCompleteLoading(false);
        return;
      }

      const profile = await getUserProfile();
      setUserProfile(profile);

      const userProducts = await getUserProducts();
      productItems = userProducts;
    }

    console.log(userProfile);
    if (userProfile?.address === null) {
      console.log(`add user address`);
      const addressInfo = {
        governorate: formData.address.governorate,
        city: formData.address.city,
        fullAddress: formData.address.fullAddress,
      };

      try {
        const response = await api.post("/User/AddUserAddress", addressInfo);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    const orderInfo = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      Phone: formData.phone,
      notes: formData.orderNotes,
      totalPrice: totalprice,
      address: formData.address,
      cartItems: productItems,
    };

    try {
      const response = await api.post("/Order/CompleteOrder", orderInfo);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setOrderCompletedActive(true);
    setCartItems([]);

    setTimeout(() => {
      setOrderCompletedActive(false);
      setFromActive(false);
    }, 5000);
  };

  const Increase = async (id: number) => {
    if (user) {
      try {
        const response = await api.put("/Cart/Increase", null, {
          params: {
            productId: id,
          },
        });

        increaseQuantity(id);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await api.put("/Cart/IncreaseGuest", null, {
          params: {
            productID: id,
          },
          headers: { GuestId: guestId },
        });

        increaseQuantity(id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const Decrease = async (id: number) => {
    if (user) {
      try {
        const response = await api.put("/Cart/Decrease", null, {
          params: {
            productId: id,
          },
        });

        decreaseQuantity(id);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await api.put("/Cart/DecreaseGuest", null, {
          params: {
            productID: id,
          },
          headers: { GuestId: guestId },
        });

        decreaseQuantity(id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const DeleteProduct = async (product) => {
    if (user) {
      try {
        const response = await api.delete("/Cart/DeleteItem", {
          params: { productId: product.productId },
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await api.delete("/Cart/DeleteGuestItem", {
          params: {
            productID: product.productId,
          },
          headers: { GuestId: guestId },
        });

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    removeFromCart(product);
  };

  if (cartLoading) {
    return null;
  }

  if (cartItems.length === 0 && !formActive) {
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
                  <p className="product-age">Age: {item.ageRange}</p>
                    
                  <p className="product-price">Price: {item.price}<span className="price-currency">EGP</span></p>
                  <i
                    className="fa-solid fa-close delete-btn"
                    onClick={() => DeleteProduct(item)}
                  ></i>
                  <div>
                    <div className="product-amount">
                      <button
                        className="decrease-amount"
                        disabled={item.productAmount <= 1}
                        onClick={() => Decrease(item.productId)}
                      >
                        -
                      </button>
                      <p className="amount">{item.productAmount}</p>
                      <button
                        className="increase-amount"
                        onClick={() => Increase(item.productId)}
                        disabled={item.reserved >= item.stockUnit}
                      >
                        +
                      </button>
                    </div>
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
                <p>{cartCount}</p>
              </div>

              <div className="sub-price">
                <p>{t("price")}</p>
                <p>
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.productAmount,
                      0
                    )
                    .toFixed(2)}
                    <span className="price-currency">EGP</span>
                </p>
              </div>

              <div className="discount-details">
                <p>{t("discount")}</p>
                <p>{discount}</p>
              </div>

              <div className="total-price">
                <p>{t("total")}</p>
                <p>
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.productAmount,
                      0
                    )
                    .toFixed(2)}
                    <span className="price-currency">EGP</span>
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
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
          style={
            orderCompletedActive ? { display: "none" } : { display: "flex" }
          }
        >
          <div className="checkout-header">
            <h2 className="checkout-title">{t("contact_info")}</h2>
            <i
              className="fa-solid fa-xmark form-close-btn"
              onClick={() => setFromActive(!formActive)}
            ></i>
          </div>

          <div className="order-contact-info">
            <p
              style={{
                textAlign: "center",
                color: "red",
                marginBottom: "10px",
              }}
            >
              {registerError}
            </p>

            <div className="order-contact-grid">
              <div>
                <label htmlFor="fname">
                  {t("fname")} <span>*</span>
                </label>
                <input
                  id="fname"
                  type="text"
                  name="firstName"
                  placeholder={t("enter") + " " + t("fname")}
                  required
                  autoComplete="off"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="lname">
                  {t("lname")} <span>*</span>
                </label>
                <input
                  id="lname"
                  type="text"
                  name="lastName"
                  placeholder={t("enter") + " " + t("lname")}
                  required
                  autoComplete="off"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="order-contact-grid ">
              <div>
                <label htmlFor="email">
                  {t("email")} <span>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={t("enter") + " " + t("email")}
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone">
                  {t("phone")}
                  <span>*</span>
                </label>
                <input
                  id="phone"
                  type="number"
                  name="phone"
                  placeholder={t("enter") + " " + t("phone")}
                  autoComplete="off"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="order-contact-grid">
              <div>
                <label htmlFor="governorate">
                  {t("select_governorate")} <span>*</span>
                </label>
                <input
                  id="governorate"
                  type="text"
                  name="governorate"
                  placeholder={t("enter") + " " + t("select_governorate")}
                  required
                  autoComplete="off"
                  value={formData.address?.governorate || ""}
                  onChange={handleAddressChange}
                />
              </div>

              <div>
                <label htmlFor="city">
                  {t("select_city")} <span>*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder={t("enter") + " " + t("select_city")}
                  required
                  autoComplete="off"
                  value={formData.address?.city || ""}
                  onChange={handleAddressChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="fullyAddress">
                {t("address")} <span>*</span>
              </label>
              <input
                id="fullyAddress"
                type="text"
                name="fullAddress"
                placeholder={t("full address")}
                required
                autoComplete="off"
                value={formData.address?.fullAddress || ""}
                onChange={handleAddressChange}
              />
            </div>

            {!user && (
              <div>
                <label htmlFor="password">
                  {t("password-lable")} <span>*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder={t("enter") + " " + t("password")}
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="textarea">
              <label htmlFor="orderNotes">{t("notes")}:</label>
              <textarea
                id="orderNotes"
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="payment-methods">
            <h2 className="checkout-title">{t("payment_method")}</h2>
            <div className="payment-method">
              <label>
                <input type="radio" name="payment" value="cash" required />{" "}
                {t("cash_on_delivery")}
              </label>
            </div>
          </div>

          <button type="submit" className="complete-order">
            {completeLoading === true ? (
              <div className="spinner" />
            ) : (
              t("complete")
            )}
          </button>
        </form>

        <div
          className="successfullMessage-container"
          style={
            orderCompletedActive ? { display: "flex" } : { display: "none" }
          }
        >
          <i
            className="fa-solid fa-xmark form-close-btn"
            onClick={() => setFromActive(!formActive)}
          ></i>
          <div className="icon-container">
            <i className="fa-solid fa-check"></i>
          </div>
          <div className="info-container">
            <p>The order completed successfull, we will contact you in 24H</p>
          </div>
          <div className="cart-shop-now-container">
            <a href="./AllProducts" className="cart-shop-now">
              {t("shop_now")}
            </a>
          </div>
        </div>

        <div className="modal-overlay"></div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default CartPage;
