import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { AlertCircle, Boxes, CalendarCheck, CheckCircle2, Clock, ExternalLink, FileText, Layers, Loader2, Package, PauseCircle, RotateCw, TrendingUp, XCircle } from "lucide-react";
import apiClient from "../../services/apiClient";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { getCompletedOrdersWithinDateRange, getCoupons, getOrderTotals, getProductTotals } from "../../services/woocommerce";
import { StatCard } from "../../components/StatCard";
import { statCards } from "../../constants/ConstantTest";
import { statusColorMap } from "../../constants/Colors";
import LoadingScreen from "../../components/LoadingScreen";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animateGraphs, setAnimateGraphs] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [appointmentsData, setAppointmentsData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("veterinarians");
  const [approvals, setApprovals] = useState<any[]>([]);
  const [parents, setParents] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [orderTotal, setOrderTotal] = useState<any[]>([]);
  const [productTotal, setproductTotal] = useState<any[]>([]);
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);
  const [activeTabs, setActiveTabs] = useState('user');
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const navigate = useNavigate();
  const today = new Date();
  const fourteenDaysAgo = new Date();
  const [wpToken, setWpToken] = useState<string | null>(null);
  fourteenDaysAgo.setDate(today.getDate() - 3000);

  useEffect(() => {
    const token = localStorage.getItem("wp_token");
    setWpToken(token);
  }, []);

  const todayDate = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter(appt => appt.scheduled_at.startsWith(todayDate));

  const formatDate = (date: Date, endOfDay = false) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const time = endOfDay ? "23:59:59" : "00:00:00";
    return `${year}-${month}-${day}T${time}`;
  };

  const startDate = formatDate(fourteenDaysAgo);
  const endDate = formatDate(today, true);

  useEffect(() => {
    setAnimateGraphs(false);
    const timer = setTimeout(() => setAnimateGraphs(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchDashboardAndAppointments() {
      setLoading(true);
      setError(null);
      try {
        const dashboardRes = await apiClient<any>("v1/admin/dashboard");
        setData(dashboardRes?.data);

        const apptRes = await apiClient(`v1/resource/consults`, { method: "GET" }) as any;
        setAppointments(apptRes.data.consults);

        const fetchParents = await apiClient(`v1/resource/patients`, { method: "GET" }) as any;
        const parents = fetchParents.data.patients;
        setParents(parents);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardAndAppointments();
  }, []);

  useEffect(() => {
    if (!appointments.length) {
      setAppointmentsData([]);
      return;
    }
    const countsByDay: Record<string, number> = {};
    appointments.forEach(({ scheduled_at }) => {
      const dateKey = scheduled_at.split(" ")[0];
      countsByDay[dateKey] = (countsByDay[dateKey] || 0) + 1;
    });
    const chartData = Object.entries(countsByDay)
      .map(([day, count]) => ({
        day,
        appointments: count,
        revenue: count * 100,
      }))
      .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
    setAppointmentsData(chartData);
  }, [appointments]);

  useEffect(() => {
    const fetchApprovals = async () => {
      setError(null);
      try {
        const endpoint = activeTab === "veterinarians"
          ? "v1/resource/provider"
          : "v1/resource/service_provider";

        const response = await apiClient(endpoint, { method: "GET" }) as any;
        const rawData = response.data;

        const normalized = activeTab === "veterinarians"
          ? rawData.providers.map((p: any) => ({ ...p, type: "Veterinarian" }))
          : rawData.service_providers.map((p: any) => ({ ...p, type: "Service Provider" }));

        setApprovals(normalized);
      } catch (err: any) {
        setError(err.message || "Failed to fetch approvals");
      }
    };

    fetchApprovals();
  }, [activeTab]);


  const groupOrdersByDate = (orders: any) => {
    const map = new Map();

    orders.forEach((order: any) => {
      // Extract date part only (YYYY-MM-DD)
      const date = order.date_created.slice(0, 10);
      const total = parseFloat(order.total);

      if (map.has(date)) {
        map.set(date, map.get(date) + total);
      } else {
        map.set(date, total);
      }
    });

    // Convert map to array for chart input
    return Array.from(map.entries())
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([date, revenue]) => ({ date, revenue }));

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch coupons
        const couponsResponse = await getCoupons();
        setCoupons(couponsResponse.data);

        // Fetch order total
        const orderTotalResponse = await getOrderTotals();
        setOrderTotal(orderTotalResponse.data);

        const orderProductsResponse = await getProductTotals();
        setproductTotal(orderProductsResponse.data);

        const completedOrdersResponse = await getCompletedOrdersWithinDateRange(
          startDate,
          endDate
        );
        setCompletedOrders(completedOrdersResponse.data);
        const groupedData = groupOrdersByDate(completedOrdersResponse.data);
        setRevenueData(groupedData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const getOrderTotalCards = (data: any[]) => {
    return data.map((item) => ({
      title: item.name,
      value: item.total,
      icon: getIconForStatus(item.slug),
      gradient: getGradientForStatus(item.slug)
    }));
  };

  const getGradientForStatus = (slug: any) => {
    switch (slug) {
      case "pending":
        return "from-yellow-400 to-yellow-600";
      case "processing":
        return "from-blue-400 to-blue-600";
      case "on-hold":
        return "from-orange-400 to-orange-600";
      case "completed":
        return "from-green-400 to-green-600";
      case "cancelled":
        return "from-red-400 to-red-600";
      case "refunded":
        return "from-purple-400 to-purple-600";
      case "failed":
        return "from-red-700 to-red-900";
      case "checkout-draft":
        return "from-gray-400 to-gray-600";
      case "external":
        return "from-indigo-400 to-indigo-600";
      case "grouped":
        return "from-teal-400 to-teal-600";
      case "simple":
        return "from-cyan-400 to-cyan-600";
      case "variable":
        return "from-pink-400 to-pink-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };


  const getIconForStatus = (slug: any) => {
    switch (slug) {
      case "pending":
        return <Clock className="text-white" />;
      case "processing":
        return <Loader2 className="text-white animate-spin" />;
      case "on-hold":
        return <PauseCircle className="text-white" />;
      case "completed":
        return <CheckCircle2 className="text-white" />;
      case "cancelled":
        return <XCircle className="text-white" />;
      case "refunded":
        return <RotateCw className="text-white" />;
      case "failed":
        return <AlertCircle className="text-white" />;
      case "checkout-draft":
        return <FileText className="text-white" />;
      case "external":
        return <ExternalLink className="text-white" />;
      case "grouped":
        return <Layers className="text-white" />;
      case "simple":
        return <Package className="text-white" />;
      case "variable":
        return <Boxes className="text-white" />;
      default:
        return <FileText className="text-white" />;
    }
  };

  if (loading) return <LoadingScreen message="Loading orders..." />;

  if (error) return <div>Error: {error}</div>;


  console.log('parents', parents);
  const cards = getOrderTotalCards(productTotal);
  const cardCount = cards.length;

  const gridColsClass =
    cardCount >= 5
      ? 'lg:grid-cols-5'
      : 'lg:grid-cols-4';
  return (
    <Layout>
      <main className="p-2 sm:p-6 lg:p-6 min-h-screen rounded-lg shadow-sm mx-auto max-w-7xl">

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTabs('user')}
            className={`px-4 py-2 rounded font-medium transition ${activeTabs === 'user'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            User
          </button>

          <button
            onClick={() => setActiveTabs('order')}
            className={`px-4 py-2 rounded font-medium transition ${activeTabs === 'order'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            Order
          </button>

          <button
            onClick={() => setActiveTabs('product')}
            className={`px-4 py-2 rounded font-medium transition ${activeTabs === 'product'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            Products
          </button>
        </div>
        {activeTabs === 'user' && (
          <>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-4 border-blue-500 pb-2">
              User Statistics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
              {statCards(data).map((card, index) => (
                <StatCard
                  key={index}
                  title={card.title}
                  value={card.value || 0}
                  icon={card.icon}
                  bgGradient={card.gradient}
                />
              ))}
            </div>
          </>
        )}

        {activeTabs === 'order' && (
          <>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-4 border-green-500 pb-2">
              Orders
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6  mb-10">
              {getOrderTotalCards(orderTotal).map((card, index) => (
                <StatCard
                  key={index}
                  title={card.title}
                  value={card.value || 0}
                  icon={card.icon}
                  bgGradient={card.gradient}
                />
              ))}
            </div>
          </>
        )}

        {activeTabs === 'product' && (
          <>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-4 border-red-500 pb-2">
              Products

            </h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${gridColsClass} gap-6  mb-10`}>
              {getOrderTotalCards(productTotal).map((card, index) => (
                <StatCard
                  key={index}
                  title={card.title}
                  value={card.value || 0}
                  icon={card.icon}
                  bgGradient={card.gradient}
                />
              ))}
            </div>
          </>
        )}

        <div className="bg-white rounded-xl shadow-md p-4 mt-6">
          <div className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2">
            <h2 className="text-lg font-semibold text-black">Pending Approvals</h2>
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                navigate("/approvals");
              }}
              className="text-blue-600 text-sm font-medium"
            >
              View All
            </button>

          </div>

          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab("veterinarians")}
              className={`py-2 px-4 text-sm font-medium ${activeTab === "veterinarians" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                }`}
            >
              Veterinarians
            </button>
            <button
              onClick={() => setActiveTab("service_providers")}
              className={`py-2 px-4 text-sm font-medium ${activeTab === "service_providers" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                }`}
            >
              Service Providers
            </button>
          </div>

          {/* Table */}
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="py-2">Name</th>
                <th>City</th>
                <th>Speciality</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const filteredApprovals = approvals
                  .filter((item: any) => item.user?.is_active === 0)
                  .slice(0, 5);

                if (filteredApprovals.length === 0) {
                  return (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500 flex flex-col items-center  space-y-2">
                        <AlertCircle size={40} />
                        <span>No approval found</span>
                      </td>
                    </tr>
                  );
                }

                return filteredApprovals.map((item: any, index: number) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 text-gray-900 font-medium">
                      {item.user?.first_name} {item.user?.last_name}
                    </td>
                    <td className="py-2 text-gray-700">{item.user?.address?.city || "N/A"}</td>
                    <td className="py-2 text-gray-700">
                      {item.provider_speciality?.length > 0
                        ? item.provider_speciality.map((spec: { id: number; speciality: string }, index: number) => (
                          <span key={spec.id}>
                            {spec.speciality}
                            {index < item.provider_speciality.length - 1 && ', '}
                          </span>
                        ))
                        : "N/A"}
                    </td>

                    <td className="py-2 text-gray-700">{item.user?.email || "N/A"}</td>
                    <td className="py-2 text-gray-700">{item.user?.mobile || "N/A"}</td>
                    <td className="py-2 text-gray-700 flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full animate-pulse ${item.user?.is_active === 0 ? "bg-red-500" : "bg-green-500"
                          }`}
                      ></span>
                      <span className="animate-fade-in">{item.user?.is_active === 0 ? "Inactive" : "Active"}</span>
                    </td>

                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          {animateGraphs && (
            <>
              <div className="relative bg-white dark:bg-gray-900/70 rounded-xl shadow-md backdrop-blur-md border border-blue-200 dark:border-blue-800 p-4 hover:shadow-lg transition duration-300 ease-in-out transform cursor-pointer">
                <div className="flex justify-between items-center mb-4 border-b border-blue-300 dark:border-blue-700 pb-2">
                  <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-300 flex items-center space-x-2">
                    <CalendarCheck className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                    <span>Appointments</span>
                  </h2>
                  <a
                    href="#"
                    className="text-xs font-medium text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      navigate("/appointments");
                    }}
                  >
                    View All
                  </a>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={appointmentsData}>
                    <defs>
                      <linearGradient id="blueGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#cbd5e1" strokeDasharray="5 5" />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#334155", fontSize: 10, fontWeight: "600" }}
                      axisLine={{ stroke: "#94a3b8" }}
                    />
                    <YAxis
                      tick={{ fill: "#334155", fontSize: 10, fontWeight: "600" }}
                      axisLine={{ stroke: "#94a3b8" }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#f1f5f9" }}
                      itemStyle={{ color: "#2563eb" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="none"
                      fill="url(#blueGreen)"
                      isAnimationActive={true}
                      animationDuration={1200}
                    />
                    <Line
                      type="monotone"
                      dataKey="appointments"
                      stroke="#2563eb"
                      strokeWidth={2}
                      isAnimationActive={true}
                      animationDuration={1200}
                      dot={{ r: 4, fill: "#2563eb" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="relative bg-white dark:bg-gray-900/70 rounded-xl shadow-md backdrop-blur-md border border-green-200 dark:border-green-800 p-4 hover:shadow-lg transition duration-300 ease-in-out transform cursor-pointer">
                <div className="flex justify-between items-center mb-4 border-b border-green-300 dark:border-green-700 pb-2">
                  <h2 className="text-lg font-semibold text-green-900 dark:text-green-300 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-500 dark:text-green-400" />
                    <span>Revenue Trend</span>
                  </h2>
                  <a href="#" onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    navigate("/payments");
                  }} className="text-xs font-medium text-green-600 hover:text-green-800 dark:hover:text-green-400 transition">View All</a>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={revenueData}>
                    <CartesianGrid stroke="#d1fae5" strokeDasharray="5 5" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#065f46", fontSize: 10, fontWeight: "600" }}
                      axisLine={{ stroke: "#a7f3d0" }}
                      tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    />
                    <YAxis
                      tick={{ fill: "#065f46", fontSize: 10, fontWeight: "600" }}
                      axisLine={{ stroke: "#a7f3d0" }}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#dcfce7" }}
                      itemStyle={{ color: "#059669" }}
                      formatter={(value) => `₹${Number(value).toFixed(2)}`}
                      labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="none"
                      fill="url(#colorGreen)"
                      isAnimationActive={true}
                      animationDuration={1200}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#059669"
                      strokeWidth={2}
                      isAnimationActive={true}
                      animationDuration={1200}
                      dot={{ r: 4, fill: "#10b981", stroke: "#047857", strokeWidth: 1 }}
                      activeDot={{ r: 6, fill: "#047857" }}
                    />
                    <defs>
                      <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          {/* Today's Appointments Table */}
          <div className="bg-white rounded-xl shadow-md p-4 mt-6">
            <div className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2">
              <h2 className="text-lg font-semibold text-black">Today's Appointments</h2>
              <button className="text-blue-600 text-sm font-medium" onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                navigate("/appointments");
              }}>View All</button>
            </div>


            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-2">Pet Name</th>
                  <th>Owner</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.slice(0, 5).map((item: any, index: number) => {
                  const status = item.consult_status?.name || "Unknown";
                  const badgeClasses = statusColorMap[status] || "bg-gray-100 text-gray-700";
                  return (
                    <tr key={index} className="border-t">
                      <td className="py-2 text-blue-600">{item.reason}</td>
                      <td className="py-2 text-gray-700">
                        {item.participants && item.participants.length > 1
                          ? item.participants[1].participant_info.name
                          : "Unknown"}
                      </td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClasses}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {todayAppointments.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-6">
                      <div className="flex flex-col items-center justify-center text-center text-gray-500 bg-gray-50 p-4 rounded-md">
                        <svg
                          className="w-10 h-10 mb-2 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3M16 7V3M3 11h18M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-sm font-medium">No appointments for today</p>
                        <p className="text-xs text-gray-400">Check back later or refresh the page.</p>
                      </div>
                    </td>
                  </tr>
                )}

              </tbody>

            </table>
          </div>



        </div>


        <div className="gap-6 mt-5">
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-black">Active Coupons</h2>
              <button className="text-blue-600 text-sm font-medium">View All</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-2">Code</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Discount Type</th>
                  <th>Valid Till</th>
                  <th>Usage Count</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((item, index) => {
                  console.log('item', item)
                  return (
                    <tr key={index} className="border-t">
                      <td className="py-2 text-blue-600 truncate max-w-[100px]">{item.code}</td>
                      <td className="py-2 text-gray-700">
                        {item.discount_type === 'percent' ? `${item.amount}%` : `₹ ${item.amount}`}
                      </td>
                      <td className="py-2 text-gray-700 capitalize">{item.status}</td>
                      <td className="py-2 text-gray-700 capitalize">{item.discount_type}</td>
                      <td className="py-2 text-gray-700">
                        {(new Date(item.date_expires)).toLocaleDateString('en-GB')}
                      </td>
                      <td className="py-2 text-gray-700">{item.usage_count}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="gap-6 mt-5">
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-black">Pet Owners</h2>
              <button className="text-blue-600 text-sm font-medium" onClick={() => navigate("/pet_owners")}>View All</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-2">Name</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Mobile</th>
                  <th>Email</th>

                </tr>
              </thead>
              <tbody>
                {parents.slice(0, 5).map((item, index) => {
                  console.log('item', item)
                  const user = item?.user;
                  const status = user?.is_active === 1 ? "Active" :
                    user?.is_active === 2 ? "Deactivated" :
                      "Inactive";

                  return (
                    <tr key={index} className="border-t">
                      <td className="py-2 text-blue-600 truncate max-w-[100px]">{user.first_name} {user?.last_name}</td>
                      <td className="py-2 text-gray-700">
                        {user?.address?.city || "-"}
                      </td>
                      <td className="py-2 text-gray-700 capitalize">{status}</td>
                      <td className="py-2 text-gray-700 capitalize">{user?.mobile}</td>
                      <td className="py-2 text-gray-700">
                        {user?.email || "-"}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* </div> */}
      </main>
    </Layout>
  );
}


function getIconForStatus(slug: any): any {
  throw new Error("Function not implemented.");
}

