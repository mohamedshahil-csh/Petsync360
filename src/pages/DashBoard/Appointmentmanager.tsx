import { JSX, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Calendar, DollarSign, List, Percent, Plus } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import Layout from '../../components/Layout';
import AppointmentEditDialog from '../Appointment/AppointmentEditDialog';
import ListView from '../Appointment/ListView';
import ChargeCodeComponent from '../Appointment/ChargeCodes';
import TaxCodeComponent from '../Appointment/Taxcode';

import apiClient from '../../services/apiClient';
import './CalendarStyles.css';
import LoadingScreen from '../../components/LoadingScreen';
import AddAppointment from '../Appointment/AddAppointment';

const AppointmentManagement = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<'view' | 'edit'>('view');
    const [isRescheduling, setIsRescheduling] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    type ViewType = 'list' | 'calendar' | 'charge' | 'tax' | 'add';

    const [viewType, setViewType] = useState<ViewType>('list');

    useEffect(() => {
        fetchAppointments();
    }, [currentPage, itemsPerPage]);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const params = {
                limit: itemsPerPage,
                page: currentPage,
                order_by: 'id',
                dir: 1,
            };
            const queryString = new URLSearchParams(params as any).toString();
            const response: any = await apiClient(`v1/resource/consults?${queryString}`, {
                method: 'GET',
            });
            setAppointments(response.data.consults);
            setTotalCount(response.data.pagination.total);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleEventClick = (info: any) => {
        setSelectedAppointment(info.event.extendedProps.appointmentDetails);
        setDialogMode('view');
        setDialogOpen(true);
    };

    const handleListViewClick = (appointment: any) => {
        setSelectedAppointment(appointment);
        setDialogMode('view');
        setDialogOpen(true);
    };

    const handleEditClick = (appointment: any) => {
        setSelectedAppointment(appointment);
        setDialogMode('edit');
        setDialogOpen(true);
    };


    const handleRefundClick = async (appointment: any) => {
        if (!appointment || appointment.consult_status?.name.toLowerCase() !== 'paid') {
            alert('Refund can only be triggered for paid appointments.');
            return;
        }

        try {
            await apiClient(`v1/resource/consults/${appointment.id}/refund`, { method: 'POST' });
            setAppointments((prev) =>
                prev.map((appt) =>
                    appt.id === appointment.id ? { ...appt, consult_status: { name: 'refunded' } } : appt
                )
            );
            alert('Refund processed successfully.');
        } catch (error) {
            console.error('Refund error:', error);
            alert('Failed to process refund.');
        }
    };

    const handleCancelAppointment = async (appointmentId: number, reason: string) => {
        try {
            await apiClient(`v1/resource/consults/${appointmentId}/cancel`, {
                method: 'POST',
            });
            setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
            setDialogOpen(false);
        } catch (error) {
            console.error('Cancel error:', error);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setCurrentPage(newPage + 1);
    };

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setItemsPerPage(newRowsPerPage);
        setPage(0);
        setCurrentPage(1);
    };

    const events = appointments.map((appointment: any) => ({
        id: appointment.id,
        title:
            appointment.participants
                .map((p: any) => p.participant_info?.name)
                .filter(Boolean)
                .join(', ') || 'Appointment',
        start: appointment.scheduled_at,
        end: new Date(new Date(appointment.scheduled_at).getTime() + 30 * 60000).toISOString(),
        extendedProps: { appointmentDetails: appointment },
    }));

    const viewButtons: { key: ViewType; label: string; icon: JSX.Element }[] = [
        { key: 'list', label: 'List View', icon: <List size={18} /> },
        { key: 'calendar', label: 'Calendar View', icon: <Calendar size={18} /> },
        { key: 'charge', label: 'Charge Code', icon: <DollarSign size={18} /> },
        { key: 'tax', label: 'Tax Code', icon: <Percent size={18} /> },
        { key: 'add', label: 'Add Appointment', icon: <Plus size={18} /> },
    ];

    if (loading) return <LoadingScreen message="Loading Appointments..." />;

    if (error) {
        return (
            <Layout>
                <Typography color="error">Error: {error}</Typography>
            </Layout>
        );
    }

    const viewHeadings: Record<typeof viewType, string> = {
        list: 'Patient List View',
        calendar: 'Appointment Calendar',
        charge: 'Charge Code',
        tax: 'Tax Code',
        add: 'Add Appointments'
    };

    const handleAppointmentSave = async (updatedData: any) => {
        console.log('Saving appointment with data:', updatedData);
        // fetchAppointments();
        // setDialogOpen(false);
    };

    return (
        <Layout>
            <Box p={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" px={4} mb={2}>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2' }}>
                        {viewHeadings[viewType]}
                    </Typography>

                    <Box display="flex" gap={2}>
                        {viewButtons.map(({ key, label, icon }) => (
                            <Button
                                key={key}
                                startIcon={icon}
                                variant={viewType === key ? 'contained' : 'outlined'}
                                onClick={() => setViewType(key)}
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: viewType === key ? 3 : 0,
                                    transition: 'all 0.3s ease',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    backgroundColor: viewType === key ? 'primary.main' : 'transparent',
                                    color: viewType === key ? 'white' : 'primary.main',
                                    '&:hover': {
                                        backgroundColor:
                                            viewType === key ? 'primary.dark' : 'rgba(0, 0, 0, 0.04)',
                                    },
                                }}
                            >
                                {label}
                            </Button>
                        ))}
                    </Box>
                </Box>


                {/* View Rendering */}
                {viewType === 'calendar' && (
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        buttonText={{
                            today: 'Today',
                            month: 'Month',
                            week: 'Week',
                            day: 'Day',
                        }}
                        selectable
                        editable
                        droppable
                        initialDate={new Date()}
                        events={events}
                        eventClick={handleEventClick}
                        dateClick={(info) => console.log('Date clicked:', info.dateStr)}
                        eventAdd={(info) => console.log('Event added:', info.event)}
                        eventChange={(info) => console.log('Event changed:', info.event)}
                        eventRemove={(info) => console.log('Event removed:', info.event)}
                        eventContent={(arg) => (
                            <>
                                <b>{arg.timeText}</b> <i>{arg.event.title}</i>
                            </>
                        )}
                    />
                )}

                {viewType === 'list' && (
                    <ListView
                        appointments={appointments}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        loading={loading}
                        error={error}
                        totalCount={totalCount}
                        handleListViewClick={handleListViewClick}
                        handleEditClick={handleEditClick}
                        handleRefundClick={handleRefundClick}
                        handlePageChange={handlePageChange}
                        handleRowsPerPageChange={handleRowsPerPageChange}
                        fetchAppointments={fetchAppointments}
                    />
                )}

                {viewType === 'charge' && <ChargeCodeComponent />}
                {viewType === 'tax' && <TaxCodeComponent />}
                {viewType === 'add' && <AddAppointment />}

                {dialogOpen && (
                    <AppointmentEditDialog
                        open={dialogOpen}
                        appointment={selectedAppointment}
                        mode={dialogMode}
                        editable={dialogMode === 'edit'}
                        onClose={() => setDialogOpen(false)}
                        onSave={handleAppointmentSave}
                        onCancelAppointment={(reason: string) =>
                            handleCancelAppointment(selectedAppointment?.id, reason)
                        }
                        isRescheduling={isRescheduling}
                    />
                )}
            </Box>
        </Layout>
    );
};

export default AppointmentManagement;
