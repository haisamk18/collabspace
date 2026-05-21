import { useState } from "react";
import { supabase } from "../services/supabase";

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
    <div className="flex-1 min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Your Workspaces</h1>

      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search workspaces..."
          className="border p-3 rounded w-80 bg-white"
        />
      </div>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={newWorkspace}
          onChange={(e) => setNewWorkspace(e.target.value)}
          placeholder="Create new workspace"
          className="border p-3 rounded w-80 bg-white"
        />

        <button
          onClick={createWorkspace}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Add
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">My Workspaces</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {filteredWorkspaces.map((workspace) => (
          <div
            key={workspace.id}
            onClick={() => setSelectedWorkspace(workspace)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{workspace.name}</h2>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Shared With Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sharedWorkspaces.map((workspace) => (
          <div
            key={workspace.id}
            onClick={() => setSelectedWorkspace(workspace)}
            className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{workspace.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;