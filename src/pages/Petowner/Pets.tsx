import React, { useEffect, useState } from 'react';
import { PawPrint, ArrowLeft } from 'lucide-react';
import Layout from '../../components/Layout';
import apiClient from '../../services/apiClient';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';

export default function PetsList() {
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state?.item;
    const [pets, setPets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const primaryId = item?.id;

    useEffect(() => {
        if (!primaryId) return;

        const fetchPets = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiClient<any>(`v1/resource/pets?primary_id=${primaryId}`);
                setPets(response?.data?.pets || []);
            } catch (err: any) {
                setError(err?.message || 'Failed to load pets');
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, [primaryId]);

    if (loading) return <LoadingScreen message="Loading Pets..." />;

    return (
        <Layout>
            <div className="mx-auto max-w-7xl px-4 py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-6 text-white bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded-lg shadow"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                <h2 className="flex items-center gap-2 text-3xl font-bold text-teal-700 mb-6">
                    <PawPrint size={32} /> Pets List
                </h2>

                {error && (
                    <p className="text-red-600 font-medium mb-4">Error: {error}</p>
                )}

                {!error && pets.length === 0 && (
                    <p className="text-gray-600 italic">No pets found.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pets.map((pet: any) => {
                        const info = pet.additional_info || {};
                        return (
                            <div
                                key={pet.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-5"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                   

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 capitalize">
                                            {info.name || 'Unnamed'}
                                        </h3>
                                        <p className="text-sm text-gray-500">{pet.type || 'Unknown type'}</p>
                                    </div>
                                </div>

                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li><strong>Age:</strong> {info.age || 'N/A'}</li>
                                    <li><strong>DOB:</strong> {info.dob || 'N/A'}</li>
                                    <li><strong>Gender:</strong> {info.gender || 'N/A'}</li>
                                    <li><strong>Color:</strong> {info.color || 'N/A'}</li>
                                    <li><strong>Weight:</strong> {info.weight ? `${info.weight} kg` : 'N/A'}</li>
                                    
                                    <li><strong>Reg No:</strong> {info.reg_no || '—'}</li>
                                    <li><strong>Chip No:</strong> {info.chip_no || '—'}</li>

                                    <li>
                                        <strong>Status:</strong>{' '}
                                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${pet.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {pet.status || 'unknown'}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
