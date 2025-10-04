import { useEffect, useState } from "react";
import axios from "axios";
import Portfolio from "./Portfolio";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("https://cryptonova-backend.onrender.com/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center text-white pt-60">Loading profile...</p>;

  if (!profile) return <p className="text-center text-red-400 py-60">No profile found. Please login.</p>;

  return (
    <div className="pt-20 px-3 md:px-6">
      <div className=" text-white border w-[300px] items-center  rounded-[10px] px-3 py-6.5  bg-gradient-to-br from-gray-900 via-gray-800 to-black flex gap-3
      ">
    <div>
            <img
  src={`https://ui-avatars.com/api/?name=${profile.user.name}&background=0D8ABC&color=fff`}
  alt="avatar"
  className="w-12 h-12 rounded-full"
/>
    </div>
      <div>
        <h1 className="font-semibold text-[1.2rem]">{profile.user.name}</h1>
      <p className="text-gray-400">{profile.user.email}</p>
      </div>
      </div>

      <div>
        <Portfolio />
      </div>
    </div>
  );
};

export default Dashboard;
