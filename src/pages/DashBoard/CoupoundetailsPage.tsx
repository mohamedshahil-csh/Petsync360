import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { getCouponsDetails } from '../../services/woocommerce';

// Import Lucide React icons
import { Percent, Circle, ArrowLeft } from 'lucide-react';

const CouponDetailsPage: React.FC = () => {
  const { couponId } = useParams<any>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [couponDetails, setCouponDetails] = useState<any>(null);

  const fetchCouponDetails = async () => {
    try {
      setLoading(true);
      const response = await getCouponsDetails(parseInt(couponId || '0'));
      setCouponDetails(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch coupon details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCouponDetails();
  }, [couponId]);

  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center text-2xl font-semibold text-indigo-600 animate-pulse">
          Loading coupon details...
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-10 text-center text-red-600 font-bold text-xl">
          Error loading coupon details: {error}
        </div>
      </Layout>
    );
  }

  if (!couponDetails) {
    return (
      <Layout>
        <div className="p-10 text-center text-gray-600 font-medium text-lg">
          No coupon details found.
        </div>
      </Layout>
    );
  }

  // Status badge colors based on status
  const statusColors: Record<string, string> = {
    publish: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-orange-100 text-orange-800',
    trash: 'bg-red-100 text-red-800',
  };

  // Status icon color mapping
  const statusIconColors: Record<string, string> = {
    publish: '#22c55e',  // green-500
    draft: '#eab308',    // yellow-500
    pending: '#f97316',  // orange-500
    trash: '#ef4444',    // red-500
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-8">
          <button
          onClick={() => navigate(-1)} // Go back one step in history
          className="flex items-center gap-2 mb-6 text-indigo-600 hover:text-indigo-900 font-semibold transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 rounded-xl shadow-lg p-8 text-white mb-8">
          <h1 className="text-4xl font-extrabold tracking-wide mb-2 drop-shadow-lg">
            Coupon Details
          </h1>
          <p className="text-lg opacity-90">
            Details for coupon ID: <span className="font-semibold">{couponId}</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-10 transition-transform transform hover:scale-[1.02] hover:shadow-3xl duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <span className="inline-block bg-indigo-500 text-white font-extrabold text-3xl tracking-wider uppercase rounded-full px-8 py-3 shadow-lg select-none">
                {couponDetails.code}
              </span>
            </div>
            <div className="flex items-center gap-6 text-lg font-semibold">
              <div className="flex items-center gap-2 text-indigo-600">
                {/* Lucide Percent Icon */}
                <Percent size={28} strokeWidth={2} />
                <span>
                  {couponDetails.amount}{' '}
                  {couponDetails.discount_type === 'percent' ? '%' : '₹'}
                </span>
              </div>

              <div
                className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold ${statusColors[couponDetails.status] || 'bg-gray-200 text-gray-700'}`}
              >
                {/* Lucide Circle icon colored by status */}
                <Circle
                  size={16}
                  strokeWidth={2}
                  fill={statusIconColors[couponDetails.status] || '#9ca3af'} // fallback gray-400
                  stroke="none"
                />
                <span>{couponDetails.status.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <hr className="mb-8 border-gray-300" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-800">
            <section>
              <h2 className="text-xl font-bold mb-4 border-b-2 border-indigo-400 pb-2">
                General Info
              </h2>
              <ul className="space-y-3 text-lg">
                <li><strong>Description:</strong> {couponDetails.description || 'No description'}</li>
                <li>
                  <strong>Created At:</strong>{' '}
                  {new Date(couponDetails.date_created).toLocaleString()}
                </li>
                <li>
                  <strong>Expires On:</strong>{' '}
                  {couponDetails.date_expires
                    ? new Date(couponDetails.date_expires).toLocaleString()
                    : 'No expiry'}
                </li>
                <li><strong>Individual Use:</strong> {couponDetails.individual_use ? 'Yes' : 'No'}</li>
                <li><strong>Free Shipping:</strong> {couponDetails.free_shipping ? 'Yes' : 'No'}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 border-b-2 border-indigo-400 pb-2">
                Usage Info
              </h2>
              <ul className="space-y-3 text-lg">
                <li><strong>Usage Count:</strong> {couponDetails.usage_count}</li>
                <li><strong>Usage Limit:</strong> {couponDetails.usage_limit || 'No limit'}</li>
                <li><strong>Limit Per User:</strong> {couponDetails.usage_limit_per_user || 'No limit'}</li>
                <li><strong>Min Amount:</strong> ₹{couponDetails.minimum_amount}</li>
                <li><strong>Max Amount:</strong> {couponDetails.maximum_amount === '0.00' ? 'No maximum' : `₹${couponDetails.maximum_amount}`}</li>
              </ul>
            </section>

            <section className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4 border-b-2 border-indigo-400 pb-2">
                Applicable Products
              </h2>
              <p className="text-gray-600 text-lg select-text">
                {couponDetails.product_ids && couponDetails.product_ids.length > 0
                  ? couponDetails.product_ids.join(', ')
                  : 'No products specified'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CouponDetailsPage;
