import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getCoupons, deleteCoupon } from '../../services/woocommerce';  // <-- import deleteCoupon here
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CouponAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<number | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
      })
      .catch(() => alert('Failed to copy!'));
  };

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const filteredCoupons = coupons.filter((coupon: any) => {
    const title = coupon.title || coupon.code || '';
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (coupon.code && coupon.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await getCoupons();
      setCoupons(response.data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch coupons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Open delete confirmation dialog
  const openDeleteDialog = (couponId: number) => {
    setCouponToDelete(couponId);
    setDeleteDialogOpen(true);
  };

  // Close delete confirmation dialog
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCouponToDelete(null);
  };

  // Handle actual coupon deletion
  const handleDelete = async () => {
    if (!couponToDelete) return;
    try {
      setLoading(true);
      await deleteCoupon(couponToDelete, true);  // force delete permanently
      // Refresh list after deletion
      await fetchCoupons();
      closeDeleteDialog();
    } catch (err: any) {
      alert(err.message || 'Failed to delete coupon');
      closeDeleteDialog();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-8 bg-gradient-to-b from-gray-50 via-white to-gray-100 min-h-screen">

        <div className="mb-6 flex justify-between">
          <input
            type="text"
            placeholder="🔍 Search by title or code"
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={searchTerm}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => navigate("/coupons/new")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Coupon
          </button>
        </div>

        {loading ? (
          <Box className="flex justify-center items-center py-12">
            <CircularProgress size={60}
              thickness={5}
              style={{ color: '#4F46E5', }} />
          </Box>
        ) : error ? (
          <p className="text-red-600 font-semibold mb-4">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gradient-to-r from-gray-900 to-gray-900 text-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Expiry</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCoupons.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center p-6 text-gray-500">
                      No coupons found.
                    </td>
                  </tr>
                )}

                {filteredCoupons.map((coupon: any) => (
                  <tr key={coupon.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-800">{coupon.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-semibold">
                      {coupon.title || coupon.code}
                    </td>
                    <td className="px-6 py-4 text-xl font-mono  text-blue-500 font-bold">{coupon.code}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{coupon.description || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {coupon.date_expires
                        ? new Date(coupon.date_expires).toLocaleDateString('en-GB')
                        : '-'}
                    </td>

                    <td className="px-6 py-4">
                      {isExpired(coupon.date_expires) ? (
                        <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                          Expired
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        onClick={() => copyToClipboard(coupon.code)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold text-white shadow transition ${copiedCode === coupon.code
                          ? 'bg-green-500'
                          : 'bg-gray-600 hover:bg-gray-700'
                          }`}
                      >
                        {copiedCode === coupon.code ? 'Copied!' : 'Copy Code'}
                      </button>
                      <button
                        onClick={() => navigate(`/coupons/${coupon.id}`)}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openDeleteDialog(coupon.id)}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Dialog
          open={deleteDialogOpen}
          onClose={closeDeleteDialog}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            className: "rounded-lg p-4 bg-red-50"
          }}
        >
          <DialogTitle className="text-red-700 font-bold text-lg text-center">Confirm Delete</DialogTitle>

          <DialogContent>
            <Typography className="text-gray-700 mb-6 text-center" variant="body1">
              Are you sure you want to delete this coupon? <strong>This action cannot be undone.</strong>
            </Typography>
          </DialogContent>

          <DialogActions className="space-x-4">
            <Button
              onClick={closeDeleteDialog}
              variant="outlined"
              className="text-blue-600 border-blue-600 hover:bg-blue-100 normal-case"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              className="bg-red-600 hover:bg-red-700 normal-case"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </Layout>
  );
};

export default CouponAdminPage;
