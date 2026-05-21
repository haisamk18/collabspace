import { supabase } from "../services/Supabase";

function Sidebar({ setActiveSection }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="w-64 h-screen bg-black text-white p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-8">CollabSpace</h1>

        <ul className="space-y-4">
          <li
            onClick={() => setActiveSection("Chat")}
            className="cursor-pointer hover:text-gray-300"
          >
            Chat
          </li>

          <li
            onClick={() => setActiveSection("Notes")}
            className="cursor-pointer hover:text-gray-300"
          >
            Notes
          </li>

          <li
            onClick={() => setActiveSection("Tasks")}
            className="cursor-pointer hover:text-gray-300"
          >
            Tasks
          </li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="bg-white text-black px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;