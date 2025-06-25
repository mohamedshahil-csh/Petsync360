import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

import {
    Box,
    Typography,
    useTheme,
} from '@mui/material';

import { BanIcon, EyeIcon, PencilIcon, RefreshCwIcon } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { useNavigate } from 'react-router-dom';
import DynamicTable from '../../components/Table/DataTable';
import { IconActivate, IconDeactivate, IconEye, IconPaw } from '../../components/icons/icons';
import TablePaginationActions from '../../components/Table/tablePagination';


const cities: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston'];

const PetOwnerList = () => {
    const [owners, setOwners] = useState<any[]>([]);
    const [Pets, setPets] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<any>('');
    const [cityFilter, setCityFilter] = useState<string>('');
    const [dateFilter, setDateFilter] = useState<string>('');
    const [totalCount, setTotalCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [petCounts, setPetCounts] = useState<Record<number, number>>({});

    const theme = useTheme();
    const fetchOwners = async () => {
        try {
            setLoading(true);

            const params: any = {
                limit: rowsPerPage,
                page: page + 1,
                searchkey: searchQuery || "",
                order_by: "id",
                dir: 2,
                type: "all",
                from: "",
                to: "",
            };

            if (statusFilter !== null) {
                params.is_active = statusFilter;
            }
            if (cityFilter) {
                params.city = cityFilter;
            }
            if (dateFilter) {
                params.date = dateFilter;
            }

            const queryString = new URLSearchParams(params).toString();
            const { data } = await apiClient(`v1/resource/patient?${queryString}`, { method: "GET" }) as any;

            const ownersData = data.patients;
            setOwners(ownersData);
            setTotalCount(data.pagination.total);

            // Fetch pet counts
            const ownerIds = ownersData.map((owner: { id: any }) => owner.id).filter(Boolean);
            if (ownerIds.length > 0) {
                await fetchPetCountsForOwners(ownerIds);
            }

        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Fetch owners on component mount and whenever dependencies change
    useEffect(() => {
        fetchOwners();
    }, [searchQuery, statusFilter, cityFilter, dateFilter, page, rowsPerPage]);

    const fetchPetCountsForOwners = async (ownerIds: number[]) => {
        try {
            const params: any = {
                limit: '',
                page: 1,
                searchkey: '',
                order_by: 'id',
                dir: 2,
                type: 'all',
                from: '',
                to: '',
            };

            const queryString = new URLSearchParams(params).toString();
            const { data } = await apiClient(`/v1/resource/pets?${queryString}`, { method: "GET" }) as any;

            const petData = data.pets || [];

            const petCountsByOwner: Record<number, number> = {};

            for (const pet of petData) {
                const id = pet.primary_id;
                if (id && ownerIds.includes(id)) {
                    petCountsByOwner[id] = (petCountsByOwner[id] || 0) + 1;
                }
            }

            setPetCounts(petCountsByOwner);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        }
    };




    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    const filteredOwners = owners;

    const columns = [

        {
            key: 'serial',
            label: 'S.No',
            align: 'center',
            render: (_row: any, index: number) => page * rowsPerPage + index + 1,
        },
        { key: 'owner', label: 'Owner', align: 'center', render: (row: any) => `${row?.user?.first_name || ''} ${row?.user?.last_name || ''}`, },
        {
            key: 'petCount',
            label: 'Pet Counts',
            align: 'center',
            render: (row: any) => petCounts[row.id] || 0
        },
        { key: 'city', label: 'City', align: 'center', render: (row: any) => row?.user?.address?.city || '-' },
        {
            key: 'Status',
            label: 'Status',
            align: 'center',
            render: (row: any) => {
                const isActive = row?.user?.is_active === 1;
                return (
                    <span
                        style={{
                            backgroundColor: isActive ? '#d1fae5' : '#fee2e2', // green for active, red for inactive
                            color: isActive ? '#065f46' : '#991b1b',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            minWidth: '70px',
                        }}
                    >
                        {isActive ? 'Active' : 'Inactive'}
                    </span>
                );
            }
        },
        { key: 'Mobile', label: 'Mobile', align: 'center', render: (row: any) => row?.user?.mobile ?? '-' },

    ];

    const actions = [
        {
            label: 'View',
            color: '#2196f3',
            icon: <IconEye size={20} />,
            onClick: (row: any) => handleShowDetails(row)
        },
        {
            label: (row: any) => (row?.user?.is_active == 1 ? 'Deactivate' : 'Activate'),
            color: (row: any) => row?.user?.is_active == 1 ? '#d32f2f' : '#2e7d32',
            icon: (row: any) => row?.user?.is_active == 1 ? <IconDeactivate /> : <IconActivate />,
            onClick: async (row: any) => {
                const actionLabel = row?.user?.is_active == 1 ? 'Deactivate' : 'Activate';
                const confirmMsg = `Are you sure you want to ${actionLabel.toLowerCase()} this user?`;

                if (!window.confirm(confirmMsg)) {
                    console.log('Action aborted');
                    return;
                }

                try {
                    const newStatus = row?.user?.is_active == 1 ? 0 : 1;
                    await apiClient<any>(`v1/resource/patient/${row.id}`, {
                        method: 'PUT',
                        body: {
                            id: row?.id,
                            status: newStatus,
                            user: {
                                role: 'parent',
                                username: row?.user?.username,
                                first_name: row?.user?.first_name,
                                is_active: newStatus
                            }
                        },
                    });

                    // Refetch owners to update UI
                    await fetchOwners();
                } catch (error) {
                    console.error('Failed to update status:', error);
                    alert(`Failed to ${actionLabel.toLowerCase()} the user. Please try again.`);
                }
            },

        },
        {
            label: 'Show Pets',
            color: '#7b1fa2',
            icon: <IconPaw size={20} />, 
            onClick: (row: any) => {
                handlePet(row);
            }
        }
    ];
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setPage(0);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchInput]);

    if (loading) {
        return <Layout> <Typography>Loading Pet Owners...</Typography> </Layout>;
    }

    if (error) {
        return <Layout> <Typography color="error">Error: {error}</Typography> </Layout>;
    }


    const handleShowDetails = (item: any) => {
        const id = item.id;

        navigate(`/pet-owners/${id}`, {
            state: { item },
        });
    };

    const handlePet = (item: any) => {
        const id = item.id;

        navigate(`/pets-details/${id}`, {
            state: { item },
        });
    };

    const handleSearchClick = () => {
        setSearchQuery(searchInput);
        setPage(1); // reset to first page
        setHasSearched(true);
    };

    const handleClearClick = () => {
        setSearchInput('');
        setSearchQuery('');
        setHasSearched(false);
    };
    return (
        <Layout>
            <Box p={4}>
                {/* Filters without Grid */}
                <Box
                    display="flex"
                    flexWrap="wrap"
                    gap={2}
                    mb={2}
                    alignItems="flex-start"
                >
                    <div className="flex gap-2 items-end">
                        <div className="flex-1 min-w-[250px]">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                                htmlFor="ownerName"
                            >
                                Pet Owner Name
                            </label>
                            <input
                                id="ownerName"
                                type="text"
                                placeholder="Search owner name"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                            />
                        </div>

                        {hasSearched ? (
                            <button
                                onClick={handleClearClick}
                                className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600"
                            >
                                Clear
                            </button>
                        ) : (
                            <button
                                onClick={handleSearchClick}
                                disabled={!searchInput.trim()} // optional: disable if input is empty
                                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                            >
                                Search
                            </button>
                        )}
                    </div>



                    <div className="flex-1 min-w-[180px]">
                        <label htmlFor="status-select" className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            id="status-select"
                            value={statusFilter}
                            onChange={e => {
                                const value = e.target.value;
                                setStatusFilter(value === '' ? '' : Number(value));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        >
                            <option value="">All Status</option>
                            {/* <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                            <option value={2}>Deactivated</option> */}
                        </select>

                    </div>

                    <div className="flex-1 min-w-[180px]">
                        <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                        </label>
                        <select
                            id="city-select"
                            value={cityFilter}
                            onChange={e => setCityFilter(e.target.value)}
                            className="w-full px-3 py-2 text-gray-700  border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        >
                            <option value="">All Cities</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="flex-1 min-w-[250px]">
                        <label htmlFor="registered-date" className="block text-sm font-medium text-gray-700 mb-1">
                            Registered Date
                        </label>
                        <input
                            id="registered-date"
                            type="date"
                            value={dateFilter}
                            onChange={e => setDateFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        />
                    </div>

                </Box>
                <DynamicTable
                    columns={columns}
                    data={filteredOwners}
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

            </Box>
        </Layout>
    );
};

export default PetOwnerList;
