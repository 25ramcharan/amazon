import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL || ""}/api/auth/me`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Profile Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center text-4xl text-white font-bold shadow-lg">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-white mb-8">
          My Account
        </h1>

        {/* Username */}
        <div className="bg-white/10 rounded-xl p-4 mb-4">
          <p className="text-gray-300 text-sm">Username</p>
          <p className="text-xl font-semibold text-cyan-300">
            {user.name || "Loading..."}
          </p>
        </div>

        {/* Email */}
        <div className="bg-white/10 rounded-xl p-4 mb-8">
          <p className="text-gray-300 text-sm">Email</p>
          <p className="text-lg font-medium text-green-300 break-all">
            {user.email || "Loading..."}
          </p>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
}

export default AccountPage;