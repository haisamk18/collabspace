import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../services/Supabase";

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          alert(error.message);
        } else {
          alert("Account created successfully");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          alert("Invalid credentials");
        }
      }
    } catch (err) {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-[400px] backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold text-white mb-2 text-center"
        >
          CollabSpace
        </motion.h1>

        <p className="text-gray-300 text-center mb-8">
          Team collaboration reimagined
        </p>

        <div className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm block mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-xl outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm block mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-xl outline-none focus:border-purple-400"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleAuth}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 rounded-xl font-semibold shadow-lg"
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create Account"
              : "Login"}
          </motion.button>

          <p className="text-center text-gray-400">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}

            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-cyan-400 ml-2 cursor-pointer"
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;