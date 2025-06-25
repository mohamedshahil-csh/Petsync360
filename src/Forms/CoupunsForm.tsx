import React from "react";
import DynamicForm from "../components/DynamicForms";
import { CouponFormSchema } from "../components/DynamicForms/Coupons";
import Layout from "../components/Layout";
import axios from "axios"; // Make sure axios is imported
import { createCoupon } from "../services/woocommerce";
import { useNavigate } from "react-router-dom";


const CouponForm: React.FC = () => {
    const navigate = useNavigate();
    const handleFormSubmit = async (data: Record<string, any>) => {
        try {
            const couponData = {
                code: data.code,
                discount_type: data.discount_type,
                amount: data.amount,
                individual_use: data.individual_use,
                exclude_sale_items: data.exclude_sale_items,
                description: data.description,
                usage_limit: data.usage_limit ? parseInt(data.usage_limit) : undefined,
                usage_limit_per_user: data.usage_limit_per_user
                    ? parseInt(data.usage_limit_per_user)
                    : undefined,
                limit_usage_to_x_items: data.limit_usage_to_x_items
                    ? parseInt(data.limit_usage_to_x_items)
                    : undefined,
                date_expires: data.date_expires || undefined,
                status: data.status || "publish",
                minimum_amount:
                    data.minimum_amount && !isNaN(Number(data.minimum_amount))
                        ? String(data.minimum_amount)
                        : undefined,

                maximum_amount:
                    data.maximum_amount && !isNaN(Number(data.maximum_amount))
                        ? String(data.maximum_amount)
                        : undefined,

                product_ids: Array.from({ length: 101 }, (_, i) => 5500 + i).join(","),
                excluded_product_ids: data.excluded_product_ids || "",
                product_categories: data.product_categories || "",
                excluded_product_categories: data.excluded_product_categories || "",
                email_restrictions: data.email_restrictions || "",
                free_shipping: data.free_shipping,
            };

            console.log("Payload", couponData);

            const response = await createCoupon(couponData);
            navigate(-1)

            // Optionally refetch coupons or reset form
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                alert("Failed to create coupon: " + (error.response?.data?.message || error.message));
            } else if (error instanceof Error) {
                alert("Failed to create coupon: " + error.message);
            } else {
                alert("Failed to create coupon: Unknown error");
            }
        }
    };

    return (
        <Layout>
            <DynamicForm schema={CouponFormSchema} onSubmit={handleFormSubmit} />
        </Layout>
    );
};

export default CouponForm;
