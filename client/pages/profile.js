import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, Card, CardContent, Button, Chip, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions, useTheme, Grid } from '@mui/material';
import Navbar from "@Components/customize/Navbar";
import PersonIcon from '@mui/icons-material/Person';
import CancelIcon from '@mui/icons-material/Cancel';
import HistoryIcon from '@mui/icons-material/History';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Profile() {
    const router = useRouter();
    const theme = useTheme();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
                const bookingsData = localStorage.getItem('bookings');
                if (bookingsData) {
                    try {
                        setBookings(JSON.parse(bookingsData));
                    } catch (e) {
                        setBookings([]);
                    }
                }
            } else {
                router.push('/auth');
            }

            const loadBookings = () => {
                const bookingsData = localStorage.getItem('bookings');
                if (bookingsData) {
                    try {
                        setBookings(JSON.parse(bookingsData));
                    } catch (e) {
                        setBookings([]);
                    }
                }
            };

            window.addEventListener('bookingUpdate', loadBookings);
            return () => window.removeEventListener('bookingUpdate', loadBookings);
        }
    }, [router]);

    const confirmCancel = () => {
        if (bookingToCancel && typeof window !== 'undefined') {
            const updated = bookings.map(b => b.id === bookingToCancel ? { ...b, status: 'cancelled' } : b);
            setBookings(updated);
            localStorage.setItem('bookings', JSON.stringify(updated));
            window.dispatchEvent(new Event('bookingUpdate'));
            setCancelDialogOpen(false);
            setBookingToCancel(null);
        }
    };

    const upcomingBookings = bookings.filter(b => b.status === 'confirmed' && new Date(b.startDate) >= new Date());
    const allOrderHistory = [...bookings.filter(b => b.status === 'completed' || new Date(b.startDate) < new Date()), ...bookings.filter(b => b.status === 'cancelled')].sort((a, b) => new Date(b.bookingDate || 0) - new Date(a.bookingDate || 0));

    if (!user) return null;

    const getStatusColor = (status) => ({ confirmed: 'success', completed: 'info', cancelled: 'error' }[status] || 'default');
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const BookingCard = ({ booking, showCancel = false }) => (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ flex: 1, minWidth: 250 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <LocationOnIcon color="primary" />
                            <Typography variant="h6" fontWeight={700}>{booking.destination}</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                            {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip label={booking.status.toUpperCase()} color={getStatusColor(booking.status)} size="small" />
                            <Chip label={`₹${(booking.totalAmount || 0).toLocaleString()}`} color="primary" size="small" />
                        </Box>
                    </Box>
                    {showCancel && (
                        <Button variant="outlined" color="error" startIcon={<CancelIcon />} onClick={() => { setBookingToCancel(booking.id); setCancelDialogOpen(true); }}>
                            Cancel
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 15, pb: 5 }}>
            <Navbar />
            <Container maxWidth="lg">
                <Card sx={{ mb: 4, bgcolor: 'primary.main', color: 'white' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Avatar sx={{ width: 80, height: 80, bgcolor: 'white', color: 'primary.main', fontSize: '2rem' }}>
                                {user.email?.charAt(0).toUpperCase() || 'U'}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h5" fontWeight={700} mb={1}>{user.email || 'User'}</Typography>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Chip icon={<EventIcon />} label={`${upcomingBookings.length} Upcoming`} sx={{ bgcolor: 'white', color: 'primary.main' }} />
                                    <Chip icon={<HistoryIcon />} label={`${allOrderHistory.length} Past Trips`} sx={{ bgcolor: 'white', color: 'primary.main' }} />
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <Typography variant="h5" fontWeight={700} mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EventIcon color="primary" /> Upcoming Bookings
                </Typography>
                {upcomingBookings.length === 0 ? (
                    <Card sx={{ p: 4, textAlign: 'center' }}>
                        <EventIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">No Upcoming Bookings</Typography>
                    </Card>
                ) : (
                    upcomingBookings.map(booking => <BookingCard key={booking.id} booking={booking} showCancel />
                    ))}

                <Divider sx={{ my: 4 }} />

                <Typography variant="h5" fontWeight={700} mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HistoryIcon color="primary" /> Order History
                </Typography>
                {allOrderHistory.length === 0 ? (
                    <Card sx={{ p: 4, textAlign: 'center' }}>
                        <HistoryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">No Order History</Typography>
                    </Card>
                ) : (
                    allOrderHistory.map(booking => <BookingCard key={booking.id} booking={booking} />
                    ))}

                <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
                    <DialogTitle>Cancel Booking?</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to cancel this booking? This action cannot be undone.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setCancelDialogOpen(false)}>Keep Booking</Button>
                        <Button onClick={confirmCancel} variant="contained" color="error">Cancel Booking</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
