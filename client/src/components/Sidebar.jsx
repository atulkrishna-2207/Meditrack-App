import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  CreditCardIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: HomeIcon, path: "/dashboard" },
  { label: "Patients", icon: UserGroupIcon, path: "/patients" },
  { label: "Appointments", icon: CalendarIcon, path: "/appointments" },
  { label: "Doctors", icon: UserIcon, path: "/doctors" },
  { label: "Medical Records", icon: FolderOpenIcon, path: "/medical-records" },
  { label: "Billing", icon: CreditCardIcon, path: "/billing" },
  // { label: "Settings", icon: Cog6ToothIcon, path: "/settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // ✅ Remove user data
    navigate("/login"); // ✅ Redirect to login
  };

  return (
    <aside className="w-64 bg-white shadow-md h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold text-blue-600">MediTrack</div>
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.label}
            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-100 cursor-pointer transition"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="px-6 py-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:bg-red-100 rounded px-3 py-2 transition w-full"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
