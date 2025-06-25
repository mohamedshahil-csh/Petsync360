import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    TextField,
    MenuItem,
    Select,
    Button,
    Tabs,
    Tab,
    Box,
    InputLabel,
    FormControl,
    Typography,
    Divider
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../../components/Layout';

export default function PaymentDashboard() {
    return (
        <Layout>
            <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 4, backgroundColor: '#f5f7fa' }}>

                {/* Payment History */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <CardHeader title={<Typography variant="h6" color="primary">Payment History Filters</Typography>} />
                    <Divider />
                    <CardContent>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <TextField type="date" label="Start Date" InputLabelProps={{ shrink: true }} fullWidth />
                            <TextField type="date" label="End Date" InputLabelProps={{ shrink: true }} fullWidth />
                            <TextField label="User" fullWidth />
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select defaultValue="">
                                    <MenuItem value="success">Success</MenuItem>
                                    <MenuItem value="failed">Failed</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Type</InputLabel>
                                <Select defaultValue="">
                                    <MenuItem value="payment">Payment</MenuItem>
                                    <MenuItem value="refund">Refund</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </CardContent>
                </Card>

                {/* Refund Approvals */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <CardHeader title={<Typography variant="h6" color="secondary">Refund Approvals</Typography>} />
                    <Divider />
                    <CardContent>
                        <Typography variant="body1" color="text.secondary">No refund requests at the moment.</Typography>
                    </CardContent>
                </Card>

                {/* Wallet Balances */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <Tabs value={0} textColor="primary" indicatorColor="primary">
                        <Tab label="Vendors" />
                        <Tab label="Delivery Partners" />
                    </Tabs>
                    <Divider />
                    <CardContent>
                        <Typography variant="body1" color="text.secondary">Wallet balance details will be shown here.</Typography>
                    </CardContent>
                </Card>

                {/* Commission Breakdown */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <CardHeader title={<Typography variant="h6" color="primary">Commission Breakdown</Typography>} />
                    <Divider />
                    <CardContent>
                        <Typography variant="body1" color="text.secondary">Commission transaction breakdown goes here.</Typography>
                    </CardContent>
                </Card>

                {/* Manual Transaction Entry */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <CardHeader title={<Typography variant="h6" color="primary">Manual Transaction Entry</Typography>} />
                    <Divider />
                    <CardContent>
                        <Box component="form" sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <TextField label="User Email / ID" fullWidth />
                            <TextField label="Amount" type="number" fullWidth />
                            <FormControl fullWidth>
                                <InputLabel>Type</InputLabel>
                                <Select defaultValue="">
                                    <MenuItem value="credit">Credit</MenuItem>
                                    <MenuItem value="debit">Debit</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField label="Reason / Notes" fullWidth />
                            <Box sx={{ gridColumn: 'span 2', textAlign: 'right' }}>
                                <Button variant="contained" color="primary">Submit Transaction</Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {/* Exportable Reports */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <CardHeader title={<Typography variant="h6" color="primary">Exportable Reports</Typography>} />
                    <Divider />
                    <CardContent>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button variant="contained" color="success">Revenue (Excel)</Button>
                            <Button variant="contained" color="error">Refunds (PDF)</Button>
                            <Button variant="contained" color="info">Payouts (Excel)</Button>
                        </Box>
                    </CardContent>
                </Card>

                {/* Charts: Payment Trends */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <CardHeader title={<Typography variant="h6" color="primary">Payment Trends</Typography>} />
                    <Divider />
                    <CardContent>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel>Vendor</InputLabel>
                                <Select defaultValue="">
                                    <MenuItem value="1">Vendor 1</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select defaultValue="">
                                    <MenuItem value="food">Food</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField type="date" label="From" InputLabelProps={{ shrink: true }} fullWidth />
                            <TextField type="date" label="To" InputLabelProps={{ shrink: true }} fullWidth />
                        </Box>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={[]}> {/* Replace [] with actual chart data */}
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={2} />
                                <Line type="monotone" dataKey="refund" stroke="#F44336" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Box></Layout>
    );
}