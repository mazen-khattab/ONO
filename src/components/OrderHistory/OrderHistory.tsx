import { useEffect, useState } from "react";
import {
  Package,
  Calendar,
  CreditCard,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "./OrderHistory.css";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import api from "../../Services/api.js";

interface Product {
  productId: number;
  name: string;
  description: string;
  ageRange: string;
  price: number;
  productAmount: number;
  imageUrl: string;
}

interface Order {
  orderId: string;
  orderDate: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  totalPrice: number;
  products: Product[];
}

const OrderHistory = () => {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await api.get("/Order/OrderHistory");
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getOrders();
  }, []);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "status-delivered";
      case "Shipped":
        return "status-shipped";
      case "Processing":
        return "status-processing";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "status-processing";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="order-history-page">
        <div className="order-history-container">
          <div className="page-header">
            <div className="header-content">
              <Package className="header-icon" size={100} />
              <div>
                <h1 className="page-title">Order History</h1>
                <p className="page-subtitle">View and track your past orders</p>
              </div>
            </div>
          </div>

          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.orderId} className="order-card">
                <div
                  className="order-header"
                  onClick={() => toggleOrderExpansion(order.orderId)}
                >
                  <div className="order-info">
                    <div className="order-id">
                      <Package size={20} />
                      <span>Order #{order.orderId}</span>
                    </div>
                    <div className="order-meta">
                      <div className="order-date">
                        <Calendar size={16} />
                        <span>{formatDate(order.orderDate)}</span>
                      </div>
                      <div
                        className={`order-status ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </div>
                    </div>
                  </div>
                  <div className="order-summary">
                    <div className="order-total">
                      <span>
                        {order.totalPrice.toFixed(2)}{" "}
                        <span className="currency">EGP</span>{" "}
                      </span>
                    </div>
                    <button className="expand-btn">
                      {expandedOrders.includes(order.orderId) ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {expandedOrders.includes(order.orderId) && (
                  <div className="order-details">
                    <div className="products-list">
                      {order.products.map((product) => (
                        <div key={product.productId} className="product-item">
                          <div className="product-image">
                            <img src={product.imageUrl} alt={product.name} />
                          </div>
                          <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">
                              {product.description}
                            </p>
                            <div className="product-meta">
                              <span className="product-age">
                                Age: {product.ageRange}
                              </span>
                              <span className="product-price">
                                Price: {product.price * product.productAmount}{" "}
                                <span className="currency">EGP</span>
                              </span>
                              <span className="product-quantity">
                                Qty: {product.productAmount}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="empty-orders">
              <Package className="empty-icon" size={64} />
              <h2>No Orders Yet</h2>
              <p>
                You haven't placed any orders yet. Start shopping to see your
                order history here.
              </p>
              <a href="/AllProducts" className="shop-now-btn">
                Start Shopping
              </a>
            </div>
          )}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default OrderHistory;
