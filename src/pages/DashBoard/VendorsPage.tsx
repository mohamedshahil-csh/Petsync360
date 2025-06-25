import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getVendors } from '../../services/woocommerce';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

const VendorPage: React.FC = () => {
    const [vendors, setVendors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10); // Change if needed
    const [totalCount, setTotalCount] = useState(0);
    const totalPages = Math.ceil(vendors.length / perPage);
    const currentVendors = vendors.slice((currentPage - 1) * perPage, currentPage * perPage);


    const fetchVendors = async () => {
        try {
            setLoading(true);
            const response = await getVendors();
            console.log('Vendors:', response);
            setVendors(response.data || []);

        } catch (err: any) {
            setError(err.message || 'Failed to fetch vendors');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    return (
        <Layout>
            <div className="p-6 mx-auto">
                <div className="bg-white rounded shadow overflow-x-auto">
                    <h3 className="text-lg bg-gray-900 text-white font-semibold p-4 border-b">Vendor List</h3>

                    {loading ? (
                        <p className="p-4 text-gray-500">Loading vendors...</p>
                    ) : error ? (
                        <p className="p-4 text-red-500">{error}</p>
                    ) : vendors.length === 0 ? (
                        <p className="p-4 text-gray-500">No vendors available.</p>
                    ) : (
                        <>
                            <table className="min-w-full text-left border-collapse">
                                <thead className="bg-gray-100 text-sm">
                                    <tr>
                                        <th className="p-3 border-b">ID</th>
                                        <th className="p-3 border-b">Shop Name</th>
                                        <th className="p-3 border-b">Display Name</th>
                                        <th className="p-3 border-b">Email</th>
                                        <th className="p-3 border-b">Phone</th>
                                        <th className="p-3 border-b">Address</th>
                                        <th className="p-3 border-b">Verified</th>
                                        <th className="p-3 border-b">Offline</th>
                                        <th className="p-3 border-b">Logo</th>
                                        <th className="p-3 border-b">Banner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentVendors.map((vendor) => (
                                        <tr key={vendor.vendor_id} className="text-sm">
                                            <td className="p-3 border-b">{vendor.vendor_id}</td>
                                            <td className="p-3 border-b">{vendor.vendor_shop_name}</td>
                                            <td className="p-3 border-b">{vendor.vendor_display_name}</td>
                                            <td className="p-3 border-b">{vendor.vendor_email}</td>
                                            <td className="p-3 border-b">{vendor.vendor_phone || 'N/A'}</td>
                                            <td className="p-3 border-b">{vendor.vendor_address || 'N/A'}</td>
                                            <td className="p-3 border-b">{vendor.email_verified === '1' ? 'Yes' : 'No'}</td>
                                            <td className="p-3 border-b">{vendor.is_store_offline === 'yes' ? 'Yes' : 'No'}</td>
                                            <td className="p-3 border-b">
                                                <img
                                                    src={vendor.vendor_shop_logo}
                                                    alt="logo"
                                                    className="h-10 w-10 rounded cursor-pointer"
                                                    onClick={() => setPreviewImage(vendor.vendor_shop_logo)}
                                                />
                                            </td>
                                            <td className="p-3 border-b">
                                                <img
                                                    src={vendor.vendor_banner}
                                                    alt="banner"
                                                    className="h-10 w-20 rounded cursor-pointer"
                                                    onClick={() => setPreviewImage(vendor.vendor_banner)}
                                                />
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex items-center bg-gray-900 justify-between p-4">
                                <p className="text-sm text-gray-100">
                                   Total: {vendors.length}
                                </p>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                        className="p-2 border rounded bg-gray-100 disabled:opacity-50 hover:bg-white"
                                    >
                                        <ChevronsLeft size={20} />
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 border rounded bg-gray-100 disabled:opacity-50 hover:bg-white"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <p className="text-sm text-gray-100">
                                        Page {currentPage} of {totalPages} 
                                    </p>
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 border rounded bg-gray-100 disabled:opacity-50 hover:bg-white"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                        className="p-2 border rounded bg-gray-100 disabled:opacity-50 hover:bg-white"
                                    >
                                        <ChevronsRight size={20} />
                                    </button>
                                </div>
                            </div>


                        </>

                    )}
                </div>
            </div>
            {previewImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setPreviewImage(null)}
                >
                    <div className="bg-white p-4 rounded shadow-lg">
                        <img src={previewImage} alt="Preview" className="max-h-[80vh] max-w-[90vw] rounded" />
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="block mt-4 mx-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </Layout>
    );
};

export default VendorPage;
