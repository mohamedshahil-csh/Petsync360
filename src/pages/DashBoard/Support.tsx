import React, { useState } from 'react';
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
    Divider,
    Chip
} from '@mui/material';
import Layout from '../../components/Layout';


export default function SupportDashboard() {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Layout>
            <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 4, backgroundColor: '#f5f7fa' }}>

                {/* Ticket Status Tabs */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} textColor="primary" indicatorColor="primary">
                        <Tab label="Open" />
                        <Tab label="In Progress" />
                        <Tab label="Closed" />
                    </Tabs>
                    <Divider />
                    <CardContent>
                        <Typography variant="body1" color="text.secondary">Ticket list with filters and status view will appear here.</Typography>
                    </CardContent>
                </Card>

                {/* Agent Assignment and Internal Notes */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <CardHeader title={<Typography variant="h6" color="primary">Agent Assignment & Notes</Typography>} />
                    <Divider />
                    <CardContent>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Assign Agent</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="agent1">Agent 1</MenuItem>
                                <MenuItem value="agent2">Agent 2</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="Add Private Note" multiline rows={4} fullWidth sx={{ mb: 2 }} />
                        <Typography variant="body2" color="text.secondary">Previous Notes:</Typography>
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="caption">[10:45 AM] Agent1: Investigating the issue.</Typography><br />
                            <Typography variant="caption">[11:10 AM] Agent2: Awaiting customer response.</Typography>
                        </Box>
                    </CardContent>
                </Card>

                {/* SLA Tracking */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <CardHeader title={<Typography variant="h6" color="primary">SLA Tracking</Typography>} />
                    <Divider />
                    <CardContent>
                        <Typography variant="body1">Ticket Timers with SLA breaches will be listed here with alerts.</Typography>
                    </CardContent>
                </Card>

                {/* Ticket Analytics */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <CardHeader title={<Typography variant="h6" color="primary">Ticket Analytics</Typography>} />
                    <Divider />
                    <CardContent>
                        <Typography variant="body1">Average resolution time and ticket count per category will be shown here.</Typography>
                    </CardContent>
                </Card>

                {/* FAQs and Help Articles */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <CardHeader title={<Typography variant="h6" color="primary">Manage FAQs & Help Articles</Typography>} />
                    <Divider />
                    <CardContent>
                        <TextField label="Title" fullWidth sx={{ mb: 2 }} />
                        <TextField label="Content" multiline rows={6} fullWidth sx={{ mb: 2 }} />
                        <TextField label="Tags (comma separated)" fullWidth sx={{ mb: 2 }} />
                        <Button variant="contained" color="primary">Save Article</Button>
                    </CardContent>
                </Card>

                {/* FAQ Categorization */}
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                    <CardHeader title={<Typography variant="h6" color="primary">FAQs & Feedback</Typography>} />
                    <Divider />
                    <CardContent>
                        <TextField label="Search FAQs" fullWidth sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            <Chip label="Login Issues" />
                            <Chip label="Payments" />
                            <Chip label="Technical Support" />
                        </Box>
                        <Typography variant="body2" color="text.secondary">List of categorized FAQs will appear here. Users can provide feedback on helpfulness.</Typography>
                    </CardContent>
                </Card>

            </Box>
        </Layout>
    );
}
