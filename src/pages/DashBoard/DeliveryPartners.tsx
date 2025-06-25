import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
export default function DeliveryDashboard() {
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
    const [path, setPath] = useState<[number, number][]>([]);
    // Dummy data examples
    const deliveryPartners = [
        { id: 1, name: "John Doe", coverage: "Zone A", status: "Active" },
        { id: 2, name: "Jane Smith", coverage: "Zone B", status: "Inactive" },
    ];

    const orderStatuses = [
        { id: 101, orderId: "ORD1234", status: "Dispatched" },
        { id: 102, orderId: "ORD1235", status: "Cancelled" },
        { id: 103, orderId: "ORD1236", status: "In Transit" },
    ];

    type StatusKey = "dispatched" | "cancelled" | "in transit";
    const statusColors: Record<StatusKey, string> = {
        dispatched: "bg-green-200 text-green-800",
        cancelled: "bg-red-200 text-red-800",
        "in transit": "bg-yellow-200 text-yellow-800",
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => {
                alert("Unable to retrieve your location");
            }
        );
    }, []);

    useEffect(() => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const newPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
                setCurrentPosition(newPos);
                setPath((prevPath) => [...prevPath, newPos]); // Keep track of all positions for polyline
            },
            (err) => {
                alert("Unable to retrieve your location");
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );

        return () => navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
    }, []);

    return (
        <Layout>
            <div className="p-6 space-y-10 max-w-7xl mx-auto font-sans">

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Track Orders Status</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {orderStatuses.map(({ id, orderId, status }) => {
                            const key = status.toLowerCase() as StatusKey;

                            // Step 4: Access the color class safely
                            const colorClass = statusColors[key] || "bg-gray-200";
                            return (
                                <div key={id} className="p-4 border rounded shadow-sm flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-gray-900">Order: {orderId}</p>
                                        <p className="font-semibold text-gray-900" >Status:</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold text-gray-900 ${colorClass}`}>
                                        {status}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 2. Assign & Manage Delivery Partners */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex justify-between items-center text-gray-900">
                        Assign & Manage Delivery Partners
                        <button
                            onClick={() => setShowAssignModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Assign Partner
                        </button>
                    </h2>

                    <table className="w-full border-collapse border border-gray-300 rounded">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-left text-gray-900">Partner Name</th>
                                <th className="border border-gray-300 p-2 text-left text-gray-900">Coverage Area</th>
                                <th className="border border-gray-300 p-2 text-left text-gray-900">Status</th>
                                <th className="border border-gray-300 p-2 text-left text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveryPartners.map(({ id, name, coverage, status }) => (
                                <tr key={id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 p-2 text-gray-700">{name}</td>
                                    <td className="border border-gray-300 p-2 text-gray-700">{coverage}</td>
                                    <td className="border border-gray-300 p-2 text-gray-700">{status}</td>
                                    <td className="border border-gray-300 p-2 text-gray-700">
                                        <button className="text-blue-600 hover:underline">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 ">Delivery Zones / Coverage</h2>
                    <div className="w-full h-96 border rounded shadow">
                        {position ? (
                            <MapContainer
                                center={position}
                                zoom={13}
                                scrollWheelZoom={false}
                                style={{ height: "100%", width: "100%" }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <Marker position={position}>
                                    <Popup>Your current location</Popup>
                                </Marker>
                            </MapContainer>
                        ) : (
                            <p>Loading your location...</p>
                        )}
                    </div>
                </section>


                <section>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Delivery Performance Dashboard</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                        <PerformanceCard title="On-time Deliveries" value="92%" color="green" />
                        <PerformanceCard title="Delayed Deliveries" value="8%" color="red" />
                        <PerformanceCard title="Average Rating" value="4.5 / 5" color="yellow" />
                        <PerformanceCard title="Total Deliveries" value="1,234" color="blue" />
                    </div>
                </section>

                {/* 5. Shipment Tracking (Live + History) */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Shipment Tracking (Live + History)</h2>
                    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                        <div className="flex-1 h-80 border rounded shadow bg-gray-100 flex items-center justify-center text-gray-500">
                            {position ? (
                                <MapContainer
                                    center={position}
                                    zoom={13}
                                    scrollWheelZoom={false}
                                    style={{ height: "100%", width: "100%" }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={position}>
                                        <Popup>Your current location</Popup>
                                    </Marker>
                                </MapContainer>
                            ) : (
                                <p>Loading your location...</p>
                            )}
                        </div>
                        <div className="flex-1 border rounded shadow p-4 max-h-80 overflow-y-auto">
                            <h3 className="font-semibold mb-2 text-gray-900">Order History</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>Order #ORD1234 dispatched at 10:00 AM</li>
                                <li>Partner John Doe picked up at 10:15 AM</li>
                                <li>Order #ORD1234 delivered at 11:00 AM</li>
                                {/* Add more log entries */}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 6. Refund Initiation / Cancellation Logs */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Refund / Cancellation Logs</h2>
                    <table className="w-full border-collapse border border-gray-300 rounded">
                        <thead>
                            <tr className="bg-gray-100 ">
                                <th className="border border-gray-300 p-2 text-left text-gray-900">Order ID</th>
                                <th className="border border-gray-300 p-2 text-left text-gray-900">Initiated By</th>
                                <th className="border border-gray-300 p-2 text-left text-gray-900">Reason</th>
                                <th className="border border-gray-300 p-2 text-left text-gray-900">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2 text-gray-700">ORD1235</td>
                                <td className="border border-gray-300 p-2 text-gray-700">Customer</td>
                                <td className="border border-gray-300 p-2 text-gray-700">Wrong item delivered</td>
                                <td className="border border-gray-300 p-2 text-red-600">Cancelled</td>
                            </tr>
                            {/* Add more refund/cancellation logs */}
                        </tbody>
                    </table>
                </section>

                {/* Assign Partner Modal */}
                {showAssignModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded p-6 w-96 max-w-full">
                            <h3 className="text-xl font-semibold mb-4">Assign Delivery Partner</h3>
                            {/* Form fields for assigning partner */}
                            <input
                                type="text"
                                placeholder="Partner name"
                                className="w-full mb-3 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Coverage area"
                                className="w-full mb-3 p-2 border border-gray-300 rounded"
                            />
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowAssignModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // Implement assign logic here
                                        setShowAssignModal(false);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Assign
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

function PerformanceCard({ title, value, color }: any) {
    const colorMap = {
        green: "bg-green-100 text-green-800",
        red: "bg-red-100 text-red-800",
        yellow: "bg-yellow-100 text-yellow-800",
        blue: "bg-blue-100 text-blue-800",
    } as any;

    return (
        <div className={`p-4 rounded shadow ${colorMap[color] || "bg-gray-100 text-gray-800"}`}>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}




