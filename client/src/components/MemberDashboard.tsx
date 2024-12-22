import { useNavigate } from "react-router-dom";

const MemberDashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Member Dashboard</h1>
        <button onClick={handleLogout} className="bg-green-800 hover:bg-green-800 text-white py-2 px-4 rounded">
          Log Out
        </button>
      </header>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="bg-green-900 text-white w-1/5 min-h-full flex flex-col p-4">
          <nav className="space-y-4">
            <a href="#" className="block py-2 px-4 rounded hover:bg-green-700">
              Dashboard
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-green-700">
              My Tasks
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-green-700">
              Notifications
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-green-700">
              Resources
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-green-700">
              Support
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-6">
          {/* Personal Progress and Notifications Section */}
          
        </main>
      </div>
    </div>
  );
};

export default MemberDashboard;