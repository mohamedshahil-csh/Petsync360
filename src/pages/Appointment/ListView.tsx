import React from 'react';
import { Typography } from '@mui/material';
import DynamicTable from '../../components/Table/DataTable';
import TablePaginationActions from '../../components/Table/tablePagination';
import { IconCancel, IconClock, IconEdit, IconEye, IconRefund } from '../../components/icons/icons';
import apiClient from '../../services/apiClient';

const ListView = ({
    appointments,
    page,
    rowsPerPage,
    loading,
    error,
    totalCount,
    handleListViewClick,
    handlePageChange,
    handleRowsPerPageChange,
    handleEditClick,
    handleRefundClick,
    fetchAppointments
}: any) => {

    const getStatusClass = (slug?: string) => {
        if (!slug) return 'bg-gray-500';

        const key = slug.toLowerCase();

        switch (key) {
            case 'new':
                return 'bg-blue-600';
            case 'waiting':
                return 'bg-yellow-500';
            case 'unpaid':
                return 'bg-orange-500';
            case 'ended':
                return 'bg-gray-700';
            case 'started':
            case 'inprogress':
                return 'bg-indigo-600';
            case 'cancelled':
            case 'cancelled (you)':
            case 'cancelled (vet)':
                return 'bg-red-600';
            case 'completed':
            case 'confirmed':
                return 'bg-green-600';
            case 'paid':
                return 'bg-teal-600';
            case 'pending':
            case 'payment pending':
                return 'bg-amber-500';
            case 'accepted':
            case 'vet accepted':
            case 'vet joined':
            case 'joined (you)':
                return 'bg-purple-600';
            case 'reschedule requested':
            case 'rescheduled':
                return 'bg-cyan-600';
            case 'reschedule rejected':
                return 'bg-cyan-800';
            case 'expired':
                return 'bg-gray-400';
            case 'no show (you)':
            case 'no show (vet)':
                return 'bg-pink-600';
            case 'refund pending':
                return 'bg-yellow-600';
            case 'refunded':
                return 'bg-lime-600';
            case 'refund failed':
                return 'bg-red-700';
            case 'refund initiated':
                return 'bg-emerald-600';
            case 'created':
                return 'bg-slate-500';
            case 'link ready':
                return 'bg-blue-400';
            default:
                return 'bg-gray-500';
        }
    };


    const renderers = (row: any, index?: number) => {
        const petOwner = row.participants?.find((p: any) => p.role === 'subscriber');
        const vet = row.participants?.find((p: any) => p.role === 'publisher');
        return {
            serial: page * rowsPerPage + (index ?? 0) + 1,
            petowner: <Typography variant="caption">{petOwner?.participant_info?.name}</Typography>,
            Vetenerian: <Typography variant="caption">{vet?.participant_info?.name}</Typography>,
            DateTime: row.created_at ?? 'N/A',
            speciality: vet?.participant_info?.additional_info?.consult_speciality ?? 'N/A',
            status: (
                <span
                    className={`text-white text-xs px-2 py-1 rounded ${getStatusClass(
                        row.consult_current_status?.name?.toLowerCase()
                    )}`}
                >
                    {row.consult_current_status?.name || '-'}
                </span>
            ),
        };
    };

    const columns = [
        {
            key: 'serial',
            label: 'S.No',
            align: 'Left',
            render: (_row: any, index: number) => renderers(_row, index).serial,
        },
        { key: 'id', label: 'Consult ID', align: 'Left' },
        { key: 'petowner', label: 'PetOwner', align: 'Left', render: (row: any) => renderers(row).petowner },
        { key: 'Vetenerian', label: 'Vetenerian', align: 'Left', render: (row: any) => renderers(row).Vetenerian },
        { key: 'speciality', label: 'Service Type', align: 'Left', render: (row: any) => renderers(row).speciality },
        { key: 'DateTime', label: 'Date & Time', align: 'Left', render: (row: any) => renderers(row).DateTime },
        { key: 'status', label: 'Status', align: 'Left', render: (row: any) => renderers(row).status },
    ];

    const actions = [
        {
            label: 'View',
            color: '#00bcd4',
            icon: <IconEye size={20} />,
            onClick: (row: any) => handleListViewClick(row),
        },
        {
            label: 'Edit',
            color: '#4caf50',
            icon: <IconEdit size={20} />,
            onClick: (row: any) => handleEditClick(row),
        },
        {
            label: 'Cancel',
            color: '#f44336',
            icon: <IconCancel size={20} />,
            onClick: async (row: any) => {
                const confirmCancel = window.confirm('Are you sure you want to cancel this action?');
                if (confirmCancel) {
                    try {
                        const response = await apiClient<any>(`v1/resource/consults/${row.id}`, {
                            method: 'PUT',
                            body: {
                                id: row?.id,
                                status: 'cancelled',
                            },
                        });
                        console.log('Status updated:', response);
                        fetchAppointments();
                        // Optionally trigger a refresh or show a success message
                    } catch (error) {
                        console.error('Failed to update status:', error);
                        alert('Failed to cancel the appointment. Please try again.');
                    }
                } else {
                    console.log('Cancel aborted');
                }
            },
        }
,
        {
            label: 'Refund',
            color: '#e91e63',
            icon: <IconRefund size={20} />,
            onClick: (row: any) => handleRefundClick(row),
        },
    ];

    return (
        <DynamicTable
            columns={columns}
            data={appointments}
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
    );
};

export default ListView;
