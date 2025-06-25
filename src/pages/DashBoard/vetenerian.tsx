import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Box, Typography, useTheme, } from '@mui/material';
import apiClient from '../../services/apiClient';
import { useNavigate } from 'react-router-dom';
import DynamicTable from '../../components/Table/DataTable';
import { IconActivate, IconDeactivate, IconEye } from '../../components/icons/icons';
import TablePaginationActions from '../../components/Table/tablePagination';


const cities: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston'];

const VeterinarianList = () => {
    const [veterinarians, setVeterinarian] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
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
    const fetchVeterinarians = async () => {
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
            const { data } = await apiClient(`v1/resource/providers?${queryString}`, { method: "GET" }) as any;

            const veterinariansData = data.providers;
            setVeterinarian(veterinariansData);
            setTotalCount(data.pagination.total);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVeterinarians();
    }, [searchQuery, statusFilter, cityFilter, dateFilter, page, rowsPerPage]);


    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    const filteredveterinarians = veterinarians;

    const columns = [

        {
            key: 'serial',
            label: 'S.No',
            align: 'center',
            render: (_row: any, index: number) => page * rowsPerPage + index + 1,
        },
        { key: 'veterinarian', label: 'Veterinarian Name', align: 'center', render: (row: any) => `${row?.user?.first_name || ''} ${row?.user?.last_name || ''}`, },

        { key: 'city', label: 'City', align: 'center', render: (row: any) => row?.user?.address?.city || '-' },
        {
            key: 'speciality', label: 'Speciality', align: 'center', render: (row: any) => {
                const specialities = row?.provider_speciality?.map((spec: any) => spec.speciality).join(', ');
                return specialities || '-';
            }
        },
        { key: 'Mobile', label: 'Contact No', align: 'center', render: (row: any) => row?.user?.mobile ?? '-' },
        {
            key: 'Status',
            label: 'Status',
            align: 'center',
            render: (row: any) => {
                // For veterinarians, status is in row.user.is_active
                // For service providers, it's in row.is_active
                const status = row?.user?.is_active ?? row?.is_active;

                let bgColor = '#fee2e2'; // default red for inactive/rejected
                let textColor = '#991b1b';
                let statusText = 'Rejected';

                if (status === 1) {
                    bgColor = '#d1fae5'; // green
                    textColor = '#065f46';
                    statusText = 'Active';
                } else if (status === 2) {
                    bgColor = '#fef3c7'; // yellow/orange for deactivated
                    textColor = '#92400e';
                    statusText = 'Deactivated';
                }

                return (
                    <span
                        style={{
                            backgroundColor: bgColor,
                            color: textColor,
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            minWidth: '90px',
                            textAlign: 'center',
                        }}
                    >
                        {statusText}
                    </span>
                );
            },
        }



    ];

    const getUserStatusInfo = (user: any) => {
        const isActive = user?.is_active === 1;
        return {
            label: isActive ? 'Deactivate' : 'Activate',
            color: isActive ? '#d32f2f' : '#2e7d32',
            icon: isActive ? <IconDeactivate size={20} /> : <IconActivate size={20} />,
            newStatus: isActive ? 2 : 1,
        };
    };

    const handleToggleActive = async (row: any) => {
        const { user } = row;
        const { label, newStatus } = getUserStatusInfo(user);
        const actionName = `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
        const confirmMsg = `Are you sure you want to ${label} ${actionName}?`;

        if (!window.confirm(confirmMsg)) {
            console.log('❌ Action aborted');
            return;
        }

        const payload = {
            id: row.user_id,
            license_no: row.license_no,
            role: 'veterinarian',
            first_name: user.first_name,
            mobile: user.mobile,
            username: user.username,
            timezone_id: user.timezone?.id,
            is_2fa: user.is_2fa,
            is_active: newStatus,
        };

        console.log('📤 Final Payload Sent:', JSON.stringify(payload, null, 2));

        try {
            const response = await apiClient<any>(`v1/resource/users/${row.user_id}`, {
                method: 'PUT',
                body: payload,
            });

            console.log('✅ Status update success:', response);
            await fetchVeterinarians();
        } catch (error: any) {
            console.error('❌ Error during status update:', error);

            let errorMsg = `Failed to ${label.toLowerCase()} the user.`;

            if (error?.response) {
                const { status, data } = error.response;
                errorMsg += `\n\n🔍 Server responded with status: ${status}`;

                if (data?.message) {
                    errorMsg += `\n📣 Message: ${data.message}`;
                }

                if (data?.data?.errors) {
                    errorMsg += `\n\n❗ Validation Errors:\n`;
                    for (const [field, message] of Object.entries(data.data.errors)) {
                        errorMsg += `- ${field}: ${message}\n`;
                    }
                }

                console.log('🧾 Full Server Error Response:', JSON.stringify(data, null, 2));
            } else {
                errorMsg += `\n\n⚠️ ${error.message || 'Unknown error occurred.'}`;
            }

            alert(errorMsg);
        }
    };

    const actions = [
        {
            label: 'View',
            color: '#2196f3',
            icon: <IconEye size={20} />,
            onClick: (row: any) => handleShowDetails(row),
        },
        {
            label: (row: any) => getUserStatusInfo(row?.user).label,
            color: (row: any) => getUserStatusInfo(row?.user).color,
            icon: (row: any) => getUserStatusInfo(row?.user).icon,
            onClick: handleToggleActive,
        },
    ];


    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setPage(0);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchInput]);

    if (loading) {
        return <Layout> <Typography>Loading Pet Veterinarians...</Typography> </Layout>;
    }

    if (error) {
        return <Layout> <Typography color="error">Error: {error}</Typography> </Layout>;
    }


    const handleShowDetails = (item: any) => {
        const id = item.id;

        navigate(`/appointments/details/${id}`, {
            state: {
                item,
                type: 'veterinarians',
            },
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
                                htmlFor="veterinarianName"
                            >
                                Veterinarian Name
                            </label>
                            <input
                                id="veterinarianName"
                                type="text"
                                placeholder="Search veterinarian name"
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
                    data={filteredveterinarians}
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

export default VeterinarianList;
