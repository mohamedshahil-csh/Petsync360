import React, { FC, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Checkbox,
    TableSortLabel,
    IconButton,
    Tooltip,
    TablePagination,
    useTheme,
} from '@mui/material';
import {
    FirstPage as FirstPageIcon,
    LastPage as LastPageIcon,
    KeyboardArrowLeft,
    KeyboardArrowRight,
} from '@mui/icons-material';

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const TablePaginationActions: FC<TablePaginationActionsProps> = ({ count, page, rowsPerPage, onPageChange }) => {
    const theme = useTheme();
    const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);


    return (
        <>
            <IconButton
                onClick={(event) => onPageChange(event, 0)}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={(event) => onPageChange(event, page - 1)}
                disabled={page === 0}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={(event) => onPageChange(event, page + 1)}
                disabled={page >= lastPage}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={(event) => onPageChange(event, lastPage)}
                disabled={page >= lastPage}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </>
    );
};

interface DynamicTableProps {
    columns: any[];
    data: any[];
    loading?: boolean;
    error?: any;
    actions?: any[];
    page: number;
    rowsPerPage: number;
    totalCount: number;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (newRowsPerPage: number) => void;
    onSortChange?: (colKey: any, order: 'asc' | 'desc') => void;
    onRowClick?: (row: any) => void;
    selectable?: boolean;
    onSelectedRowsChange?: (selectedRows: any[]) => void;
    selectedRows?: any[];
    emptyMessage?: string;
    stickyHeader?: boolean;
    ActionsComponent?: FC<any>;
}

const DynamicTable: FC<DynamicTableProps> = ({
    columns,
    data,
    loading = false,
    error,
    actions,
    page,
    rowsPerPage,
    totalCount,
    onPageChange,
    onRowsPerPageChange,
    onSortChange,
    onRowClick,
    selectable = false,
    onSelectedRowsChange,
    selectedRows = [],
    emptyMessage = 'No data found.',
    stickyHeader = false,
}) => {
    const [orderBy, setOrderBy] = useState<any>(null);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (colKey: any) => {
        let newOrder: 'asc' | 'desc' = 'asc';
        if (orderBy === colKey && order === 'asc') newOrder = 'desc';
        setOrderBy(colKey);
        setOrder(newOrder);
        if (onSortChange) onSortChange(colKey, newOrder);
    };

    const isSelected = (row: any) => selectedRows.some((selected) => JSON.stringify(selected) === JSON.stringify(row));

    const handleSelectRow = (row: any) => {
        let newSelected;
        if (isSelected(row)) {
            newSelected = selectedRows.filter((selected) => JSON.stringify(selected) !== JSON.stringify(row));
        } else {
            newSelected = [...selectedRows, row];
        }
        onSelectedRowsChange?.(newSelected);
    };

    const handleSelectAll = () => {
        if (selectedRows.length === data.length) {
            onSelectedRowsChange?.([]);
        } else {
            onSelectedRowsChange?.([...data]);
        }
    };

    const numSelected = selectedRows.length;
    const rowCount = data.length;

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    maxHeight: stickyHeader ? 44 * (rowsPerPage + 1) + 60 : 'auto',
                    '&::-webkit-scrollbar': {
                        width: 8,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#90caf9',
                        borderRadius: 4,
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1',
                    },
                }}
            >
                <Table stickyHeader={stickyHeader}>
                    <TableHead>
                        <TableRow
                            sx={{
                                background: 'linear-gradient(to right, #2c2c2c, #1f1f1f)',
                                boxShadow: 'inset 0 -1px 0 #444',
                                '& > *': {
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: '#fff',
                                },
                            }}

                        >
                            {selectable && (
                                <TableCell padding="checkbox" align="center">
                                    <Checkbox
                                        indeterminate={numSelected > 0 && numSelected < rowCount}
                                        checked={rowCount > 0 && numSelected === rowCount}
                                        onChange={handleSelectAll}
                                        inputProps={{ 'aria-label': 'select all rows' }}
                                    />
                                </TableCell>
                            )}
                            {columns.map((col: any) => (
                                <TableCell
                                    key={String(col.key)}
                                    align={col.align ?? 'center'}
                                    sortDirection={orderBy === col.key ? order : false}
                                    sx={{ cursor: col.sortable ? 'pointer' : 'default', color: '#fff', }}
                                    onClick={() => col.sortable && handleSort(String(col.key))}
                                >
                                    {col.sortable ? (
                                        <TableSortLabel
                                            active={orderBy === col.key}
                                            direction={orderBy === col.key ? order : 'asc'}
                                            sx={{
                                                color: '#fff !important',
                                                '& .MuiTableSortLabel-icon': {
                                                    color: '#fff !important',
                                                },
                                            }}
                                        >
                                            {col.label}
                                        </TableSortLabel>

                                    ) : (
                                        col.label
                                    )}
                                </TableCell>
                            ))}
                            {actions && actions.length > 0 && <TableCell align="left" style={{ color: 'white' }}>Actions</TableCell>}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (actions?.length ?? 0) + (selectable ? 1 : 0)}
                                    align="center"
                                    sx={{ py: 5 }}
                                >
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (actions?.length ?? 0) + (selectable ? 1 : 0)}
                                    align="center"
                                    sx={{ py: 4, color: 'error.main' }}
                                >
                                    {error}
                                </TableCell>
                            </TableRow>
                        ) : data.length > 0 ? (
                            data.map((row: any, index: any) => {
                                const selected = selectable ? isSelected(row) : false;
                                return (
                                    <TableRow
                                        hover
                                        key={index}
                                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                                        role={onRowClick ? 'button' : undefined}
                                        tabIndex={onRowClick ? 0 : undefined}
                                        sx={{
                                            cursor: onRowClick ? 'pointer' : 'default',
                                            bgcolor: selected ? 'action.selected' : index % 2 === 0 ? 'background.default' : '#f9f9f9',
                                            transition: 'background 0.3s',
                                        }}
                                    >
                                        {selectable && (
                                            <TableCell padding="checkbox" align="center" sx={{ color: '#fff' }} onClick={(e) => e.stopPropagation()}>
                                                <Checkbox
                                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                                    checked={rowCount > 0 && numSelected === rowCount}
                                                    onChange={handleSelectAll}
                                                    inputProps={{ 'aria-label': 'select all rows' }}
                                                    sx={{ color: '#fff' }}
                                                />
                                            </TableCell>
                                        )}
                                        {columns.map((col: any) => (
                                            <TableCell key={String(col.key)} align={col.align ?? 'Left'}>
                                                {col.render ? col.render(row, index) : row[col.key]}
                                            </TableCell>
                                        ))}
                                        {actions && actions.length > 0 && (
                                            <TableCell
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'flex-start',
                                                    gap: 2,
                                                    py: 2,
                                                }}
                                            >
                                                {actions.map((action: any, idx: number) => {
                                                    const label = typeof action.label === 'function' ? action.label(row) : action.label;
                                                    const icon = typeof action.icon === 'function' ? action.icon(row) : action.icon;
                                                    const color = typeof action.color === 'function' ? action.color(row) : action.color;

                                                    // Fix condition with parentheses for clarity
                                                    if (
                                                        (label === 'Refund' && row.consult_current_status?.slug !== 'new') ||
                                                        (label === 'Cancel' &&
                                                            (row.consult_current_status?.slug === 'cancelled' || row.consult_current_status?.slug === 'cancelled (you)'))
                                                    ) {
                                                        return null;
                                                    }

                                                    return (
                                                        <Tooltip key={idx} title={label}>
                                                            <IconButton
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (typeof action.onClick === 'function') {
                                                                        action.onClick(row);
                                                                    }
                                                                }}
                                                                size="medium"
                                                                sx={{
                                                                    color: color,
                                                                    border: `1px solid ${color}`,
                                                                    backgroundColor: `${color}20`,
                                                                    borderRadius: '9px',
                                                                    boxShadow: `0 2px 6px ${color}40`,
                                                                    transition: 'all 0.3s ease',
                                                                    '&:hover': {
                                                                        backgroundColor: color,
                                                                        color: '#fff',
                                                                        transform: 'scale(1.1)',
                                                                        boxShadow: `0 4px 12px ${color}80`,
                                                                    },
                                                                }}
                                                            >
                                                                {icon}
                                                            </IconButton>
                                                        </Tooltip>
                                                    );
                                                })}
                                            </TableCell>
                                        )}

                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (actions?.length ?? 0) + (selectable ? 1 : 0)}
                                    align="center"
                                    sx={{ py: 5, fontWeight: '600' }}
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={(_e, newPage) => onPageChange(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                labelRowsPerPage="Rows per page:"
                ActionsComponent={TablePaginationActions} // <== Custom Actions with First/Last buttons here
                sx={{
                    '& .MuiSelect-select': {
                        minWidth: '40px',
                    },
                }}
            />
        </>
    );
};

export default DynamicTable;
