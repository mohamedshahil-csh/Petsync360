import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetails } from "../../services/woocommerce";
import Layout from "../../components/Layout";
import {
  Loader2, ArrowLeft, XCircle, User, PackageSearch,
  Truck, Receipt, DollarSign, ClipboardList, MapPin
} from "lucide-react";

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await getOrderDetails(Number(orderId));
        setOrder(res.data);
      } catch {
        setError("Unable to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <Layout>
        <div className="h-72 flex items-center justify-center text-indigo-600">
          <Loader2 className="animate-spin h-8 w-8 mr-3" />
          <span className="text-xl font-semibold">Fetching Order...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center gap-2 p-6 text-red-600">
          <XCircle className="w-6 h-6" />
          <span>{error}</span>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <p className="p-6 text-gray-700">No order found.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6 space-y-8">

        {/* Header with gradient and glass effect */}
        <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white p-6 rounded-3xl shadow-lg flex justify-between items-center backdrop-blur-md">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <PackageSearch className="w-8 h-8" /> Order #{order.number}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 transition shadow"
          >
            <ArrowLeft className="inline-block mr-1" /> Back
          </button>
        </div>

        {/* Customer & Shipping Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard title="Customer Details" icon={<User />} content={[
            `${order.billing.first_name} ${order.billing.last_name}`,
            order.billing.email,
            order.billing.phone
          ]} />
          <InfoCard title="Shipping Address" icon={<Truck />} content={[
            order.shipping.address_1,
            `${order.shipping.city}, ${order.shipping.state} - ${order.shipping.postcode}`,
            order.shipping.country
          ]} />
        </div>

        {/* Billing */}
        <InfoCard title="Billing Address" icon={<MapPin />} content={[
          order.billing.address_1,
          `${order.billing.city}, ${order.billing.state} - ${order.billing.postcode}`,
          order.billing.country
        ]} />

        {/* Customer Note */}
        {order.customer_note && (
          <InfoCard title="Customer Note" icon={<ClipboardList />} content={[order.customer_note]} />
        )}

        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard title="Order Info" icon={<Receipt />} content={[
            `Status: ${order.status}`,
            `Created: ${new Date(order.date_created).toLocaleString()}`,
            `Currency: ${order.currency_symbol} (${order.currency})`,
            `Via: ${order.created_via}`
          ]} />
          <InfoCard title="Payment & Shipping" icon={<DollarSign />} content={[
            `Payment: ${order.payment_method_title || "N/A"}`,
            `Shipping: ₹${order.shipping_total}`,
            `Discount: ₹${order.discount_total}`
          ]} />
        </div>

        {/* Shipping Methods */}
        {order.shipping_lines?.length > 0 && (
          <InfoCard title="Shipping Methods" icon={<Truck />} content={
            order.shipping_lines.map((line: any) => `${line.method_title} — ₹${line.total}`)
          } />
        )}

        {/* Coupons */}
        {order.coupon_lines?.length > 0 && (
          <InfoCard title="Applied Coupons" icon={<ClipboardList />} content={
            order.coupon_lines.map((c: any) => `Code: ${c.code} — ₹${c.discount}`)
          } />
        )}

        {/* Refunds */}
        {order.refunds?.length > 0 && (
          <InfoCard title="Refunds" icon={<XCircle />} content={
            order.refunds.map((r: any) => `Refunded: ₹${r.total}`)
          } />
        )}

        {/* Order Items */}
        <div className="bg-white/60 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl">
          <h2 className="text-xl font-bold p-5 border-b flex items-center gap-2 text-indigo-700">
            <PackageSearch /> Items
          </h2>
          <ul className="divide-y">
            {order.line_items.map((item: any) => (
              <li key={item.id} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-all">
                {item.image?.src ? (
                  <img src={item.image.src} alt={item.name} className="w-14 h-14 object-cover rounded shadow" />
                ) : (
                  <div className="w-14 h-14 bg-gray-200 rounded flex items-center justify-center">N/A</div>
                )}
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-right text-lg font-bold text-indigo-600">₹{item.total}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Total */}
        <div className="text-right mt-4 p-6 bg-indigo-50 rounded-2xl shadow-md border border-indigo-100">
          <p className="text-gray-600">Subtotal: ₹
            {order.line_items.reduce((sum: number, i: any) => sum + Number(i.total), 0).toFixed(2)}
          </p>
          <p className="text-gray-600">Shipping: ₹{order.shipping_total}</p>
          <p className="text-gray-600">Tax: ₹{order.total_tax}</p>
          <p className="text-2xl font-bold text-indigo-700">Total: ₹{order.total}</p>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;

/** 🎨 Reusable InfoCard component */
const InfoCard = ({
  title,
  icon,
  content,
}: {
  title: string;
  icon: React.ReactNode;
  content: string[];
}) => (
  <div className="bg-white/60 backdrop-blur-xl p-5 rounded-2xl border border-gray-200 shadow-md transition-all hover:shadow-lg">
    <h2 className="text-lg font-semibold text-indigo-700 flex items-center gap-2 mb-3">
      {icon} {title}
    </h2>
    <div className="space-y-1 text-gray-700">
      {content.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  </div>
);
