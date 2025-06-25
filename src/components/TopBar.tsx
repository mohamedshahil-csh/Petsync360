import { useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';

interface TopBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isDesktop: boolean;
}

export default function TopBar({ isSidebarOpen, setIsSidebarOpen, isDesktop }: TopBarProps) {
  const location = useLocation();

  const pathTitleMap: Record<string, string> = {
    dashboard: 'Dashboard',
    approvals: 'Approvals Management',
    'pet-owners': 'Pet Owners Management',
    veterinarians: 'Veterinarians Management',
    vendors: 'Vendors Management',
    appointments: 'Appointments Management',
    payments: 'Payments Management',
    'delivery-partners': 'Delivery Partners Management',
    coupons: 'Coupons Management',
    'coupons/new': 'Add Coupons',
    promotions: 'Promotions Management',
    support: 'Support',
    products: 'Products Management',
    orders: 'Orders Management',
    'add _Charge_codes':'Add Charge Code',
    'pets-details': 'Pet Details',
  };

  const getTitle = () => {
    const path = location.pathname.split('/').slice(1, 3).join('/'); // captures 'coupons/new' as well
    return pathTitleMap[path] || 'Dashboard';
  };

  // Example notification count (you can replace with your actual state)
  const unreadNotifications = 1;

  return (
    <header
      className={`h-16 bg-gray-900 shadow-lg fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 text-white transition-all duration-300`}
      style={{
        marginLeft: isDesktop && isSidebarOpen ? 256 : 0,
      }}
    >

      {!isDesktop && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-800 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
      )}

      <h2 className="text-xl font-semibold tracking-wide select-none">
        {getTitle()}
      </h2>

      <div className="relative">
        <button
          aria-label="Notifications"
          className="p-2 rounded-md hover:bg-gray-800 focus:outline-none"
          onClick={() => alert('Show notifications here!')}
        >
          <Bell size={24} />
        </button>
        {unreadNotifications > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {unreadNotifications}
          </span>
        )}
      </div>
    </header>
  );
}
