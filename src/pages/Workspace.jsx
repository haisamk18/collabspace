import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../services/Supabase";

function Workspace({
  selectedWorkspace,
  activeSection,
  setSelectedWorkspace,
  session,
}) {
  const [inviteEmail, setInviteEmail] = useState("");

  const workspaceName =
    typeof selectedWorkspace === "string"
      ? selectedWorkspace
      : selectedWorkspace.name;

  const workspaceId =
    typeof selectedWorkspace === "object"
      ? selectedWorkspace.id
      : null;

  const inviteMember = async () => {
    if (!inviteEmail.trim()) return;

    const { error } = await supabase
      .from("workspace_members")
      .insert([
        {
          workspace_id: workspaceId,
          user_email: inviteEmail.trim().toLowerCase(),
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setInviteEmail("");
    alert("User invited!");
  };

  return (
    <div className="ml-72 flex-1 h-screen overflow-y-auto bg-black text-white relative">
      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 w-full h-full p-8">
        {/* Topbar */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex items-center justify-between mb-8">
          <div className="flex items-center gap-5">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedWorkspace(null)}
              className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl transition"
            >
              ← Back
            </motion.button>

            <div>
              <h1 className="text-3xl font-bold">
                {workspaceName}
              </h1>

              <p className="text-gray-400 mt-1">
                Collaborative team workspace
              </p>
            </div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-lg font-bold">
            {session.user.email.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Invite Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Invite Team Members
              </h2>

              <p className="text-gray-400">
                Collaborate with your team in real time
              </p>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-cyan-400 min-w-[320px]"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={inviteMember}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 rounded-2xl font-semibold"
              >
                Invite
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl min-h-[600px] p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold">
                {activeSection}
              </h2>

              <p className="text-gray-400 mt-1">
                Manage collaboration in this workspace
              </p>
            </div>

            <div className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/20 text-cyan-300 text-sm">
              Live Workspace
            </div>
          </div>

          {/* Placeholder */}
          <div className="h-[450px] border border-dashed border-white/10 rounded-3xl flex items-center justify-center text-gray-500 text-lg">
            {activeSection} section UI will appear here
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Workspace;