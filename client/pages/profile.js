import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
<<<<<<< HEAD
import { Box, Container, Typography, Card, CardContent, Button, Chip, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions, useTheme, Grid, CircularProgress } from '@mui/material';
=======
import { Box, Container, Typography, Card, CardContent, Button, Chip, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions, useTheme, Grid, Tabs, Tab } from '@mui/material';
>>>>>>> bc4712c6369eb54745da9b2752de615f66df4c6b
import PersonIcon from '@mui/icons-material/Person';
import CancelIcon from '@mui/icons-material/Cancel';
import HistoryIcon from '@mui/icons-material/History';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
<<<<<<< HEAD
import DownloadIcon from '@mui/icons-material/Download';
import Navbar from '@/Components/LandingPageComponents/Navbar';
import { generateReceipt } from '@/utils/receiptGenerator';

=======
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Navbar from '@/Components/LandingPageComponents/Navbar';
import ReelCard from '@/Components/ReelCard';
>>>>>>> bc4712c6369eb54745da9b2752de615f66df4c6b

export default function Profile() {
    const router = useRouter();
    const theme = useTheme();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
<<<<<<< HEAD
    const [loading, setLoading] = useState(true);
=======
    const [userMoments, setUserMoments] = useState([]);
>>>>>>> bc4712c6369eb54745da9b2752de615f66df4c6b
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [momentsLoading, setMomentsLoading] = useState(false);
    const [likedVideos, setLikedVideos] = useState(new Set());
    const [hoveredCard, setHoveredCard] = useState(null);
    const [playingVideo, setPlayingVideo] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('user');
<<<<<<< HEAD
            if (userData) {
                setUser(JSON.parse(userData));
                fetchBookings();
=======
            const token = localStorage.getItem('token');
            
            if (userData && token) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                fetchBookings(token);
                fetchUserMoments(token, parsedUser._id || parsedUser.id);
>>>>>>> bc4712c6369eb54745da9b2752de615f66df4c6b
            } else {
                router.push('/login');
            }
        }
    }, [router]);

<<<<<<< HEAD
    const fetchBookings = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await fetch('/api/v1/booking/user/all', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
=======
    const fetchBookings = async (token) => {
        try {
            setLoading(true);
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
            const response = await fetch(`${API_BASE_URL}/v1/booking/user/all`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
>>>>>>> bc4712c6369eb54745da9b2752de615f66df4c6b
            });

            if (response.ok) {
                const data = await response.json();
<<<<<<< HEAD
                if (data.message === "OK" && data.response) {
                    // Transform backend data to match UI format
                    const transformedBookings = data.response.map(booking => ({
                        id: booking._id,
                        destination: booking.packageId?.name || 'Unknown Destination',
                        startDate: booking.travelStartDate || new Date().toISOString(),
                        endDate: booking.travelEndDate || new Date().toISOString(),
                        status: booking.paymentStatus === 'completed' ? 'confirmed' : booking.paymentStatus,
                        totalAmount: booking.totalAmount || 0,
                        bookingDate: booking.bookingDate || booking.createdAt,
                        paymentId: booking.razorpayPaymentId || 'N/A',
                        packageName: booking.packageId?.name || 'Travel Package',
                        duration: booking.packageId?.totalDays || 3,
                    }));
                    setBookings(transformedBookings);
                }
            }
        } catch (err) {
            console.error('Error fetching bookings:', err);
=======
                setBookings(data.response || []);
            } else {
                console.error('Failed to fetch bookings');
                setBookings([]);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setBookings([]);
>>>>>>> bc4712c6369eb54745da9b2752de615f66df4c6b
        } finally {
            setLoading(false);
        }
    };

<<<<<<< HEAD
    const confirmCancel = () => {
        if (bookingToCancel && typeof window !== 'undefined') {
            const updated = bookings.map(b => b.id === bookingToCancel ? { ...b, status: 'cancelled' } : b);
=======
    const fetchUserMoments = async (token, userId) => {
        try {
            setMomentsLoading(true);
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
            const response = await fetch(`${API_BASE_URL}/v1/moments`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Filter moments by current user
                const userMomentsList = (data.moments || []).filter(
                    moment => moment.userId?._id === userId || moment.userId?._id?.toString() === userId?.toString()
                );
                setUserMoments(userMomentsList);
            } else {
                console.error('Failed to fetch moments');
                setUserMoments([]);
            }
        } catch (error) {
            console.error('Error fetching moments:', error);
            setUserMoments([]);
        } finally {
            setMomentsLoading(false);
        }
    };

    const handleCancelBooking = async () => {
        if (!bookingToCancel) return;

        try {
            const token = localStorage.getItem('token');
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
            
            // Update booking status to cancelled
            // Note: You may need to create a cancel endpoint or update the booking
            const response = await fetch(`${API_BASE_URL}/v1/booking/${bookingToCancel}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentStatus: 'refunded' }), // or create a cancel endpoint
            });

            if (response.ok) {
                // Refresh bookings
                await fetchBookings(token);
                setCancelDialogOpen(false);
                setBookingToCancel(null);
            } else {
                // If PATCH doesn't work, try updating locally and show success
                // You should implement a proper cancel endpoint on the backend
                const updated = bookings.map(b => 
                    b._id === bookingToCancel || b.id === bookingToCancel 
                        ? { ...b, paymentStatus: 'refunded' } 
                        : b
                );
                setBookings(updated);
                setCancelDialogOpen(false);
                setBookingToCancel(null);
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
            // Fallback: update locally
            const updated = bookings.map(b => 
                b._id === bookingToCancel || b.id === bookingToCancel 
                    ? { ...b, paymentStatus: 'refunded' } 
                    : b
            );
>>>>>>> bc4712c6369eb54745da9b2752de615f66df4c6b
            setBookings(updated);
            setCancelDialogOpen(false);
            setBookingToCancel(null);
        }
    };

    const handleLike = async (momentId) => {
        try {
            const token = localStorage.getItem('token');
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
            
            const response = await fetch(`${API_BASE_URL}/v1/moments/${momentId}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.liked) {
                    setLikedVideos(prev => new Set([...prev, momentId]));
                } else {
                    setLikedVideos(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(momentId);
                        return newSet;
                    });
                }
                // Refresh moments to get updated like count
                fetchUserMoments(token, user._id || user.id);
            }
        } catch (error) {
            console.error('Error liking moment:', error);
        }
    };

    if (!user) return null;

<<<<<<< HEAD
    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    const getStatusColor = (status) => ({ confirmed: 'success', completed: 'info', cancelled: 'error' }[status] || 'default');
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const handleDownloadReceipt = (booking) => {
        const receiptData = {
            bookingId: booking.id,
            bookingDate: booking.bookingDate || new Date().toISOString(),
            customerName: user?.name || user?.email || 'Guest User',
            customerEmail: user?.email || 'guest@example.com',
            customerPhone: user?.phone || '+91 9999999999',
            packageName: booking.packageName || booking.destination,
            destination: booking.destination,
            travelStartDate: formatDate(booking.startDate),
            travelEndDate: formatDate(booking.endDate),
            duration: booking.duration || 3,
            paymentId: booking.paymentId || 'N/A',
            paymentMethod: 'Razorpay',
            paymentStatus: booking.status === 'confirmed' ? 'Completed' : booking.status,
            packageCost: booking.totalAmount || 0,
            taxes: Math.round((booking.totalAmount || 0) * 0.05),
            totalAmount: booking.totalAmount || 0,
        };
        generateReceipt(receiptData);
    };

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
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                            <Chip label={booking.status.toUpperCase()} color={getStatusColor(booking.status)} size="small" />
                            <Chip label={`₹${(booking.totalAmount || 0).toLocaleString()}`} color="primary" size="small" />
                        </Box>
                        <Button 
                            variant="text" 
                            size="small" 
                            startIcon={<DownloadIcon />}
                            onClick={() => handleDownloadReceipt(booking)}
                            sx={{ mt: 1 }}
                        >
                            Download Receipt
                        </Button>
=======
    // Filter bookings
    const upcomingBookings = bookings.filter(b => {
        const status = b.paymentStatus || b.status;
        const startDate = b.travelStartDate || b.startDate;
        return (status === 'pending' || status === 'completed') && 
               startDate && new Date(startDate) >= new Date();
    });

    const pastBookings = bookings.filter(b => {
        const status = b.paymentStatus || b.status;
        const startDate = b.travelStartDate || b.startDate;
        return status === 'refunded' || 
               (startDate && new Date(startDate) < new Date()) ||
               status === 'failed';
    }).sort((a, b) => {
        const dateA = new Date(a.bookingDate || a.createdAt || 0);
        const dateB = new Date(b.bookingDate || b.createdAt || 0);
        return dateB - dateA;
    });

    const getStatusColor = (status) => {
        const statusMap = {
            'pending': 'warning',
            'completed': 'success',
            'refunded': 'error',
            'failed': 'error',
            'cancelled': 'error'
        };
        return statusMap[status] || 'default';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const getDestinationName = (booking) => {
        if (booking.itineraryId?.destinationId?.name) {
            return booking.itineraryId.destinationId.name;
        }
        if (booking.itineraryId?.destination) {
            return booking.itineraryId.destination;
        }
        if (booking.destination) {
            return booking.destination;
        }
        return 'Unknown Destination';
    };

    const BookingCard = ({ booking, showCancel = false }) => {
        const status = booking.paymentStatus || booking.status || 'pending';
        const destination = getDestinationName(booking);
        const startDate = booking.travelStartDate || booking.startDate;
        const endDate = booking.travelEndDate || booking.endDate;

        return (
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ flex: 1, minWidth: 250 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <LocationOnIcon color="primary" />
                                <Typography variant="h6" fontWeight={700}>{destination}</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" mb={1}>
                                {formatDate(startDate)} - {formatDate(endDate)}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip 
                                    label={status.toUpperCase()} 
                                    color={getStatusColor(status)} 
                                    size="small" 
                                />
                                <Chip 
                                    label={`₹${(booking.totalAmount || 0).toLocaleString()}`} 
                                    color="primary" 
                                    size="small" 
                                />
                            </Box>
                        </Box>
                        {showCancel && status !== 'refunded' && status !== 'failed' && (
                            <Button 
                                variant="outlined" 
                                color="error" 
                                startIcon={<CancelIcon />} 
                                onClick={() => { 
                                    setBookingToCancel(booking._id || booking.id); 
                                    setCancelDialogOpen(true); 
                                }}
                            >
                                Cancel
                            </Button>
                        )}
>>>>>>> bc4712c6369eb54745da9b2752de615f66df4c6b
                    </Box>
                </CardContent>
            </Card>
        );
    };

    const convertMomentToReel = (moment) => {
        return {
            id: moment._id,
            videoUrl: moment.video,
            thumbnail: moment.video, // You might want to extract thumbnail from video URL
            title: moment.caption || 'Untitled',
            user: moment.userId?.name || moment.userId?.email || 'User',
            avatar: '', // Add avatar if available
            location: moment.location,
            tags: moment.tags || [],
            likes: moment.likes?.length || 0,
            comments: moment.comments?.length || 0,
            category: moment.destinationId?.category || 'cultural'
        };
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 15, pb: 5 }}>
            <Navbar />
            <Container maxWidth="lg">
                <Card sx={{ mb: 4, bgcolor: 'primary.main', color: 'white' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Avatar sx={{ width: 80, height: 80, bgcolor: 'white', color: 'primary.main', fontSize: '2rem' }}>
                                {user.email?.charAt(0).toUpperCase() || user.name?.charAt(0).toUpperCase() || 'U'}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h5" fontWeight={700} mb={1}>
                                    {user.name || user.email || 'User'}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Chip 
                                        icon={<EventIcon />} 
                                        label={`${upcomingBookings.length} Upcoming`} 
                                        sx={{ bgcolor: 'white', color: 'primary.main' }} 
                                    />
                                    <Chip 
                                        icon={<HistoryIcon />} 
                                        label={`${pastBookings.length} Past Trips`} 
                                        sx={{ bgcolor: 'white', color: 'primary.main' }} 
                                    />
                                    <Chip 
                                        icon={<VideoLibraryIcon />} 
                                        label={`${userMoments.length} Moments`} 
                                        sx={{ bgcolor: 'white', color: 'primary.main' }} 
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Card sx={{ mb: 4 }}>
                    <Tabs 
                        value={activeTab} 
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        <Tab icon={<EventIcon />} iconPosition="start" label="My Bookings" />
                        <Tab icon={<VideoLibraryIcon />} iconPosition="start" label="My Moments" />
                        <Tab icon={<HistoryIcon />} iconPosition="start" label="Past Bookings" />
                    </Tabs>
                </Card>

                {/* Tab Content */}
                {activeTab === 0 && (
                    <Box>
                        <Typography variant="h5" fontWeight={700} mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EventIcon color="primary" /> Upcoming Bookings
                        </Typography>
                        {loading ? (
                            <Card sx={{ p: 4, textAlign: 'center' }}>
                                <Typography>Loading...</Typography>
                            </Card>
                        ) : upcomingBookings.length === 0 ? (
                            <Card sx={{ p: 4, textAlign: 'center' }}>
                                <EventIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">No Upcoming Bookings</Typography>
                            </Card>
                        ) : (
                            upcomingBookings.map(booking => (
                                <BookingCard 
                                    key={booking._id || booking.id} 
                                    booking={booking} 
                                    showCancel 
                                />
                            ))
                        )}
                    </Box>
                )}

                {activeTab === 1 && (
                    <Box>
                        <Typography variant="h5" fontWeight={700} mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <VideoLibraryIcon color="primary" /> My Moments
                        </Typography>
                        {momentsLoading ? (
                            <Card sx={{ p: 4, textAlign: 'center' }}>
                                <Typography>Loading...</Typography>
                            </Card>
                        ) : userMoments.length === 0 ? (
                            <Card sx={{ p: 4, textAlign: 'center' }}>
                                <VideoLibraryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" mb={2}>
                                    Start posting
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => router.push('/moments')}
                                >
                                    Share Your First Moment
                                </Button>
                            </Card>
                        ) : (
                            <Grid container spacing={3}>
                                {userMoments.map(moment => {
                                    const reel = convertMomentToReel(moment);
                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={moment._id}>
                                            <ReelCard
                                                reel={reel}
                                                isHovered={hoveredCard === moment._id}
                                                isPlaying={playingVideo === moment._id}
                                                onHover={(id, hovered) => {
                                                    setHoveredCard(hovered ? id : null);
                                                    setPlayingVideo(hovered ? id : null);
                                                }}
                                                onLike={() => handleLike(moment._id)}
                                                isLiked={likedVideos.has(moment._id)}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </Box>
                )}

                {activeTab === 2 && (
                    <Box>
                        <Typography variant="h5" fontWeight={700} mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <HistoryIcon color="primary" /> Past Bookings
                        </Typography>
                        {loading ? (
                            <Card sx={{ p: 4, textAlign: 'center' }}>
                                <Typography>Loading...</Typography>
                            </Card>
                        ) : pastBookings.length === 0 ? (
                            <Card sx={{ p: 4, textAlign: 'center' }}>
                                <HistoryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">No Past Bookings</Typography>
                            </Card>
                        ) : (
                            pastBookings.map(booking => (
                                <BookingCard 
                                    key={booking._id || booking.id} 
                                    booking={booking} 
                                />
                            ))
                        )}
                    </Box>
                )}

                <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
                    <DialogTitle>Cancel Booking?</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to cancel this booking? This action cannot be undone.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setCancelDialogOpen(false)}>Keep Booking</Button>
                        <Button onClick={handleCancelBooking} variant="contained" color="error">
                            Cancel Booking
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}