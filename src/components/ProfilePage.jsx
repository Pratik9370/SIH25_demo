import React from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 text-white bg-gradient-to-b from-gray-900 to-black min-h-screen"
    >
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md">
        <p className="text-lg"><span className="font-semibold">Worker ID:</span> 12345</p>
        <p className="text-lg"><span className="font-semibold">Name:</span> Demo User</p>
      </div>
    </motion.div>
  );
}
