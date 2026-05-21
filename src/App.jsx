import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Workspace from "./pages/Workspace";
import Sidebar from "./components/Sidebar";
import { supabase } from "./services/supabase";

function App() {
  const [session, setSession] = useState(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [activeSection, setActiveSection] = useState("Chat");
  const [workspaces, setWorkspaces] = useState([]);
  const [sharedWorkspaces, setSharedWorkspaces] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchWorkspaces();
      fetchSharedWorkspaces();
    }
  }, [session]);

  const fetchWorkspaces = async () => {
    const { data } = await supabase
      .from("workspaces")
      .select("*")
      .eq("user_id", session.user.id);

    if (data) setWorkspaces(data);
  };

  const fetchSharedWorkspaces = async () => {
    const email = session.user.email.trim().toLowerCase();
  
    console.log("Logged in email:", email);
  
    const { data: memberData, error: memberError } = await supabase
      .from("workspace_members")
      .select("*");
  
    console.log("All member rows:", memberData);
    console.log("Member fetch error:", memberError);
  
    if (memberError || !memberData) return;
  
    const matchedRows = memberData.filter(
      (item) =>
        item.user_email &&
        item.user_email.trim().toLowerCase() === email
    );
  
    console.log("Matched rows:", matchedRows);
  
    if (matchedRows.length === 0) {
      setSharedWorkspaces([]);
      return;
    }
  
    const workspaceIds = matchedRows.map((item) => item.workspace_id);
  
    console.log("Workspace IDs:", workspaceIds);
  
    const { data: workspaceData, error: workspaceError } = await supabase
      .from("workspaces")
      .select("*")
      .in("id", workspaceIds);
  
    console.log("Workspace data:", workspaceData);
    console.log("Workspace error:", workspaceError);
  
    if (workspaceData) {
      setSharedWorkspaces(workspaceData);
    }
  };

  if (!session) {
    return <Login />;
  }

  return (
    <div className="flex">
      <Sidebar setActiveSection={setActiveSection} />

      {selectedWorkspace ? (
        <Workspace
          selectedWorkspace={selectedWorkspace}
          activeSection={activeSection}
          setSelectedWorkspace={setSelectedWorkspace}
          session={session}
        />
      ) : (
        <Dashboard
          workspaces={workspaces}
          sharedWorkspaces={sharedWorkspaces}
          setSelectedWorkspace={setSelectedWorkspace}
          session={session}
          fetchWorkspaces={fetchWorkspaces}
        />
      )}
    </div>
  );
}

export default App;