import React, { useState } from "react";
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
import Layout from "../../components/Layout";

const PromotionsPage = () => {
    const [statusFilter, setStatusFilter] = useState("All");
    const [previewMessage, setPreviewMessage] = useState("");

    const campaignStats = [
        { week: "Week 1", delivered: 200, opened: 150, clicked: 80 },
        { week: "Week 2", delivered: 400, opened: 320, clicked: 180 },
        { week: "Week 3", delivered: 300, opened: 250, clicked: 150 },
        { week: "Week 4", delivered: 500, opened: 400, clicked: 260 },
    ];

    const statuses = ["All", "Draft", "Scheduled", "Active", "Completed"];

    const reviews = [
        { id: 1, user: "John", comment: "Great promo!", flagged: false },
        { id: 2, user: "Alice", comment: "Didn’t work", flagged: true },
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-white text-gray-900 p-6 space-y-10">
                {/* Coupon Form */}
                <div className="bg-gray-200 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Coupon Management</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Coupon Code" className="bg-gray-100 p-2 rounded" />
                        <select className="bg-gray-100 p-2 rounded">
                            <option>Discount Type</option>
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed Amount</option>
                        </select>
                        <input placeholder="Minimum Order Value" className="bg-gray-100 p-2 rounded" />
                        <input type="date" className="bg-gray-100 p-2 rounded" />
                        <input placeholder="Usage Limit" className="bg-gray-100 p-2 rounded" />
                        <button className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 p-2 rounded text-white">
                            Create Coupon
                        </button>
                    </div>
                </div>

                {/* Promo Campaign */}
                <div className="bg-gray-200 p-6 rounded-lg shadow space-y-4">
                    <h2 className="text-xl font-bold">Promo Campaigns</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select className="bg-gray-100 p-2 rounded">
                            <option>Email</option>
                            <option>SMS</option>
                            <option>In-App</option>
                        </select>
                        <input placeholder="Target Audience" className="bg-gray-100 p-2 rounded" />
                        <input type="datetime-local" className="bg-gray-100 p-2 rounded" />
                    </div>
                    <textarea
                        placeholder="Write your promo message here..."
                        className="bg-gray-100 w-full p-2 rounded"
                        rows={4}
                        onChange={(e) => setPreviewMessage(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">Send</button>
                        <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white">Save Draft</button>
                    </div>
                </div>


                {previewMessage && (
                    <div className="bg-gray-200 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Message Preview</h3>
                        <div className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">{previewMessage}</div>
                    </div>
                )}

                <div className="bg-gray-200 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Campaign Analytics</h2>
                    <div className="w-full h-64">
                        <ResponsiveContainer>
                            <LineChart data={campaignStats}>
                                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" /> {/* gray-300 */}
                                <XAxis dataKey="week" stroke="#374151" /> {/* gray-700 */}
                                <YAxis stroke="#374151" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#ffffff", borderColor: "#d1d5db", color: "#111827" }} // white bg, gray border, black text
                                    labelStyle={{ color: "#111827" }} // gray-900
                                />
                                <Line
                                    type="monotone"
                                    dataKey="delivered"
                                    stroke="#3b82f6" // blue-500
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="opened"
                                    stroke="#10b981" // green-500
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="clicked"
                                    stroke="#f59e0b" // amber-500
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>


                {/* Status Filters */}
                <div className="bg-gray-200 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Campaign Status</h2>
                    <div className="flex gap-3 flex-wrap">
                        {statuses.map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={`px-3 py-1 rounded-full border text-white ${statusFilter === s
                                    ? "bg-blue-600 border-blue-400"
                                    : "bg-gray-700 border-gray-600"
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-400">
                        Filtering by: <strong>{statusFilter}</strong>
                    </p>
                </div>

                {/* Reviews */}
                <div className="bg-gray-200 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Ratings & Reviews</h2>
                    <table className="w-full table-auto text-left text-sm">
                        <thead className="text-gray-900 border-b border-gray-300">
                            <tr>
                                <th className="py-2">User</th>
                                <th>Comment</th>
                                <th>Flag</th>
                                <th>Reply</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review.id} className="border-b border-gray-300">
                                    <td className="py-2">{review.user}</td>
                                    <td>{review.comment}</td>
                                    <td>
                                        <button className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs text-white">
                                            {review.flagged ? "Flagged" : "Flag"}
                                        </button>
                                    </td>
                                    <td>
                                        <input
                                            placeholder="Reply..."
                                            className="bg-gray-100 p-1 rounded w-full"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default PromotionsPage;
