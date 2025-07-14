import React, { SyntheticEvent, useEffect, useState } from 'react';
import DynamicForm from '../../components/DynamicForms';
import { AppointmentFormSchema } from '../../components/DynamicForms/Appointments';
import apiClient from '../../services/apiClient';
import LoadingScreen from '../../components/LoadingScreen';
import { SnackbarCloseReason } from '@mui/material';
import CustomSnackbar from '../../components/CustomSnackbar';
import { useNavigate } from 'react-router-dom';   

type Option = { label: string; value: string; first_name?: string; last_name?: string };

const AddAppointment: React.FC = () => {
    const navigate = useNavigate();                
    const [providerOptions, setProviderOptions] = useState<Option[]>([]);
    const [parentOptions, setParentOptions] = useState<Option[]>([]);
    const [petOptions, setPetOptions] = useState<Option[]>([]);
    const [chargecodeOptions, setChargecodeOptions] = useState<Option[]>([]);
    const [slotOptions, setSlotOptions] = useState<Option[]>([]);
    const [selectedProviderUserId, setSelectedProviderUserId] = useState<string | null>(null);
    const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
    const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info' as 'success' | 'error' | 'info' | 'warning',
    });
    const handleCloseSnackbar = (
        _event: Event | SyntheticEvent<any, Event>,
        reason?: SnackbarCloseReason
    ) => {
        if (reason !== 'clickaway') {
            setSnackbar((prev) => ({ ...prev, open: false }));
        }
    };

    const fetchOptions = async (
        url: string,
        key: 'providers' | 'patients' | 'users',
        labelFn: (item: any) => string,
        setter: React.Dispatch<React.SetStateAction<Option[]>>,
        valueFn?: (item: any) => string
    ) => {
        try {
            console.log('Fetching URL:', url);
            const response = await apiClient(url, { method: 'GET' }) as any;
            const data = response.data;
            console.log(`Raw response data for ${key}:`, data);

            let items = key === 'users' ? data.users : data[key];
            // Handle single patient object for patients endpoint
            if (key === 'patients' && !Array.isArray(items)) {
                items = [data.patients].filter(Boolean); // Convert single object to array
            }
            console.log(`Items for ${key}:`, items);

            if (Array.isArray(items)) {
                const options = items.map((item: any) => {
                    console.log('Item:', item);
                    const label = labelFn(item);
                    console.log('Generated label:', label);

                    if (key === 'providers') {
                        const userId = item?.user?.id;
                        const itemId = item?.id;
                        return {
                            label,
                            value: `${userId}|${itemId}|${label}`,
                        };
                    } else if (key === 'patients' || key === 'users') {
                        const value = valueFn ? valueFn(item) : `${item?.id}|${item?.first_name} ${item?.last_name}`;
                        console.log('Generated value:', value);
                        return {
                            label,
                            value,
                            first_name: item?.first_name || item?.user?.first_name,
                            last_name: item?.last_name || item?.user?.last_name,
                        };
                    }
                    return { label, value: item.id };
                });
                console.log(`Options for ${key}:`, options);
                setter(options);
            } else {
                console.log(`No valid items array for ${key}`);
                setter([]);
            }
        } catch (err) {
            console.error(`Error fetching ${key}:`, err);
            setSnackbar({
                open: true,
                message: `Error fetching ${key}`,
                severity: 'error',
            });
            setter([]);
        }
    };

    useEffect(() => {
        console.log('Updated parentOptions:', parentOptions);
    }, [parentOptions]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await apiClient('v1/users/info', { method: 'GET' }) as any;
                const userData = response.data;
                console.log('UserInfoData:', userData);
                const patientId = userData?.patient_id;
                console.log('patientId:', patientId);

                // Fetch providers
                await fetchOptions(
                    'v1/resource/providers/all',
                    'providers',
                    (item) => `${item?.user?.first_name} ${item?.user?.last_name}`,
                    setProviderOptions
                );

                // Fetch patient data if patientId exists
                if (patientId) {
                    await fetchOptions(
                        `v1/resource/patients/${patientId}`,
                        'patients',
                        (item) => `${item?.user?.first_name} ${item?.user?.last_name}`,
                        setParentOptions,
                        (item) => `${item?.id}|${item?.user?.first_name} ${item?.user?.last_name}`
                    );
                    // Set selectedParentId to the fetched patient
                    const patientOption = parentOptions.find((opt) => opt.value.startsWith(`${patientId}|`));
                    if (patientOption) {
                        setSelectedParentId(patientOption.value);
                    }
                } else {
                    console.log('No patientId found, skipping patients fetch');
                    setParentOptions([]);
                }
            } catch (err) {
                console.error('Error fetching user info:', err);
                setSnackbar({
                    open: true,
                    message: 'Error fetching user info',
                    severity: 'error',
                });
            }
        };

        fetchUserInfo();
    }, []); // Removed duplicate useEffect

    useEffect(() => {
        if (!selectedParentId) {
            setPetOptions([]);
            return;
        }

        async function fetchPets() {
            try {
                const response = await apiClient(
                    `v1/resource/pets?primary_id=${selectedParentId}`,
                    { method: 'GET' }
                ) as any;
                const data = response.data;

                if (Array.isArray(data.pets)) {
                    const options = data.pets.map((pet: any) => {
                        const info = pet.additional_info || {};
                        const name = info.name || 'Unnamed';
                        return {
                            label: `${name}`,
                            value: String(pet.id),
                        };
                    });
                    setPetOptions(options);
                }
            } catch (err) {
                console.error('Error fetching pets:', err);
                setSnackbar({
                    open: true,
                    message: 'Error fetching pets',
                    severity: 'error',
                });
            }
        }

        fetchPets();
    }, [selectedParentId]);

    useEffect(() => {
        if (!selectedProviderId || !selectedDate || !selectedType) return;

        async function fetchSlotTime() {
            try {
                const response = await apiClient(
                    `v1/users/getSlots?provider_id=${selectedProviderId}&date=${selectedDate}&interval=30&visit_type=${selectedType}`,
                    { method: 'GET' }
                ) as any;
                const data = response.data ?? response;

                if (Array.isArray(data.slots)) {
const now = new Date();
const selected = new Date(selectedDate!);

const availableSlots = data.slots.filter((slot: any) => {
    const slotTime = new Date(`${selectedDate}T${slot.start}`);
    const isToday = selected.toDateString() === now.toDateString();

    return slot.available && !slot.booked && (!isToday || slotTime > now);
});
                    const options = availableSlots.map((slot: any) => ({
                        label: slot.slot,
                        value: slot.start,
                    }));
                    setSlotOptions(options);
                }
            } catch (err) {
                console.error('Error fetching slots:', err);
                setSnackbar({
                    open: true,
                    message: 'Error fetching slots',
                    severity: 'error',
                });
            }
        }

        fetchSlotTime();
    }, [selectedProviderId, selectedDate, selectedType]);

    useEffect(() => {
        if (!selectedProviderId) return;

        async function fetchChargeCodes() {
            try {
                const response = await apiClient(
                    `v1/resource/chargeCodes?provider_id=${selectedProviderId}&service_type=${selectedType}`,
                    { method: 'GET' }
                ) as any;
                const data = response.data;
                if (Array.isArray(data.charge_codes)) {
                    const options = data.charge_codes.map((item: any) => ({
                        label: `${item.charge_code}-${item.service_name}-${item.service_type}-${item.amount}`,
                        value: item.id,
                    }));
                    setChargecodeOptions(options);
                }
            } catch (err) {
                console.error('Error fetching charge codes:', err);
                setSnackbar({
                    open: true,
                    message: 'Error fetching charge codes',
                    severity: 'error',
                });
            }
        }

        fetchChargeCodes();
    }, [selectedProviderId, selectedType]);

    const handleSearchInput = async (fieldName: string, searchKey: string) => {
        if (!searchKey) return;

        if (fieldName === 'veterinarianName') {
            await fetchOptions(
                `v1/resource/providers?searchkey=${searchKey}`,
                'providers',
                (item) => `${item?.user?.first_name}-${item?.user?.last_name}`,
                setProviderOptions
            );
        }

        if (fieldName === 'petParent') {
            await fetchOptions(
                `v1/resource/patients?searchkey=${searchKey}`,
                'patients',
                (item) => `${item?.user?.first_name}-${item?.user?.last_name}`,
                setParentOptions
            );
            await fetchOptions(
                `v1/users/info?searchkey=${searchKey}`,
                'users',
                (item) => `${item?.first_name}-${item?.last_name}`,
                setParentOptions,
                (item) => `${item?.id}|${item?.first_name}-${item?.last_name}`
            );
        }
    };

    const handleFieldChange = (data: { fieldName: string; value: string }) => {
        const { fieldName, value } = data;

        if (fieldName === 'date') {
            setSelectedDate(value);
        } else if (fieldName === 'veterinarianName') {
            const [userId, providerId] = value.split('|');
            setSelectedProviderUserId(userId);
            setSelectedProviderId(providerId);
        } else if (fieldName === 'type') {
            setSelectedType(value);
        } else if (fieldName === 'petParent') {
            setSelectedParentId(value.split('|')[0]);
        }
    };

    const handleFormSubmit = async (formData: any) => {
        setLoading(true);
        setSnackbar({ ...snackbar, open: false });
        const providerId = formData?.veterinarianName;
        const parentId = formData?.petParent;
        const petId = formData?.pet;
        const chargeCodeId = formData?.chargeCode;
        const providerName = providerOptions.find((opt) => opt.value === providerId)?.label || '';
        const parentName = parentOptions.find((opt) => opt.value === parentId)?.label || '';
        const petName = petOptions.find((opt) => opt.value === petId)?.label || '';
        const amount = parseFloat(
            chargecodeOptions.find((opt) => opt.value === chargeCodeId)?.label?.split('-')?.[3]?.trim() || '0'
        );

        const payload = {
            charge_code_id: parseInt(chargeCodeId),
            consult_date_time: `${formData?.date} ${formData?.slotTime}:00`,
            consult_doctor: providerName,
            consult_type: formData?.type,
            patient_id: parseInt(parentId.split('|')[0]),
            patient_name: petName,
            reason_for_consult: formData?.consultReason,
            payment: {
                amount: amount,
            },
            provider_id: parseInt(providerId.split('|')[1]),
        };

        console.log('Final Payload:', payload);
        try {
            const response = await apiClient<any>('/v1/resource/consults', {
                method: 'POST',
                body: payload,
            });
            setSnackbar({ open: true, message: 'Appointment booked successfully!', severity: 'success' });
            console.log('Appointment booked successfully:', response);
            navigate('/', { replace: true });
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error?.message || 'Error booking appointment',
                severity: 'error',
            });
            console.error('Error booking appointment:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const schema = AppointmentFormSchema(providerOptions, chargecodeOptions, slotOptions, parentOptions, petOptions);
    if (loading) return <LoadingScreen message="Loading Appointments..." />;
    return (
        <>
            <DynamicForm
                schema={schema}
                onSubmit={handleFormSubmit}
                onSelect={handleFieldChange}
                onSearchInput={handleSearchInput}
            />
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </>
    );
};

export default AddAppointment;