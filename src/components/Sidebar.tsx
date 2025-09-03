import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  CheckSquare,
  User,
  Stethoscope,
  Store,
  CalendarCheck,
  CreditCard,
  Truck,
  Percent,
  Gift,
  Headset,
  LogOut,
  Menu,
  ChevronLeft,
  Package2,
  PackageCheck,
  Package,
  ShoppingCart,
} from 'lucide-react';
import { SyntheticEvent, useState } from 'react';
import { SnackbarCloseReason } from '@mui/material';
import CustomSnackbar from './CustomSnackbar';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
  { name: 'Orders', path: '/orders', icon: <ShoppingCart size={20} /> },
  { name: 'Approvals', path: '/approvals', icon: <CheckSquare size={20} /> },
  { name: 'Pet Owners', path: '/pet-owners', icon: <User size={20} /> },
  { name: 'Veterinarians', path: '/veterinarians', icon: <Stethoscope size={20} /> },
  { name: 'Vendors', path: '/VendorBenefitsPetsync', icon: <Store size={20} /> },
  { name: 'Appointments', path: '/appointments', icon: <CalendarCheck size={20} /> },
  { name: 'Payments', path: '/payments', icon: <CreditCard size={20} /> },
  { name: 'Delivery Partners', path: '/delivery-partners', icon: <Truck size={20} /> },
  { name: 'Coupons', path: '/coupons', icon: <Percent size={20} /> },
  { name: 'Promotions', path: '/promotions', icon: <Gift size={20} /> },
  { name: 'Products', path: '/products', icon: <Package size={20} /> },
  { name: 'Support', path: '/support', icon: <Headset size={20} /> },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDesktop: boolean;
}

export default function Sidebar({ isOpen, setIsOpen, isDesktop }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info" | "warning",
  });

  const handleCloseSnackbar = (
    _event: Event | SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason !== "clickaway") {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <>
      {/* Overlay for mobile when sidebar open */}
      {!isDesktop && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white shadow-lg flex flex-col transition-transform duration-300 z-50
          ${isDesktop ? 'w-64' : 'w-64'}
          ${isDesktop ? 'translate-x-0' : isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header with logo, title, and toggle button */}
        <div className="flex items-center justify-between h-20 border-b border-gray-800 px-4">
          <div className="flex items-center gap-3">

            <h1 className="text-xl font-semibold tracking-wide select-none">PetSync 360 </h1>
          </div>

        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg border border-gray-700 transition-colors duration-200 ${isActive
                  ? 'bg-gray-800 text-white border-gray-600'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white border-gray-700'
                  }`}
                title={item.name}
              >
                {item.icon}
                {isOpen && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="px-4 pb-6 mt-auto border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-gray-800 p-3 w-full rounded-lg transition"
            title="Logout"
          >
            <LogOut size={20} />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </div>
    </>
  );
}
