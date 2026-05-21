import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";

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
      
        console.log("Workspace ID:", workspaceId);
        console.log("Inviting:", inviteEmail);
      
        const { data, error } = await supabase
          .from("workspace_members")
          .insert([
            {
              workspace_id: workspaceId,
              user_email: inviteEmail.trim().toLowerCase(),
            },
          ])
          .select();
      
        console.log("Insert response:", data);
        console.log("Insert error:", error);
      
        if (error) {
          alert(error.message);
          return;
        }
      
        setInviteEmail("");
        alert("User invited!");
      };

  return (
    <div className="flex-1 min-h-screen bg-slate-100 p-8">
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedWorkspace(null)}
            className="bg-slate-200 px-4 py-2 rounded"
          >
            Back
          </button>

          <h2 className="text-xl font-semibold">{workspaceName}</h2>
        </div>

        <div className="bg-black text-white px-4 py-2 rounded-full text-sm">
          {session.user.email.slice(0, 2).toUpperCase()}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Invite Member</h2>

        <div className="flex gap-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Enter user email"
            className="border p-3 rounded flex-1"
          />

          <button
            onClick={inviteMember}
            className="bg-black text-white px-6 rounded"
          >
            Invite
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 h-[400px]">
        <p className="text-gray-500">
          Existing chat/notes/tasks section remains here for now.
        </p>
      </div>
    </div>
  );
}

export default Workspace;