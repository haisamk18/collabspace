import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../services/Supabase";

function Dashboard({
  workspaces,
  sharedWorkspaces,
  setSelectedWorkspace,
  session,
  fetchWorkspaces,
}) {
  const [newWorkspace, setNewWorkspace] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const createWorkspace = async () => {
    if (!newWorkspace.trim()) return;

    const { error } = await supabase.from("workspaces").insert([
      {
        name: newWorkspace,
        user_id: session.user.id,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setNewWorkspace("");
    fetchWorkspaces();
  };

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-72 h-screen overflow-y-auto bg-black text-white p-10 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-2"
        >
          Welcome Back
        </motion.h1>

        <p className="text-gray-400 mb-10">
          Manage your team collaboration spaces
        </p>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search workspaces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-[400px] bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none focus:border-cyan-400 backdrop-blur-xl"
          />
        </div>

        {/* Create */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <input
            type="text"
            placeholder="Create new workspace"
            value={newWorkspace}
            onChange={(e) => setNewWorkspace(e.target.value)}
            className="flex-1 bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none focus:border-purple-400 backdrop-blur-xl"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={createWorkspace}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 rounded-2xl font-semibold shadow-lg"
          >
            Create Workspace
          </motion.button>
        </div>

        {/* My Workspaces */}
        <h2 className="text-2xl font-semibold mb-6">
          My Workspaces
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {filteredWorkspaces.map((workspace) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={workspace.id}
              onClick={() => setSelectedWorkspace(workspace)}
              className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 cursor-pointer hover:border-cyan-400 transition"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
                  {workspace.name.charAt(0)}
                </div>

                <span className="text-xs text-gray-400">
                  Active
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {workspace.name}
              </h3>

              <p className="text-gray-400 text-sm">
                Open workspace and collaborate with your team
              </p>
            </motion.div>
          ))}
        </div>

        {/* Shared */}
        <h2 className="text-2xl font-semibold mb-6">
          Shared With Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sharedWorkspaces.map((workspace) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={workspace.id}
              onClick={() => setSelectedWorkspace(workspace)}
              className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 backdrop-blur-xl rounded-3xl p-6 cursor-pointer"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
                  {workspace.name.charAt(0)}
                </div>

                <span className="text-xs text-cyan-300">
                  Shared
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {workspace.name}
              </h3>

              <p className="text-gray-400 text-sm">
                Shared collaboration workspace
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;