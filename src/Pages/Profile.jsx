import React, { useEffect, useRef, useState } from "react";
import avatar from "../assets/avatar.jpg"; // Replace with user avatar
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ActionScreen from "../components/ActionScreen";

const Profile = () => {

    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const firstRender = useRef(true);

    const [isEditing, setIsEditing] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    });
    useEffect(() => {
        setTimeout(() => {
            fetchUserDetails();
        }, 1500);
        checkVerification();
    }, [])

    const checkVerification = async () => {
        try {
            const res = await axios.get(`${backendUrl}/auth/checkverification`, { withCredentials: true });
            setIsVerified(res.data.status);
        } catch (error) {
            console.log("an error occure while checking verification details ", error);

        }
    }

    // Fetch recent orders from backend
    const RecentOrders = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/fetchrecentorders`, { withCredentials: true });
            setOrders(res.data.recentOrders);
        } catch (error) {
            console.log(error);
        }
    };


    const fetchUserDetails = async () => {
        try {
            const res = await axios.get(`${backendUrl}/auth/fetchuser`, { withCredentials: true });
            setUser({
                name: res.data.user.name,
                email: res.data.user.email,
                phone: "",
                street: res.data.user.address[0]?.street,
                city: res.data.user.address[0]?.city,
                state: res.data.user.address[0]?.state,
                zip: res.data.user.address[0]?.zip,
                country: res.data.user.address[0]?.country,

            });
            console.log(res.data);
        } catch (error) {
            console.log("an error occure while fetching user details ", error);

        }
    }
    const [showScreen, setShowScreen] = useState(false);


    useEffect(() => {

        RecentOrders();
    }, [])

    const handleEditing = async (e) => {
        e.preventDefault();

        if (isEditing) {
            // User clicked "Save"
            try {
                await axios.patch(`${backendUrl}/api/updateAddress`, {
                    street: user.street,
                    city: user.city,
                    state: user.state,
                    zip: user.zip,
                    country: user.country,
                }, { withCredentials: true });

                console.log("🟢 Address updated successfully");
                setShowScreen(true); // Show success screen after save
                setIsEditing(false); // Exit edit mode

            } catch (error) {
                console.error("❌ Failed to update address:", error);
            }
        } else {
            // User clicked "Edit"
            setIsEditing(true);
        }
    };




    const sendEmailOtp = async () => {

        try {

            const res = await axios.post(`${backendUrl}/auth/sendemailotp`, {}, { withCredentials: true });
            console.log(res.data);
            navigate('/verify?query=email');

        } catch (error) {
            console.log("an error occure while fetching user details ", error);

        }

    }

    const logoutHandler = async () => {
        try {
            await axios.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true });
            navigate("/");

            window.location.reload();
        } catch (error) {
            console.log("an error occure while logging out ", error);

        }

    }

    return (
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 pt-10 max-w-5xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">My Profile</h1>

            {showScreen && (
                <ActionScreen
                    subheading="Address successfully saved"
                    showScreen={showScreen}
                    setShowScreen={setShowScreen}
                />
            )}

            {/* Profile Info */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left: Avatar & Basic Info */}
                <div className="flex flex-col items-center md:items-start md:w-1/3 bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>

                    <button
                        onClick={() => logoutHandler()}
                        className="mt-6 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition cursor-pointer"
                    >
                        Logout
                    </button>
                </div>

                {/* Right: Account Details & Orders */}
                <div className="md:w-2/3 flex flex-col gap-6">
                    {/* Account & Address Details */}
                    <div className="space-y-6">
                        {/* Account Details Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Account Details</h3>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={user.name}
                                        readOnly
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-gray-700 font-medium mb-1">Email</label>
                                    <div className="flex flex-col  gap-2 w-full">
                                        <input
                                            type="email"
                                            value={user.email}
                                            readOnly
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
                                        />
                                        {!isVerified && (
                                            <button
                                                onClick={() => sendEmailOtp()}
                                                className="w-full cursor-pointer sm:w-auto bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
                                            >
                                                Verify
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Details Card */}
                        <form
                            onSubmit={(e) => handleEditing(e)}
                            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
                        >
                            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Address Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-medium mb-1">Street / House No.</label>
                                    <input
                                        required
                                        placeholder="123 Model Town"
                                        onChange={(e) => setUser({ ...user, street: e.target.value })}
                                        value={user.street || ""}
                                        readOnly={!isEditing}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-medium mb-1">City</label>
                                    <input
                                        placeholder="Chandigarh"
                                        type="text"
                                        required
                                        onChange={(e) => setUser({ ...user, city: e.target.value })}
                                        value={user.city || ""}
                                        readOnly={!isEditing}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-medium mb-1">State</label>
                                    <input
                                        type="text"
                                        placeholder="Punjab"
                                        required
                                        onChange={(e) => setUser({ ...user, state: e.target.value })}
                                        value={user.state || ""}
                                        readOnly={!isEditing}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-medium mb-1">ZIP / PIN Code</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="160001"
                                        value={user.zip || ""}
                                        onChange={(e) => setUser({ ...user, zip: e.target.value })}
                                        readOnly={!isEditing}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
                                    />
                                </div>

                                <div className="flex flex-col md:col-span-2">
                                    <label className="text-gray-700 font-medium mb-1">Country</label>
                                    <input
                                        placeholder="India"
                                        type="text"
                                        required
                                        value={user.country || ""}
                                        onChange={(e) => setUser({ ...user, country: e.target.value })}
                                        readOnly={!isEditing}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="mt-6 w-full bg-black text-white py-2 cursor-pointer rounded-xl hover:bg-gray-800 transition"
                            >
                                {isEditing ? "Save" : "Edit"}
                            </button>

                        </form>
                    </div>

                    {/* Order History */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 max-h-[32rem] overflow-y-auto">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-900">Recent Orders</h3>
                        <div className="flex flex-col gap-4">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow bg-gray-50 gap-2"
                                >
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                                        <span className="text-gray-900 font-medium text-base md:text-lg">{order.name}</span>
                                        <span className="text-gray-500 text-sm">{order.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Profile;
