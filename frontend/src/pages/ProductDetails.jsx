import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  // Fetch single product
  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL || ""}/api/products/${id}`
      );
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // Confirm Purchase and save order
  const confirmPurchase = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || ""}/api/orders`,
        {
          productId: product._id,
          quantity: 1
        },
        {
          headers: {
            authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Order Placed Successfully");

      // Navigate to order placed page
      navigate("/orderplaced");
    } catch (error) {
      console.log(error);
      alert("Purchase Failed");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4"
      style={{ background: "#FAF6EE", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

        .catalog-serif { font-family: 'Fraunces', Georgia, serif; }
        .catalog-mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

        .detail-card {
          background: #FFFFFF;
          border: 1px solid #E7E0CF;
        }

        .price-tag {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 16px 5px 20px;
          background: #FAF6EE;
          border: 1.5px dashed #C79A46;
          border-radius: 3px 10px 10px 3px;
        }
        .price-tag::before {
          content: "";
          position: absolute;
          left: 7px;
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
          transition: background 0.15s ease;
        }
        .cta-btn:hover {
          background: #B5533C;
        }
      `}</style>

      <div className="w-full max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="ghost-btn px-4 py-1.5 rounded-md text-xs font-medium mb-4"
        >
          ← Back
        </button>

        <div className="detail-card rounded-2xl p-8">
          <p
            className="catalog-mono text-xs tracking-[0.25em] uppercase text-center mb-4"
            style={{ color: "#B5533C" }}
          >
            No. 003 &mdash; Item Detail
          </p>

          {/* Product Image */}
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.name}
            className="w-full h-64 object-cover rounded-xl mb-6"
            style={{ border: "1px solid #E7E0CF" }}
          />

          {/* Product Name */}
          <h1
            className="catalog-serif text-2xl font-semibold text-center mb-4"
            style={{ color: "#1C2541" }}
          >
            {product.name}
          </h1>

          {/* Rating */}
          <p
            className="catalog-mono text-xs text-center mb-6"
            style={{ color: "#4F7A5B" }}
          >
            ★ {product.rating} rating
          </p>

          {/* Price */}
          <div className="flex justify-center mb-8">
            <span
              className="price-tag catalog-mono text-base font-semibold"
              style={{ color: "#1C2541" }}
            >
              ₹{product.price}
            </span>
          </div>

          {/* Confirm Button */}
          <button
            onClick={confirmPurchase}
            className="cta-btn w-full py-3 rounded-lg font-semibold"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;