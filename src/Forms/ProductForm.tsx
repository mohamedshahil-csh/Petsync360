import React, { useEffect, useState } from "react";
import DynamicForm from "../components/DynamicForms";

import Layout from "../components/Layout";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { productFormSchema } from "../components/DynamicForms/Products";
import { getProductDetails, getProductVariations } from "../services/woocommerce";


const ProductForm: React.FC = () => {
    const { productId } = useParams<any>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [variations, setVariations] = useState<any[]>([]);
    const [selectedVariation, setSelectedVariation] = useState<any | null>(null);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await getProductDetails(Number(productId));
            const data = response.data || null;
            setProduct(data);
            setSelectedImage(data?.images?.[0]?.src || null);
            setError(null);

            if (data?.type === 'variable') {
                const variationRes = await getProductVariations(Number(productId));
                setVariations(variationRes.data || []);
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch product");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);


    const handleFormSubmit = async (data: Record<string, any>) => {
        console.log("Form Data", data);
    }

    return (
        <Layout>
            <DynamicForm schema={productFormSchema}  onSubmit={handleFormSubmit} />
        </Layout>
    );
};

export default ProductForm;
