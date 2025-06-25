import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from "@mui/material";
import { X } from "lucide-react";
import DynamicForm from "../components/DynamicForms";
import { getChargeFormSchema } from "../components/DynamicForms/Chargecodes";
import apiClient from "../services/apiClient";

interface ChargeCodeDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
}

const ChargeCodeDialog: React.FC<ChargeCodeDialogProps> = ({ open, onClose, onSuccess, initialData }) => {

    const [taxCodeOptions, setTaxCodeOptions] = useState<{ label: string; value: string }[]>([]);
    const [providerOptions, setproviderOptions] = useState<{ label: string; value: string }[]>([]);

    const transformedInitialData = initialData
        ? {
            ...initialData,
            tax_codes: Array.isArray(initialData.tax_codes)
                ? initialData.tax_codes
                : JSON.parse(initialData.tax_codes || "[]"),
        }
        : undefined;

    useEffect(() => {
        if (initialData) {
            console.log('Initial data received in dialog:', transformedInitialData);
        }
    }, [initialData]);

    useEffect(() => {
        async function fetchTaxCodes() {
            try {
                const response = await apiClient(`v1/resource/taxCodes`, { method: "GET" }) as any;
                const data = response.data;
                console.log('data', data.code);
                if (Array.isArray(data.tax_codes)) {
                    const options = data.tax_codes.map((item: any) => ({
                        label: `${item.code}-${item.name}-${item.type === 'adhoc' ? `₹${item.rate}` : `${item.rate}%`}-${item.type}`,
                        value: JSON.stringify({ code: item.code, name: item.name, rate: item.rate, type: item.type }),
                    }));

                    console.log('options', options);
                    setTaxCodeOptions(options);
                }
            } catch (err) {
                console.error("Error fetching tax codes:", err);
            }
        }
        async function fetchProviders() {
            try {
                const response = await apiClient(`v1/resource/providers`, { method: "GET" }) as any;
                const data = response.data;
                console.log('data', data.code);
                if (Array.isArray(data.providers)) {
                    const options = data.providers.map((item: any) => ({
                        label: `${item?.user?.first_name}-${item?.user?.last_name}`,
                        value: `${item.id}`,
                    }));
                    console.log('options', options);
                    setproviderOptions(options);
                }
            } catch (err) {
                console.error("Error fetching tax codes:", err);
            }
        }
        if (open) {
            fetchTaxCodes();
            fetchProviders();
        }
    }, [open]);


    const handleFormSubmit = async (formData: Record<string, any>) => {
        try {
            console.log("Form submitted", formData);
            const cleanedTaxCodes = formData.tax_codes.map((tax: any) =>
                typeof tax === "string" ? JSON.parse(tax) : tax
            );
            const payload: any = {
                charge_code: formData?.charge_code,
                service_name: formData?.service_name,
                amount: formData?.amount,
                service_type: formData?.service_type,
                tax_codes: JSON.stringify(cleanedTaxCodes),
                provider_id: formData?.provider_id,
            };

            if (initialData && initialData.id) {
                payload.id = initialData.id;
            }
            console.log("payload", payload);

            let response;
            if (initialData && initialData.id) {
                // PATCH existing resource
                response = await apiClient(`v1/resource/ChargeCodes/${initialData.id}`, {
                    method: "PUT",
                    body: payload,
                });
            } else {
                // POST new resource
                response = await apiClient("v1/resource/ChargeCodes", {
                    method: "POST",
                    body: payload,
                });
            }

            console.log("API response:", response);
            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("Error submitting form:", error);
            if (error.response) {
                console.error("API Response Error:", {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers,
                });
            } else if (error.request) {
                console.error("Network Error: No response received from server", error.request);
            } else {
                console.error("Unexpected Error:", error);
            }
        }
    };



    const schema = getChargeFormSchema(taxCodeOptions, providerOptions);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" sx={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
        }}>
            <DialogTitle
                sx={{
                    m: 0,
                    px: 3,
                    py: 2,
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                Add Charge Code
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: 'primary.contrastText',
                    }}
                >
                    <X size={20} />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <DynamicForm schema={schema} onSubmit={handleFormSubmit} initialValues={transformedInitialData} />
            </DialogContent>
        </Dialog>
    );
};

export default ChargeCodeDialog;
