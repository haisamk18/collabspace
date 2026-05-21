import { motion } from "framer-motion";
import { supabase } from "../services/Supabase";

function Sidebar({ setActiveSection }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="w-72 h-screen fixed left-0 top-0 bg-[#050816] border-r border-white/10 text-white p-8 flex flex-col justify-between z-50">
      <div>
        <h1 className="text-3xl font-bold mb-14 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          CollabSpace
        </h1>

        <div className="space-y-4">
          {["Chat", "Notes", "Tasks"].map((item) => (
            <motion.div
              whileHover={{ x: 5 }}
              key={item}
              onClick={() => setActiveSection(item)}
              className="bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-2xl cursor-pointer transition"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleLogout}
        className="bg-gradient-to-r from-red-500 to-pink-500 py-4 rounded-2xl font-semibold"
      >
        Logout
      </motion.button>
    </div>
  );
}

export default Sidebar;