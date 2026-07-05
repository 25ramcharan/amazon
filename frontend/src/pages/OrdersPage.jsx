import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get role
  const role = localStorage.getItem("role");

  // Dynamic API URL based on role
  const url =
    role === "admin"
      ? `${import.meta.env.VITE_API_URL || ""}/api/orders/all`
      : `${import.meta.env.VITE_API_URL || ""}/api/orders/myorders`;

  // Fetch orders
  const getOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(url, {
        headers: {
          authorization: localStorage.getItem("token")
        }
      });

      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#FAF6EE", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

        .catalog-serif { font-family: 'Fraunces', Georgia, serif; }
        .catalog-mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

        .ghost-btn {
          border: 1.5px solid #1C2541;
          color: #1C2541;
          background: transparent;
          transition: all 0.15s ease;
        }
        .ghost-btn:hover {
          background: #1C2541;
          color: #FAF6EE;
        }

        .cta-btn {
          background: #1C2541;
          color: #FAF6EE;
          transition: background 0.15s ease;
        }
        .cta-btn:hover {
          background: #B5533C;
        }

        .order-slip {
          background: #FFFFFF;
          border: 1px solid #E7E0CF;
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
        .order-slip:hover {
          transform: translateY(-2px);
          border-color: #C79A46;
          box-shadow: 0 10px 24px -14px rgba(28, 37, 65, 0.35);
        }

        .price-tag {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 14px 4px 18px;
          background: #FAF6EE;
          border: 1.5px dashed #C79A46;
          border-radius: 3px 10px 10px 3px;
        }
        .price-tag::before {
          content: "";
          position: absolute;
          left: 6px;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #FAF6EE;
          border: 1.5px solid #C79A46;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div
          className="flex justify-between items-end mb-10 pb-6"
          style={{ borderBottom: "2px solid #1C2541" }}
        >
          <div>
            <p
              className="catalog-mono text-xs tracking-[0.25em] uppercase mb-2"
              style={{ color: "#B5533C" }}
            >
              {role === "admin" ? "Admin Ledger" : "Your Ledger"}
            </p>
            <h1
              className="catalog-serif text-4xl font-semibold"
              style={{ color: "#1C2541" }}
            >
              {role === "admin" ? "Total Orders" : "My Orders"}
            </h1>
          </div>

          <button
            onClick={() => navigate(role === "admin" ? "/Admin" : "/Home")}
            className="ghost-btn px-5 py-2 rounded-md font-medium text-sm"
          >
            ← {role === "admin" ? "Back to Products" : "Back to Home"}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div
                className="w-10 h-10 border-[3px] rounded-full animate-spin mx-auto mb-4"
                style={{ borderColor: "#1C2541", borderTopColor: "transparent" }}
              ></div>
              <p className="catalog-mono text-sm tracking-wide" style={{ color: "#6B6455" }}>
                Pulling up the ledger&hellip;
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg font-semibold mb-4 text-center" style={{ color: "#B5533C" }}>
              {error}
            </p>
            <button onClick={getOrders} className="cta-btn px-6 py-2 rounded-md font-medium">
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="catalog-serif text-2xl mb-1" style={{ color: "#1C2541" }}>
              No entries yet.
            </p>
            <p className="text-sm" style={{ color: "#6B6455" }}>
              Orders will show up here once they're placed.
            </p>
          </div>
        )}

        {/* Orders */}
        {!loading && !error && orders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div key={order._id} className="order-slip rounded-xl p-6">
                <h2
                  className="catalog-mono text-sm tracking-widest uppercase font-semibold mb-4"
                  style={{ color: "#B5533C" }}
                >
                  Order #{order._id?.slice(-6).toUpperCase()}
                </h2>

                {/* Show user details only for admin */}
                {role === "admin" && (
                  <>
                    <p className="mb-2 text-sm" style={{ color: "#1C2541" }}>
                      <span className="font-semibold">Customer &mdash; </span>
                      {order.userId?.name || "N/A"}
                    </p>

                    <p className="mb-3 text-sm" style={{ color: "#1C2541" }}>
                      <span className="font-semibold">Email &mdash; </span>
                      {order.userId?.email || "N/A"}
                    </p>

                    <div
                      className="border-t border-dashed mb-3"
                      style={{ borderColor: "#E7E0CF" }}
                    ></div>
                  </>
                )}

                <p className="mb-2 text-sm" style={{ color: "#1C2541" }}>
                  <span className="font-semibold">Product &mdash; </span>
                  {order.productId?.name || "N/A"}
                </p>

                <p className="mb-4 text-sm" style={{ color: "#1C2541" }}>
                  <span className="font-semibold">Quantity &mdash; </span>
                  {order.quantity}
                </p>

                <span
                  className="price-tag catalog-mono text-sm font-semibold"
                  style={{ color: "#1C2541" }}
                >
                  ₹{order.productId?.price || "N/A"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;