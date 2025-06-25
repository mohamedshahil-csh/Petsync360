import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import {
    UserIcon,
    MapPinIcon,
    ClockIcon,
    ArrowLeftIcon
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

export default function PetOwnerPage() {
    const location = useLocation();
    const { item } = location.state || {};
    const navigate = useNavigate();
    const [owners, setOwners] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    console.log("item", item?.id)
    const fetchOwners = async () => {
        try {
            setLoading(true);

            const { data } = await apiClient(`v1/resource/patients/${item?.user_id}`, { method: "GET" }) as any;

            const ownersData = data.patients;
            setOwners(ownersData);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    console.log('pet owners', owners?.additional_info?.avatar_url?.file_path);

    if (!item) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <p className="text-gray-500 text-lg italic">No pet owner details available.</p>
                </div>
            </Layout>
        );
    }

    const user = item.user || {};
    const address = user.address || {};
    const timezone = user.timezone || {};

    console.log('item', item);

    const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <div className="flex justify-between border-b border-gray-200 py-3 hover:bg-indigo-50 transition-colors rounded px-2">
            <span className="text-gray-600 font-medium">{label}</span>
            <span className="text-gray-900 truncate max-w-xs">{value || <span className="italic text-gray-400">N/A</span>}</span>
        </div>
    );

    const BooleanBadge = ({ value }: { value: boolean }) => (
        <span className={`inline-block px-3 py-0.5 text-sm font-semibold rounded-full ${value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {value ? "Yes" : "No"}
        </span>
    );

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12 border-b border-indigo-300 pb-5 drop-shadow-sm">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleGoBack}
                                className="flex items-center text-indigo-900 hover:text-indigo-700 transition"
                                aria-label="Go back"
                            >
                                <ArrowLeftIcon className="h-6 w-6" />
                            </button>
                            <h1 className="text-4xl font-extrabold text-indigo-900">
                                Pet Owner Details
                            </h1>
                        </div>
                    </div>

                    <div className="grid gap-12 md:grid-cols-2">
                        {/* Owner Information */}
                        <section className="bg-white rounded-2xl shadow-xl p-10 ring-1 ring-indigo-100 hover:shadow-2xl transition-shadow duration-300">
                            <header className="flex items-center mb-8 space-x-4">
                                <UserIcon className="text-indigo-600 w-8 h-8" />
                                <h2 className="text-3xl font-semibold text-indigo-900 tracking-wide">Owner Information</h2>
                            </header>
                            {owners?.additional_info?.avatar_url?.file_path && (
                                <div className="flex justify-center mb-6">
                                    <img
                                        src={owners.additional_info.avatar_url.file_path}
                                        alt="Profile"
                                        className="w-32 h-32 object-cover border-4 border-indigo-200 shadow-md rounded-lg" // rounded-lg is optional
                                    />
                                </div>
                            )}

                            <InfoRow label="Name" value={`${user.first_name} ${user.last_name}`} />
                            <InfoRow label="Email" value={user.email} />
                            <InfoRow label="Mobile" value={`${user.isd_code} ${user.mobile}`} />
                            <InfoRow label="Username" value={user.username} />
                            <InfoRow label="Date of Birth" value={user.dob} />
                            <InfoRow label="Gender" value={user.gender} />
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

                        {/* Timezone Information */}
                        <section className="bg-white rounded-2xl shadow-xl p-10 ring-1 ring-indigo-100 hover:shadow-2xl transition-shadow duration-300">
                            <header className="flex items-center mb-6 space-x-4">
                                <ClockIcon className="text-indigo-600 w-8 h-8" />
                                <h2 className="text-3xl font-semibold text-indigo-900 tracking-wide">Timezone</h2>
                            </header>
                            <InfoRow label="Zone" value={timezone.zone_name} />
                            <InfoRow label="Country Code" value={timezone.country_code} />
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
