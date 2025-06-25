import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Box, Typography, Tabs, Tab, useTheme } from '@mui/material';
import apiClient from '../../services/apiClient';
import { useNavigate } from 'react-router-dom';
import DynamicTable from '../../components/Table/DataTable';
import { IconActivate, IconDeactivate, IconEye, IconReject } from '../../components/icons/icons';
import TablePaginationActions from '../../components/Table/tablePagination';

const ApprovalPage = () => {
    const [approvals, setApprovals] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [activeTab, setActiveTab] = useState<'veterinarians' | 'service_providers'>('veterinarians');

    // Fetch approvals for the active tab
    const fetchApprovals = async () => {
        setLoading(true);
        setError(null);
        try {
            const params: any = {
                limit: rowsPerPage,
                page: page + 1,
                order_by: "id",
                dir: 2,
                type: "all",
                from: "",
                to: "",
                isActiveUsers:0
            };

            const endpoint = activeTab === "veterinarians"
                ? `v1/resource/providers?${new URLSearchParams(params).toString()}`
                : `v1/resource/service_providers?${new URLSearchParams(params).toString()}`;

            const response = await apiClient(endpoint, { method: "GET" }) as any;
            const rawData = response.data;

            let normalized = [];
            if (activeTab === "veterinarians") {
                normalized = rawData.providers.map((provider: any) => ({
                    ...provider,
                    type: "Veterinarian",
                }));
                setTotalCount(rawData.pagination?.total || normalized.length);
            } else {
                normalized = rawData.service_providers.map((provider: any) => ({
                    ...provider,
                    type: "Service Provider",
                }));
                setTotalCount(rawData.pagination?.total || normalized.length);
            }

            setApprovals(normalized);
        } catch (err: any) {
            setError(err.message || "Failed to fetch approvals");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApprovals();
    }, [activeTab, page, rowsPerPage]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: 'veterinarians' | 'service_providers') => {
        setActiveTab(newValue);
        setPage(0);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    approvals.forEach((approval, index) => {
        console.log(`approval #${index} is_active:`, approval.user?.is_active);
    });
    const filteredApprovals = approvals.filter(item => item.user?.is_active === 0);
    // Define columns dynamically based on active tab
    const columns = [
        {
            key: 'serial',
            label: 'S.No',
            align: 'center',
            render: (_row: any, index: number) => page * rowsPerPage + index + 1,
        },
        {
            key: 'name',
            label: activeTab === 'veterinarians' ? 'Veterinarian Name' : 'Service Provider Name',
            align: 'center',
            render: (row: any) => activeTab === 'veterinarians'
                ? `${row?.user?.first_name || ''} ${row?.user?.last_name || ''}`
                : `${row?.additional_info?.Vendor_name || ''} ` || '-',
        },
        {
            key: 'city',
            label: 'City',
            align: 'center',
            render: (row: any) => activeTab === 'veterinarians'
                ? row?.user?.address?.city || '-'
                : row?.user?.address?.city || '-',
        },
        ...(activeTab === 'veterinarians' ? [{
            key: 'speciality',
            label: 'Speciality',
            align: 'center',
            render: (row: any) => {
                const specialities = row?.provider_speciality?.map((spec: any) => spec.speciality).join(', ');
                return specialities || '-';
            }
        }] : []),
        {
            key: 'Mobile',
            label: 'Contact No',
            align: 'center',
            render: (row: any) => activeTab === 'veterinarians'
                ? row?.user?.mobile ?? '-'
                : row?.user?.mobile ?? '-',
        },
        {
            key: 'Status',
            label: 'Status',
            align: 'center',
            render: (row: any) => {
                const isActive = activeTab === 'veterinarians' ? (row?.user?.is_active === 1) : (row?.is_active === 1);
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
    ];

    const handleShowDetails = (item: any) => {
        const id = item.id;
        navigate(`/appointments/details/${id}`, {
            state: {
                item,
                type: 'approve',
            },
        });
    };

    const buildPayload = (row: any, isActive: number, role: 'veterinarian' | 'service_provider') => ({
        id: row?.user_id,
        license_no: row?.license_no,
        role,
        first_name: row?.user?.first_name,
        mobile: row?.user?.mobile,
        username: row?.user?.username,
        timezone_id: row?.user?.timezone?.id,
        is_2fa: row?.user?.is_2fa,
        is_active: isActive,
    });

    const handleUserAction = async (
        row: any,
        actionLabel: string,
        isActive: number,
        errorMessage: string
    ) => {
        const actionName = activeTab === 'veterinarians'
            ? `${row?.user?.first_name ?? ''} ${row?.user?.last_name ?? ''}`.trim()
            : row?.name ?? '';

        if (!window.confirm(`Are you sure you want to ${actionLabel.toLowerCase()} ${actionName}?`)) {
            return;
        }

        const role = activeTab === 'veterinarians' ? 'veterinarian' : 'service_provider';
        const payload = buildPayload(row, isActive, role);

        try {
            await apiClient(`v1/resource/users/${row.user_id}`, {
                method: 'PUT',
                body: payload,
            });
            await fetchApprovals();
        } catch (error: any) {
            alert(`${errorMessage}: ${error.message || 'Unknown error'}`);
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
            label: 'Approve',
            color: '#2e7d32',
            icon: <IconActivate size={20} />,
            onClick: (row: any) => handleUserAction(row, 'Approve', 1, 'Failed to approve the user'),
        },
        {
            label: 'Reject',
            color: '#d32f2f',
            icon: <IconReject size={20} />,
            onClick: (row: any) => handleUserAction(row, 'Reject', 2, 'Failed to reject the user'),
        },
        {
            label: 'Deactivate',
            color: '#ff9800',
            icon: <IconDeactivate size={20} />,
            onClick: (row: any) => handleUserAction(row, 'Deactivate', 0, 'Failed to deactivate the user'),
        },
    ];



    if (loading) {
        return (
            <Layout>
                <Typography>Loading Approvals...</Typography>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <Typography color="error">Error: {error}</Typography>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box p={4}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    aria-label="Approval Tabs"
                    sx={{ mb: 3 }}
                >
                    <Tab label="Veterinarians" value="veterinarians" />
                    <Tab label="Service Providers" value="service_providers" />
                </Tabs>

                <DynamicTable
                    columns={columns}
                    data={filteredApprovals}
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

export default ApprovalPage;
