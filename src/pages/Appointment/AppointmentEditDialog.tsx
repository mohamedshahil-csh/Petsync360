import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Divider,
    Box,
    Chip,
    Paper,
    IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import apiClient from '../../services/apiClient';
import DynamicForm from '../../components/DynamicForms';
import { getAppointmentFormSchema } from '../../components/DynamicForms/Chargecodes';

const statusColors: Record<string, any> = {
    NEW: 'secondary',
    STARTED: 'primary',
    WAITING: 'info',
    ENDED: 'default',
    FAILED: 'error',
    CANCELLED: 'error',
    EXPIRED: 'warning',
    UNPAID: 'warning',
    PAID: 'success',
    PENDING: 'warning',
    ACCEPTED: 'success',
    CREATED: 'info',
    COMPLETED: 'success',
    'VET ACCEPTED': 'success',
    'PAYMENT PENDING': 'warning',
    CONFIRMED: 'success',
    'LINK READY': 'info',
    'VET JOINED': 'info',
    'JOINED (YOU)': 'info',
    INPROGRESS: 'info',
    'CANCELLED (VET)': 'error',
    'CANCELLED (YOU)': 'error',
    'RESCHEDULE REQUESTED': 'warning',
    RESCHEDULED: 'info',
    'RESCHEDULE REJECTED': 'error',
    'NO SHOW (YOU)': 'error',
    'NO SHOW (VET)': 'error',
    'REFUND PENDING': 'warning',
    REFUNDED: 'success',
    'REFUND FAILED': 'error',
    'REFUND INITIATED': 'info',
};

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
        flexWrap: 'wrap' as const,
    },
    label: {
        fontWeight: 700,
        color: 'primary.dark',
        mr: 2,
        minWidth: 120,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    value: {
        fontWeight: 600,
        flexGrow: 1,
        minWidth: 100,
        color: 'text.primary',
    },
    participantPaper: {
        p: 2,
        mb: 2,
        borderRadius: 3,
        borderColor: '#2196f3',
        boxShadow: '0 1px 8px rgba(33, 150, 243, 0.2)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': { boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)' },
    },
};

const fetchVets = async (setVets: any, setLoading: any) => {
    setLoading(true);
    try {
        const params: any = {
            limit: 100,
            page: 1,
            searchkey: '',
            order_by: 'id',
            dir: 2,
            type: 'all',
            from: '',
            to: '',
        };
        const queryString = new URLSearchParams(params).toString();
        const { data } = await apiClient(`v1/resource/providers?${queryString}`, { method: 'GET' }) as any;

        if (Array.isArray(data.providers)) {
            const options = data.providers.map((item: any) => ({
                label: `${item?.user?.first_name} ${item?.user?.last_name}`,
                value: `${item?.user?.first_name} ${item?.user?.last_name}`,
            }));
            setVets(options);
        }
    } catch (error) {
        console.error('Error fetching vets:', error);
    } finally {
        setLoading(false);
    }
};

const renderInfoRow = (label: string, value: any) => (
    <Box sx={styles.row} key={label + value}>
        <Typography sx={styles.label}>{label}</Typography>
        <Typography sx={styles.value}>{value ?? '—'}</Typography>
    </Box>
);

const AppointmentEditDialog = ({
    open,
    appointment,
    onClose,
    onSave,
    editable = true,
}: any) => {
    const [vetName, setVetName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState('');
    const [cancelReason, setCancelReason] = useState('');
    const [rescheduleDate, setRescheduleDate] = useState('');
    const [rescheduleTime, setRescheduleTime] = useState('');

    const [vets, setVets] = useState<any[]>([]);
    const [loadingVets, setLoadingVets] = useState(false);

    useEffect(() => {
        fetchVets(setVets, setLoadingVets);
    }, []);

    console.log('appointments', appointment);

    useEffect(() => {
        if (!appointment) return;

        console.log('appointments', appointment);
        const publisher = appointment.participants?.find((p: any) => p.role === 'publisher');
        setVetName(publisher?.participant_info?.name || appointment.vetName || '');
        setDate(appointment.created_at ? appointment.created_at.slice(0, 10) : '');
        setTime(appointment.created_at ? appointment.created_at.slice(11, 16) : '');
        setStatus(appointment.consult_current_status?.slug || '');
        setCancelReason(appointment.reason || '');
        setRescheduleDate(appointment.rescheduleDate || '');
        setRescheduleTime(appointment.rescheduleTime || '');
    }, [appointment]);

    if (loadingVets) return <Typography>Loading veterinarians...</Typography>;

    const initialProviderName = vetName;
    const initialStatus = appointment?.consult_current_status?.slug?.toUpperCase() || '';
    const initialChargeDateTime = appointment?.scheduled_at || '';

    console.log('initialchargedate',initialChargeDateTime);

    const handleSaveClick = (formData: any) => {

        onSave(formData);
    };
    const schema = getAppointmentFormSchema(vets);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: 3 } }}>
            <DialogTitle
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    fontWeight: 'bold',
                    position: 'relative',
                    fontSize: '1rem',
                    letterSpacing: 1,
                    textShadow: 'none',
                }}
            >
                {editable ? 'Edit Appointment' : 'Appointment Details'}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: '#000000', '&:hover': { color: '#000000' } }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                {editable ? (
                    <>
                    <DynamicForm
                        schema={schema}
                        onSubmit={handleSaveClick}
                        initialValues={{
                            provider_id: initialProviderName,
                            status: initialStatus,
                            charge_datetime: initialChargeDateTime,
                        }}
                    />
                    </>
                ) : (
                    appointment && (
                        <>
                            <Box mb={2}>
                                <Chip
                                    label={appointment.consult_current_status?.name || 'Unknown'}
                                    color={statusColors[status] || 'default'}
                                    variant="filled"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 'bold',
                                        boxShadow: '0 0 8px rgba(0,0,0,0.1)',
                                        fontSize: '1rem',
                                        textTransform: 'uppercase',
                                    }}
                                />
                                <Divider sx={{ mb: 2, borderColor: '#90caf9' }} />
                            </Box>

                            {[
                                ['Consult Code', appointment.consult_code],
                                ['Consult Type', appointment.consult_type],
                                ['Scheduled At', appointment.scheduled_at],
                                ['Consult Status', appointment.consult_current_status?.name],
                                ['Reason', appointment.reason],
                                ['Created At', appointment.created_at],
                                ['Virtual Provider', appointment.virtual_service_provider?.name],
                                ...(appointment.payment?.name ? [['Payment Name', appointment.payment.name]] : []),
                                ...(appointment.payment?.price !== undefined ? [['Payment Price', `₹${appointment.payment.price}`]] : []),
                            ].map(([label, value]) => renderInfoRow(label, value))}

                            <Divider sx={{ my: 3, borderColor: '#bbdefb' }} />
                            <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                                Participants
                            </Typography>

                            {appointment.participants?.length ? (
                                appointment.participants.map((p: any) => (
                                    <Paper key={p.id} variant="outlined" sx={styles.participantPaper}>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                            {[
                                                ['Name', p.participant_info?.name],
                                                ['Email', p.participant_info?.email],
                                                ['Phone', p.participant_info?.phone],
                                                ['Gender', p.participant_info?.gender],
                                                ['Role', p.role],
                                                ['Status', p.participant_status?.name],
                                                ['Ref No.', p.ref_number],
                                            ].map(([label, value]) => (
                                                <Box key={label} sx={{ flex: '1 1 45%' }}>
                                                    {renderInfoRow(label, value)}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Paper>
                                ))
                            ) : (
                                <Typography color="text.secondary">No participants found</Typography>
                            )}

                            {rescheduleDate && renderInfoRow('Reschedule Date', rescheduleDate)}
                            {rescheduleTime && renderInfoRow('Reschedule Time', rescheduleTime)}
                            {cancelReason && renderInfoRow('Cancel Reason', cancelReason)}
                        </>
                    )
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AppointmentEditDialog;
