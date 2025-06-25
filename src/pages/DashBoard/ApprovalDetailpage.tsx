import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  UserIcon,
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
  XCircleIcon, CheckCircleIcon,
  ClipboardIcon, ArrowLeftIcon
} from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";

export default function ApprovalDetailsPage() {
  const location = useLocation();
  const { item,type  } = location.state || {}; const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  console.log('Type from:', type);
  useEffect(() => {
    console.log('Type from URL param:', type);
  }, [type]);
  if (!item) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-500 text-lg italic">No approval details available.</p>
        </div>
      </Layout>
    );
  }

  const user = item.user || {};
  const address = user.address || {};
  const timezone = user.timezone || {};
  const additionalInfo = item.additional_info || {};
  const specialityList = item.provider_speciality || [];

  const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between border-b border-gray-200 py-3 hover:bg-indigo-50 transition-colors rounded px-2">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 truncate max-w-xs">{value || <span className="italic text-gray-400">N/A</span>}</span>
    </div>
  );

  // Badge for boolean values
  const BooleanBadge = ({ value }: { value: boolean }) => (
    <span
      className={`inline-block px-3 py-0.5 text-sm font-semibold rounded-full ${value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
    >
      {value ? "Yes" : "No"}
    </span>
  );
  const handleApprove = () => { }
  const handleReject = () => { }
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12 border-b border-indigo-300 pb-5 drop-shadow-sm">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGoBack}
                className="flex items-center text-indigo-900 hover:text-indigo-700 transition"
                aria-label="Go back"
              >
                <ArrowLeftIcon className="h-6 w-6" />

              </button>
              <h1 className="text-4xl font-extrabold text-indigo-900">
                {type !== "veterinarians" ? 'Approval Details' : 'Veterinarian List'}
              </h1>
            </div>
            {type !== "veterinarians" && (
              <div className="flex space-x-6">
                <button
                  onClick={handleReject}
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <XCircleIcon className="h-6 w-6 mr-2" />
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <CheckCircleIcon className="h-6 w-6 mr-2" />
                  Approve
                </button>
              </div>
            )}

          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* User Information */}
            <section className="bg-white rounded-2xl shadow-xl p-10 ring-1 ring-indigo-100 hover:shadow-2xl transition-shadow duration-300">
              <header className="flex items-center mb-8 space-x-4">
                <UserIcon className="text-indigo-600 w-8 h-8" />
                <h2 className="text-3xl font-semibold text-indigo-900 tracking-wide">User Information</h2>
              </header>
              <InfoRow label="Name" value={`${user.first_name} ${user.last_name}`} />
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Mobile" value={`${user.isd_code} ${user.mobile}`} />
              <InfoRow label="Username" value={user.username} />
              <InfoRow label="Date of Birth" value={user.dob} />
              <InfoRow label="Gender" value={user.gender} />
              <InfoRow label="Blood Group" value={user.blood_group} />
              <InfoRow label="2FA Enabled" value={<BooleanBadge value={user.is_2fa} />} />
              <InfoRow label="Active" value={<BooleanBadge value={user.is_active} />} />

              <header className="flex items-center mt-12 mb-6 space-x-4">
                <MapPinIcon className="text-indigo-600 w-8 h-8" />
                <h2 className="text-3xl font-semibold text-indigo-900 tracking-wide">Address</h2>
              </header>
              <InfoRow label="Address" value={`${address.address1}, ${address.address2}`} />
              <InfoRow label="City" value={address.city} />
              <InfoRow label="State" value={address.state} />
              <InfoRow label="Country" value={address.country} />
              <InfoRow label="Zip Code" value={address.zipcode} />
            </section>

            {/* Professional Details */}
            <section className="bg-white rounded-2xl shadow-xl p-10 ring-1 ring-indigo-100 hover:shadow-2xl transition-shadow duration-300">
              <header className="flex items-center mb-8 space-x-4">
                <BriefcaseIcon className="text-indigo-600 w-8 h-8" />
                <h2 className="text-3xl font-semibold text-indigo-900 tracking-wide">Professional Details</h2>
              </header>
              <InfoRow label="License No" value={item.license_no} />
              <InfoRow label="Practicing Since" value={item.practicing_since} />
              <InfoRow label="Qualification" value={additionalInfo.qualification} />

              <header className="flex items-center mt-12 mb-6 space-x-4">
                <ClockIcon className="text-indigo-600 w-8 h-8" />
                <h2 className="text-3xl font-semibold text-indigo-900 tracking-wide">Timezone</h2>
              </header>
              <InfoRow label="Zone" value={timezone.zone_name} />
              <InfoRow label="Country Code" value={timezone.country_code} />

              <header className="flex items-center mt-12 mb-6 space-x-4">
                <ClipboardIcon className="text-indigo-600 w-8 h-8" />
                <h2 className="text-3xl font-semibold text-indigo-900 tracking-wide">Specialities</h2>
              </header>
              {specialityList.length > 0 ? (
                <ul className="list-disc list-inside text-indigo-900 space-y-2 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100 rounded-md px-4 py-2 bg-indigo-50 ring-1 ring-indigo-200">
                  {specialityList.map((spec: any) => (
                    <li key={spec.id} className="hover:text-indigo-700 cursor-pointer transition-colors">
                      {spec.speciality}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-indigo-600 italic">No specialities listed.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
