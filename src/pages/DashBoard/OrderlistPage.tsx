import React, { useEffect, useState } from "react";
import { getOrders } from "../../services/woocommerce";
import Layout from "../../components/Layout";
import { ShoppingCart, User, Tag, DollarSign, Calendar, ReceiptIndianRupeeIcon, ReceiptIndianRupee, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../components/Table/DataTable";
import { IconEye } from "../../components/icons/icons";
import TablePaginationActions from "../../components/Table/tablePagination";
import LoadingScreen from "../../components/LoadingScreen";

const statusColors: Record<string, string> = {
    pending: "bg-yellow-200 text-yellow-900",      // warmer yellow
    processing: "bg-sky-200 text-sky-900",         // lighter blue with deep text
    completed: "bg-emerald-200 text-emerald-900",  // fresh green tones
    cancelled: "bg-rose-200 text-rose-900",        // softer red but still distinct
    refunded: "bg-violet-200 text-violet-900",     // gentle purple
    failed: "bg-stone-200 text-stone-900",         // dark grayish with better contrast
};


const PER_PAGE = 10;

const OrderListPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [statusCount, setStatusCount] = useState<Record<string, number>>({});
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const fetchOrders = async (pageNumber = 1) => {
        setLoading(true);
        try {
            const params: any = {
                per_page: PER_PAGE,
                page: pageNumber,
            };

            if (searchTerm.trim()) {
                params.search = searchTerm.trim();
            }

            if (statusFilter) {
                params.status = statusFilter;
            }

            console.log("Fetching orders with params:", params);

            const res = await getOrders(params) as any;
            setOrders(res.data);

            const total = parseInt(res.headers["x-wp-total"]) || 0;
            setTotalCount(total);

            setLoading(false);
        } catch (e) {
            setError("Failed to load orders.");
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchOrders(page);
    }, [page, searchTerm, statusFilter]);


    const fetchAllOrdersStatusCount = async () => {
        try {
            let page = 1;
            let totalPages = 1;
            const counts: Record<string, number> = {};

            while (page <= totalPages) {
                const res = await getOrders({ per_page: 100, page }) as any;  // max per_page is 100
                res.data.forEach((order: any) => {
                    counts[order.status] = (counts[order.status] || 0) + 1;
                });

                if (page === 1) {
                    const total = parseInt(res.headers["x-wp-total"]) || 0;
                    totalPages = Math.ceil(total / 100);
                }

                page++;
            }

            setStatusCount(counts);
        } catch (e) {
            setError("Failed to load order statuses.");
        }
    };


    useEffect(() => {
        fetchAllOrdersStatusCount();
    }, []);

   if (loading) return <LoadingScreen message="Loading Dashboard..." />;

    if (error)
        return (
            <Layout>
                <div className="text-center mt-10 text-red-500 font-semibold">{error}</div>
            </Layout>
        );
    const columns = [

        {
            key: 'serial',
            label: 'S.No',
            align: 'center',
            render: (_row: any, index: number) => (page - 1) * rowsPerPage + index + 1,
        },
        { key: 'orderid', label: 'Order Id', align: 'center', render: (row: any) => row?.id ?? '-', },
        {
            key: 'customer',
            label: 'Customer',
            align: 'center',
            render: (row: any) =>
                row?.billing?.first_name || row?.billing?.last_name
                    ? `${row.billing.first_name} ${row.billing.last_name}`.trim()
                    : row?.billing?.email ?? '-',
        },
        {
            key: 'totalamount',
            label: 'Total Amount',
            align: 'center',
            render: (row: any) => `₹${row.total}`,
        },

        {
            key: 'date',
            label: 'Date',
            align: 'center',
            render: (row: any) => {
                const date = new Date(row.date_created);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                const year = date.getFullYear();

                let hours = date.getHours();
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                const ampm = hours >= 12 ? 'PM' : 'AM';

                hours = hours % 12;
                hours = hours ? hours : 12; // hour '0' should be '12'

                const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
                return `${day}/${month}/${year}, ${formattedTime}`;
            }
        },
        {
            key: 'Status',
            label: 'Status',
            align: 'center',
            render: (row: any) => {
                const status = row.status || "unknown";
                const className = statusColors[status] || "bg-gray-200 text-gray-700";
                return (
                    <span
                        className={`px-2 py-1 rounded-md font-semibold text-sm ${className}`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                );
            }
        },
        { key: 'Mobile', label: 'Mobile', align: 'center', render: (row: any) => row?.billing?.phone ?? '-' },

    ];
    const handleShowDetails = (row: any) => {
        navigate(`/orders/${row.id}`);
    };
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1);
    };
    const actions = [
        {
            label: 'View',
            color: '#2196f3',
            icon: <IconEye size={20} />,
            onClick: (row: any) => handleShowDetails(row)
        },];
    return (
        <Layout>
            <div className=" mx-auto p-6">
                <h2 className="text-3xl font-bold flex items-center mb-6 text-gray-900">
                    <ShoppingCart size={32} className="mr-3 text-indigo-600" />
                    Orders ({totalCount})
                </h2>

                <div className="flex gap-4 mb-6 flex-wrap">
                    {Object.entries(statusCount).map(([status, count]) => (
                        <span
                            key={status}
                            className={`inline-block px-4 py-1 rounded-full font-semibold text-sm ${statusColors[status] || "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}: {count}
                        </span>
                    ))}
                </div>
                <div className="flex flex-wrap gap-4 mb-6 items-center">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search by customer name or email..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="border rounded-md p-2 "
                        />
                        <button
                            onClick={() => {
                                setSearchTerm(searchInput);
                                setPage(1);
                            }}
                            className="bg-indigo-600 text-white px-4 rounded-md hover:bg-indigo-700 transition"
                        >
                            Search
                        </button>
                        {searchInput || searchTerm || statusFilter ? (
                            <button
                                onClick={() => {
                                    setSearchInput("");
                                    setSearchTerm("");
                                    setStatusFilter("");
                                    setPage(1);
                                }}
                                className="bg-gray-300 text-gray-700 px-4 rounded-md hover:bg-gray-400 transition"
                            >
                                Clear
                            </button>
                        ) : null}
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Statuses</option>
                        {Object.entries(statusCount).map(([status]) => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {orders.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">No orders found.</p>
                ) : (
                    <DynamicTable
                        columns={columns}
                        data={orders}
                        loading={loading}
                        actions={actions}
                        page={page}
                        error={error}
                        rowsPerPage={rowsPerPage}
                        totalCount={totalCount}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        ActionsComponent={TablePaginationActions}
                    />
                )}


            </div>
        </Layout>
    );
};

export default OrderListPage;
