import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import { Edit2, Eye, Trash } from 'lucide-react';


import { getProducts, getProductCategories } from '../../../services/woocommerce';
import Filters from '../../../components/Filters';
import DynamicTable from '../../../components/Table/DataTable';
import TablePaginationActions from '../../../components/Table/tablePagination';
import { IconEdit, IconEye, IconTrash } from '../../../components/icons/icons';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    // Fetch categories once
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response: any = await getProductCategories();
                setCategories(response.data);
            } catch {
                setCategories([]);
            }
        }
        fetchCategories();
    }, []);
    console.log('categories', categories);
    console.log('page', page);
    // Fetch products on filters or pagination change
    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                setError('');

                const params: any = {
                    page: page + 1,
                    per_page: rowsPerPage,
                };
                console.log('params', params);
                if (searchTerm.trim()) params.search = searchTerm.trim();
                if (selectedCategory) params.category = selectedCategory;

                const response: any = await getProducts(params);
                setProducts(response.data);
                setTotalCount(Number(response.headers['x-wp-total'] ?? 0));
            } catch (err: any) {
                setError(err.message || 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [page, rowsPerPage, searchTerm, selectedCategory]);

    const handleSearchTermChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    };

    const handleSelectedCategoryChange = (newCategory: string) => {
        setSelectedCategory(newCategory);
    };
    useEffect(() => {
        setPage(0);
    }, [searchTerm, selectedCategory]);
    const filters = [
        {
            type: 'search' as const,
            label: 'Search Products',
            value: searchTerm,
            onChange: handleSearchTermChange,
        },
        {
            type: 'select' as const,
            label: 'Category',
            value: selectedCategory,
            onChange: handleSelectedCategoryChange,
            options: categories.map((cat: any) => ({ value: String(cat.id), label: cat.name })),
        },
    ];


    const renderers = (row: any, index?: number) => ({
        serial: page * rowsPerPage + (index ?? 0) + 1,

        image:
            row.images && row.images.length > 0 ? (
                <img
                    src={row.images[0].src}
                    alt={row.name}
                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                />
            ) : (
                <Typography variant="caption" color="textSecondary">
                    No Image
                </Typography>
            ),

        price: `$${row.price}`,

        stockQuantity: row.stock_quantity ?? 'N/A',

        categories: row.categories?.map((c: any) => c.name).join(', ') || '-',

        store: row.store?.formatted_display_name || '-',
    });

    const columns = [
        {
            key: 'serial',
            label: 'S.No',
            align: 'center',
            render: (_row: any, index: number) => renderers(_row, index).serial,
        },
        { key: 'id', label: 'ID', align: 'center' },
        {
            key: 'images',
            label: 'Image',
            align: 'center',
            render: (row: any) => renderers(row).image,
        },
        { key: 'name', label: 'Name', align: 'left' },
        {
            key: 'price',
            label: 'Price',
            align: 'right',
            render: (row: any) => renderers(row).price,
        },
        {
            key: 'stock_quantity',
            label: 'Stock',
            align: 'center',
            render: (row: any) => renderers(row).stockQuantity,
        },
        {
            key: 'categories',
            label: 'Categories',
            align: 'left',
            render: (row: any) => renderers(row).categories,
        },
        {
            key: 'store',
            label: 'Store',
            align: 'left',
            render: (row: any) => renderers(row).store,
        },
    ];


    const actions = [
        {
            label: 'View',
            color: '#00bcd4',
            icon: <IconEye size={20} />,
            onClick: (row: any) => navigate(`/products/view/${row.id}`),
        },
        {
            label: 'Edit',
            color: '#4caf50',
            icon: <IconEdit size={20} />,
            onClick: (row: any) => navigate(`/editproducts/${row.id}`),
        },
        {
            label: 'Delete',
            color: '#f44336',
            icon: <IconTrash size={20} />,
            onClick: (row: any) => alert(`Delete product ${row.id}`),
        },
    ];

    const handlePageChange = (newPage: number) => setPage(newPage);

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };


    return (
        <Layout>
            <div className='p-4'>

                <div className="flex items-center space-x-4">


                    <Filters filters={filters} />
                </div>


                {loading ? (
                    <Box display="flex" justifyContent="center" my={5}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error" align="center" my={3}>
                        {error}
                    </Typography>
                ) : (
                    <DynamicTable
                        columns={columns}
                        data={products}
                        actions={actions}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        totalCount={totalCount}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        ActionsComponent={TablePaginationActions}

                    />

                )}
            </div>
        </Layout>
    );
};

export default ProductList;
