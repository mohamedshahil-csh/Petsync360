import { useParams, useNavigate } from "react-router-dom";  // <-- import useNavigate
import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";
import { getProductDetails, getProductVariations } from "../../../services/woocommerce";

const ProductView = () => {
    const { productId } = useParams<any>();
    const navigate = useNavigate();  // <-- create navigate function

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

    const displayPrice = (product: any, selectedVariation: any): string => {
        if (product.type === "variable") {
            if (selectedVariation && selectedVariation.price) {
                return `₹${selectedVariation.price}`;
            }
            return "Select a variation";
        } else if (product.type === "simple") {
            return product.price ? `₹${product.price}` : "Price not available";
        }
        return "Unknown product type";
    };


    if (loading) return <Layout><p className="text-center text-gray-500">Loading product details...</p></Layout>;
    if (error) return <Layout><p className="text-red-600 text-center">{error}</p></Layout>;
    if (!product) return <Layout><p className="text-center text-gray-500">No product data found.</p></Layout>;

    return (
        <Layout>
            {/* Back Button */}
            <div className="flex justify-start my-4 ml-4">
                <button
                    onClick={() => navigate(-1)}
                    className="
      px-5 py-2 
      bg-gradient-to-r from-blue-400 to-indigo-600 
      text-white font-semibold rounded-lg 
      shadow-md 
      hover:from-blue-500 hover:to-indigo-700 
      transition-colors duration-300
      focus:outline-none focus:ring-2 focus:ring-indigo-400
      flex items-center gap-2
    "
                >
                    ← Back
                </button>
            </div>


            <div className="m mx-auto  bg-white shadow-2xl rounded-2xl p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Left: Big Image + Thumbnails */}
                    <div className="space-y-4">
                        <div className="border rounded-xl overflow-hidden shadow-md">
                            {selectedImage && (
                                <img
                                    src={selectedImage}
                                    alt="Selected Product"
                                    className="w-full h-[400px] object-contain bg-gray-100"
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            {product.images?.map((img: any) => (
                                <img
                                    key={img.id}
                                    src={img.src}
                                    alt={img.alt || product.name}
                                    onClick={() => setSelectedImage(img.src)}
                                    className={`h-20 w-full object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${selectedImage === img.src ? "border-blue-500" : "border-gray-200"}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

                        <div className="flex items-center gap-4">
                            {product.average_rating && (
                                <p className="text-yellow-500 font-semibold text-lg">
                                    ★ {product.average_rating} / 5
                                </p>
                            )}
                            <span className={`text-sm font-semibold ${product.stock_status === 'instock' ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        {/* Variation Selector */}
                        {product.type === 'variable' && (
                            <div className="space-y-2">
                                <label className="font-semibold text-gray-800">Select a Variation:</label>
                                <select
                                    onChange={(e) =>
                                        setSelectedVariation(
                                            variations.find((v: any) => v.id === Number(e.target.value))
                                        )
                                    }
                                    className="w-full border rounded px-4 py-2"
                                >
                                    <option value="">-- Select --</option>
                                    {variations.map((variation: any) => (
                                        <option key={variation.id} value={variation.id}>
                                            {variation.attributes.map((attr: any) => attr.option).join(" / ")} - ₹{variation.price}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-xl inline-block">
                            <span>{displayPrice(product, selectedVariation)}</span>
                        </div>


                        {product.short_description && (
                            <div
                                className="text-gray-700 text-base leading-relaxed border-l-4 border-blue-500 pl-4"
                                dangerouslySetInnerHTML={{ __html: product.short_description }}
                            />
                        )}

                        <div className="text-sm text-gray-600 space-y-1 pt-4">
                            {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
                            {product.categories?.length > 0 && (
                                <p><strong>Categories:</strong> {product.categories.map((c: any) => c.name).join(", ")}</p>
                            )}
                            <p><strong>Type:</strong> {product.type}</p>
                            <p><strong>Status:</strong> {product.status}</p>
                            <p><strong>On Sale:</strong> {product.on_sale ? "Yes" : "No"}</p>
                            {product.store && (
                                <p><strong>Store:</strong> {product.store.vendor_shop_name || product.store.vendor_display_name}</p>
                            )}
                        </div>

                        {product.description && (
                            <div className="pt-6 prose max-w-none">
                                <h2 className="text-xl font-semibold">Product Description</h2>
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductView;
