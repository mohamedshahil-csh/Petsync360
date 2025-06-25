import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/MainPage/Parent';
import Dashboard from '../pages/DashBoard/Dashboardpage';
import Users from '../pages/DashBoard/UserPage';
import ApprovalPage from '../pages/DashBoard/Approvalpage';
import ApprovalDetailsPage from '../pages/DashBoard/ApprovalDetailpage';
import PetOwners from '../pages/Petowner/PetOwner';
import PetOwnerDetailspage from '../pages/Petowner/PetOwnerDetailspage';
import VeterinarianList from '../pages/DashBoard/vetenerian';
import AppointmentManager from '../pages/DashBoard/Appointmentmanager';
import PaymentDashboard from '../pages/DashBoard/Payments';
import SupportDashboard from '../pages/DashBoard/Support';
import CouponPage from '../pages/DashBoard/CouponPage';
import PromotionsPage from '../pages/DashBoard/Promotions';
import DeliveryDashboard from '../pages/DashBoard/DeliveryPartners';
import VendorsPage from '../pages/DashBoard/VendorsPage';
import ProductPage from '../pages/DashBoard/Products/Products';
import OrderListPage from '../pages/DashBoard/OrderlistPage';
import OrderDetailsPage from '../pages/DashBoard/OrderDetails';
import CouponForm from '../Forms/CoupunsForm';
import CouponDetailsPage from '../pages/DashBoard/CoupoundetailsPage';
import ProductView from '../pages/DashBoard/Products/ProductsView';
import ProductForm from '../Forms/ProductForm';
import ChargeCodeForm from '../Forms/ChargeCodeForms';
import PetsList from '../pages/Petowner/Pets';
import AddAppointment from '../pages/Appointment/AddAppointment';
import WhyPetSync from '../pages/MainPage/WhypetSync';
import About from '../pages/MainPage/About';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Set Home as the main page */}
      <Route path="/AddAppointment" element={<AddAppointment />} />
      <Route path="/about" element={<About />} />
      {/* <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/orders" element={<OrderListPage />} />
      <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
      <Route path="/approvals" element={<ApprovalPage />} />
      <Route path="/approvals/:type/:id" element={<ApprovalDetailsPage />} />
      <Route path="/pet-owners" element={<PetOwners />} />
      <Route path="/pet-owners/:id" element={<PetOwnerDetailspage />} />
      <Route path="/pets-details/:id" element={<PetsList />} />
      <Route path="/veterinarians" element={<VeterinarianList />} />
      <Route path="/appointments" element={<AppointmentManager />} />
      <Route path="/appointments/details/:id" element={<ApprovalDetailsPage />} />
      <Route path="/coupons" element={<CouponPage />} />
      <Route path="/coupons/new" element={<CouponForm />} />
      <Route path="/coupons/:couponId" element={<CouponDetailsPage />} />
      <Route path="/promotions" element={<PromotionsPage />} />
      <Route path="/payments" element={<PaymentDashboard />} />
      <Route path="/delivery-partners" element={<DeliveryDashboard />} />
      <Route path="/vendors" element={<VendorsPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/editproducts/:productId" element={<ProductForm />} />
      <Route path="/products/view/:productId" element={<ProductView />} />
      <Route path="/support" element={<SupportDashboard />} /> */}
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/Login" />} />

    </Routes>
  );
}