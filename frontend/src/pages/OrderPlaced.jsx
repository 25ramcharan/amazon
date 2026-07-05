import { Link } from "react-router-dom";

function OrderPlaced() {
  return (
    <div
      className="flex justify-center items-center min-h-screen px-4"
      style={{ background: "#FAF6EE", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

        .catalog-serif { font-family: 'Fraunces', Georgia, serif; }
        .catalog-mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

        .receipt {
          position: relative;
          background: #FFFFFF;
          padding-top: 14px;
          padding-bottom: 14px;
        }
        .receipt::before,
        .receipt::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 14px;
          background:
            linear-gradient(135deg, #FAF6EE 50%, transparent 50%),
            linear-gradient(-135deg, #FAF6EE 50%, transparent 50%);
          background-size: 16px 16px;
          background-repeat: repeat-x;
        }
        .receipt::before { top: -1px; background-position: bottom; }
        .receipt::after { bottom: -1px; transform: rotate(180deg); background-position: bottom; }

        .stamp {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          border: 3px solid #4F7A5B;
          color: #4F7A5B;
          transform: rotate(-8deg);
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

      <div
        className="w-full max-w-sm receipt rounded-md text-center"
        style={{ boxShadow: "0 20px 45px -20px rgba(28, 37, 65, 0.35)" }}
      >
        <div className="px-8 pt-4 pb-8">
          <p
            className="catalog-mono text-xs tracking-[0.25em] uppercase mb-6"
            style={{ color: "#6B6455" }}
          >
            Order Receipt
          </p>

          {/* Stamp */}
          <div className="flex justify-center mb-6">
            <div className="stamp catalog-mono">
              <div className="text-center leading-tight">
                <div className="text-[10px] tracking-widest">ORDER</div>
                <div className="text-sm font-bold">CONFIRMED</div>
              </div>
            </div>
          </div>

          <h1
            className="catalog-serif text-2xl font-semibold mb-2"
            style={{ color: "#1C2541" }}
          >
            Order Placed Successfully
          </h1>

          <p className="text-sm mb-8" style={{ color: "#6B6455" }}>
            Your product has been ordered.
          </p>

          <div
            className="border-t border-dashed mb-8"
            style={{ borderColor: "#C9C2AE" }}
          ></div>

          <Link
            to="/home"
            className="cta-btn inline-block px-6 py-3 rounded-lg font-semibold text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderPlaced;