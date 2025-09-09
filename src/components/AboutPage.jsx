import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 text-white bg-gradient-to-b from-gray-900 to-black min-h-screen"
    >
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <p className="text-lg">
        This prototype was built for internal hackathons to recognize cattle and buffalo breeds.  
        It helps workers quickly confirm animal breeds and capture owner details for records.
      </p>
    </motion.div>
  );
}
