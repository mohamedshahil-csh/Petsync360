import React, { SyntheticEvent, useState } from 'react';
import DynamicForm from '../../components/DynamicForms';
import { PetParentFormSchema } from '../../components/DynamicForms/PetParent';
import LoadingScreen from '../../components/LoadingScreen';
import { SnackbarCloseReason } from '@mui/material';
import CustomSnackbar from '../../components/CustomSnackbar';
import { useNavigate } from 'react-router-dom';


type Option = {
    label: string;
    value: string;
    first_name?: string;
    last_name?: string;
};

const ParentRegistration: React.FC = () => {
    const [providerOptions] = useState<Option[]>([]);
    const navigate = useNavigate();
    const [parentOptions] = useState<Option[]>([]);
    const [petOptions] = useState<Option[]>([]);
    const [chargecodeOptions] = useState<Option[]>([]);
    const [slotOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info' as 'success' | 'error' | 'info' | 'warning',
    });

    const API_KEY = 'bXaljR3Sd1Jy4oG0QGOiLRwIEpCzR13r';

    const handleCloseSnackbar = (
        _event: Event | SyntheticEvent<any, Event>,
        reason?: SnackbarCloseReason
    ) => {
        if (reason !== 'clickaway') {
            setSnackbar((prev) => ({ ...prev, open: false }));
        }
    };

    const handleFormSubmit = async (formData: any) => {
        setLoading(true);
        setSnackbar({ ...snackbar, open: false });

        const payload = {
            user: {
                first_name: formData.firstName,
                last_name: formData.lastname,
                email: formData.email,
                username: formData.userName,
                password: formData.password,
                role: 'parent',
                mobile: formData.mobilenumber,
                gender: formData.gender || undefined,
                is_active: formData.status === 'Active',
                is_2fa: 0,
                timezone_id: formData.timezone || 1,
                address: {
                    address1: formData.address1 || undefined,
                    address2: formData.address2 || undefined,
                    city: formData.city || undefined,
                    state: formData.state || undefined,
                    country: formData.country || undefined,
                    zipcode: formData.zipcode || undefined,
                },
            },
        };

        console.log('Final Payload:', payload);

        try {
            const response = await fetch('/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const responseData = await response.json();
            console.log('Registration successful:', responseData);

            setSnackbar({
                open: true,
                message: 'Registration successful!',
                severity: 'success',
            });
            navigate('/');

        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error?.message || 'Error while registering',
                severity: 'error',
            });
            console.error('Error while registering:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const schema = PetParentFormSchema(
        providerOptions,
        chargecodeOptions,
        slotOptions,
        parentOptions,
        petOptions
    );

    if (loading) return <LoadingScreen message="Loading..." />;

    return (
        <>
            <DynamicForm schema={schema} onSubmit={handleFormSubmit} />
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </>
    );
};

export default ParentRegistration;
