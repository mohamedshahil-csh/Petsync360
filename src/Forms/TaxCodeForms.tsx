import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from "@mui/material";
import { X } from "lucide-react";
import DynamicForm from "../components/DynamicForms";
import { getTaxFormSchema } from "../components/DynamicForms/Chargecodes";
import apiClient from "../services/apiClient";

interface TaxCodeDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
}

const TaxCodeDialog: React.FC<TaxCodeDialogProps> = ({ open, onClose, onSuccess, initialData }) => {

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




    const handleFormSubmit = async (formData: Record<string, any>) => {
        try {
            console.log("Form submitted", formData);
            const payload: any = {
                code: formData?.code,
                name: formData?.name,
                type: formData?.type,
                rate: formData?.rate,
                status: Number(formData?.status),
            };

            if (initialData && initialData.id) {
                payload.id = initialData.id;
            }
            console.log("payload", payload);

            let response;
            if (initialData && initialData.id) {
                // PATCH existing resource
                response = await apiClient(`v1/resource/taxCodes/${initialData.id}`, {
                    method: "PUT",
                    body: payload,
                });
            } else {
                // POST new resource
                response = await apiClient("v1/resource/taxCodes", {
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



    const schema = getTaxFormSchema();

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
                Add Tax Code
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

export default TaxCodeDialog;
