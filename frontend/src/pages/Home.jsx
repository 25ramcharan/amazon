import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  // Fetch products
  const getProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL || ""}/api/products`
      );

      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(
        "Failed to load products. Please check your connection and try again."
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#FAF6EE", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

        .catalog-serif { font-family: 'Fraunces', Georgia, serif; }
        .catalog-mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

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
          transition: all 0.15s ease;
        }
        .cta-btn:hover {
          background: #B5533C;
        }

        .product-card {
          background: #FFFFFF;
          border: 1px solid #E7E0CF;
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
        .product-card:hover {
          transform: translateY(-3px);
          border-color: #C79A46;
          box-shadow: 0 10px 24px -12px rgba(28, 37, 65, 0.35);
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex justify-between items-end mb-10 pb-6" style={{ borderBottom: "2px solid #1C2541" }}>
          <div>
            <p
              className="catalog-mono text-xs tracking-[0.25em] uppercase mb-2"
              style={{ color: "#B5533C" }}
            >
              No. 001 &mdash; Full Catalog
            </p>
            <h1
              className="catalog-serif text-5xl font-semibold"
              style={{ color: "#1C2541" }}
            >
              Amazon Products
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/account")}
              className="ghost-btn px-5 py-2 rounded-md font-medium text-sm"
            >
              My Account
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="ghost-btn px-5 py-2 rounded-md font-medium text-sm"
            >
              My Orders
            </button>
            <button
              onClick={logout}
              className="px-5 py-2 rounded-md font-medium text-sm text-white"
              style={{ background: "#B5533C" }}
            >
              Logout
            </button>
          </div>
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
                Fetching the catalog&hellip;
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
            <button
              onClick={getProducts}
              className="cta-btn px-6 py-2 rounded-md font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="catalog-serif text-2xl mb-1" style={{ color: "#1C2541" }}>
              The shelves are empty.
            </p>
            <p className="text-sm" style={{ color: "#6B6455" }}>
              Check back once new items are listed.
            </p>
          </div>
        )}

        {/* Products */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card rounded-xl p-5 flex flex-col"
              >
                {/* Image */}
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-lg mb-4"
                  style={{ border: "1px solid #E7E0CF" }}
                />

                {/* Name */}
                <h2
                  className="catalog-serif text-lg font-semibold mb-2 leading-snug"
                  style={{ color: "#1C2541" }}
                >
                  {product.name}
                </h2>

                {/* Rating */}
                <p
                  className="catalog-mono text-xs mb-4"
                  style={{ color: "#4F7A5B" }}
                >
                  ★ {product.rating} rating
                </p>

                <div className="mt-auto flex items-center justify-between gap-3">
                  {/* Price */}
                  <span className="price-tag catalog-mono text-sm font-semibold" style={{ color: "#1C2541" }}>
                    ₹{product.price}
                  </span>

                  {/* Buy */}
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="cta-btn px-5 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;