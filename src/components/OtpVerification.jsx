import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [heading, setHeading] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    setHeading(query);
  }, [query]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // digits only
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input automatically
    if (value && index < 5) {
      e.target.nextSibling?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      setMessage("");

      const otpString = otp.join("");
      const res = await axios.post(
        `${backendUrl}/auth/verifyemailotp`,
        { otp: otpString },
        { withCredentials: true }
      );

      setMessage(res.data.message);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 w-full max-w-md text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
          {heading?.toUpperCase()} Verification
        </h2>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Enter the 6-digit OTP sent to your {heading?.toUpperCase()}.
        </p>

        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              className="w-10 sm:w-12 h-10 sm:h-12 border border-gray-300 rounded-md text-center text-lg sm:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium py-2 sm:py-3 rounded-md transition-colors text-sm sm:text-base"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {message && (
          <p
            className={`mt-4 text-sm sm:text-base font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
