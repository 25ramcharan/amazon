import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productId: "",
    name: "",
    price: "",
    rating: "",
    image: ""
  });

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Fetch products
  const getProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || ""}/api/products`);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Add product
  const addProduct = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || ""}/api/products`,
        product,
        {
          headers: {
            authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Product Added");

      setProduct({
        productId: "",
        name: "",
        price: "",
        rating: "",
        image: ""
      });

      getProducts();
    } catch (err) {
      console.error("Failed to add product:", err);
      alert("Failed to add product");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL || ""}/api/products/${id}`,
        {
          headers: {
            authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Product Deleted");
      getProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product");
    }
  };

  // Update price
  const updatePrice = async (id, oldPrice) => {
    const newPrice = prompt("Enter new price:", oldPrice);
    if (newPrice === null) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL || ""}/api/products/${id}`,
        { price: newPrice },
        {
          headers: {
            authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Price Updated");
      getProducts();
    } catch (err) {
      console.error("Failed to update price:", err);
      alert("Failed to update price");
    }
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

        .field-input {
          width: 100%;
          border: 1.5px solid #E7E0CF;
          border-radius: 8px;
          padding: 11px 14px;
          background: #FAF6EE;
          color: #1C2541;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .field-input:focus {
          outline: none;
          border-color: #C79A46;
          background: #FFFFFF;
        }
        .field-input::placeholder { color: #A39C8A; }

        .form-panel {
          background: #FFFFFF;
          border: 1.5px solid #1C2541;
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

        .update-btn {
          border: 1.5px solid #C79A46;
          color: #8A6521;
          background: transparent;
          transition: all 0.15s ease;
        }
        .update-btn:hover {
          background: #C79A46;
          color: #FFFFFF;
        }

        .delete-btn {
          border: 1.5px solid #B5533C;
          color: #B5533C;
          background: transparent;
          transition: all 0.15s ease;
        }
        .delete-btn:hover {
          background: #B5533C;
          color: #FFFFFF;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 py-10">
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
              Back Office
            </p>
            <h1
              className="catalog-serif text-5xl font-semibold"
              style={{ color: "#1C2541" }}
            >
              Admin Dashboard
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/orders")}
              className="ghost-btn px-5 py-2 rounded-md font-medium text-sm"
            >
              Orders List
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

        {/* Add Product Form */}
        <div className="max-w-xl mx-auto form-panel rounded-xl p-7 mb-14">
          <p
            className="catalog-mono text-xs tracking-[0.25em] uppercase text-center mb-2"
            style={{ color: "#B5533C" }}
          >
            New Entry
          </p>
          <h2
            className="catalog-serif text-2xl font-semibold text-center mb-6"
            style={{ color: "#1C2541" }}
          >
            Add Product
          </h2>

          <div className="space-y-4">
            <input
              value={product.productId}
              placeholder="Product ID"
              onChange={(e) => setProduct({ ...product, productId: e.target.value })}
              className="field-input"
            />

            <input
              value={product.name}
              placeholder="Product Name"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="field-input"
            />

            <input
              value={product.price}
              placeholder="Product Price"
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              className="field-input"
            />

            <input
              value={product.rating}
              placeholder="Product Rating"
              onChange={(e) => setProduct({ ...product, rating: e.target.value })}
              className="field-input"
            />

            <input
              value={product.image}
              placeholder="Image URL"
              onChange={(e) => setProduct({ ...product, image: e.target.value })}
              className="field-input"
            />

            <button
              onClick={addProduct}
              className="cta-btn w-full p-3 rounded-lg font-semibold"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Product List */}
        <p
          className="catalog-mono text-xs tracking-[0.25em] uppercase text-center mb-2"
          style={{ color: "#B5533C" }}
        >
          Full Inventory
        </p>
        <h2
          className="catalog-serif text-3xl font-semibold text-center mb-8"
          style={{ color: "#1C2541" }}
        >
          All Products
        </h2>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="product-card rounded-xl p-5">
              <img
                src={p.image || "https://via.placeholder.com/250"}
                alt={p.name}
                className="w-full h-52 object-cover rounded-lg mb-4"
                style={{ border: "1px solid #E7E0CF" }}
              />

              <h3
                className="catalog-serif text-lg font-semibold mb-2 leading-snug"
                style={{ color: "#1C2541" }}
              >
                {p.name}
              </h3>

              <p className="catalog-mono text-xs mb-4" style={{ color: "#4F7A5B" }}>
                ★ {p.rating} rating
              </p>

              <div className="mb-4">
                <span
                  className="price-tag catalog-mono text-sm font-semibold"
                  style={{ color: "#1C2541" }}
                >
                  ₹{p.price}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => updatePrice(p._id, p.price)}
                  className="update-btn flex-1 p-2 rounded-lg text-sm font-medium"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="delete-btn flex-1 p-2 rounded-lg text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;