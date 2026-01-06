// Receipt PDF Generator using jsPDF
import jsPDF from 'jspdf';

export const generateReceipt = (bookingData) => {
  const doc = new jsPDF();
  
  // Colors
  const primaryColor = [75, 140, 168]; // #4b8ca8
  const textColor = [30, 58, 95]; // #1e3a5f
  const lightGray = [200, 200, 200];
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 45, 'F');
  
  // Add logo
  try {
    // Load logo from public folder
    const logo = '/logo.png';
    doc.addImage(logo, 'PNG', 15, 8, 30, 30);
  } catch (err) {
    console.log('Logo not found, using text only');
  }
  
  // GoTrip branding - "Go" in blue, "Trip" in yellow
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  
  // "Go" in blue/cyan color
  doc.setTextColor(52, 152, 219); // Blue color
  doc.text('Go', 88, 25);
  
  // "Trip" in yellow/orange color (positioned right next to "Go" - no space)
  doc.setTextColor(255, 165, 0); // Orange/Yellow color
  doc.text('Trip', 105, 25);
  
  // Reset to white for subtitle
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Travel Booking Receipt', 105, 35, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('Your Adventure Starts Here', 105, 41, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(...textColor);
  
  // Booking ID and Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Booking ID: ${bookingData.bookingId}`, 20, 58);
  doc.text(`Date: ${new Date(bookingData.bookingDate).toLocaleDateString()}`, 150, 58);
  
  // Divider
  doc.setDrawColor(...lightGray);
  doc.line(20, 63, 190, 63);
  
  // Customer Details
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Customer Details', 20, 73);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Name: ${bookingData.customerName}`, 20, 83);
  doc.text(`Email: ${bookingData.customerEmail}`, 20, 91);
  doc.text(`Phone: ${bookingData.customerPhone || 'N/A'}`, 20, 99);
  
  // Divider
  doc.line(20, 108, 190, 108);
  
  // Trip Details
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Trip Details', 20, 118);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Package: ${bookingData.packageName}`, 20, 128);
  doc.text(`Destination: ${bookingData.destination}`, 20, 136);
  doc.text(`Travel Dates: ${bookingData.travelStartDate} to ${bookingData.travelEndDate}`, 20, 144);
  doc.text(`Duration: ${bookingData.duration} days`, 20, 152);
  
  // Divider
  doc.line(20, 161, 190, 161);
  
  // Payment Details
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Details', 20, 171);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Payment ID: ${bookingData.paymentId}`, 20, 181);
  doc.text(`Payment Method: ${bookingData.paymentMethod}`, 20, 189);
  doc.text(`Payment Status: ${bookingData.paymentStatus}`, 20, 197);
  
  // Amount breakdown
  const yStart = 213;
  doc.text('Package Cost:', 20, yStart);
  doc.text(`INR ${bookingData.packageCost.toLocaleString()}`, 150, yStart, { align: 'right' });
  
  if (bookingData.taxes > 0) {
    doc.text('Taxes & Fees:', 20, yStart + 8);
    doc.text(`INR ${bookingData.taxes.toLocaleString()}`, 150, yStart + 8, { align: 'right' });
  }
  
  // Divider before total
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(20, yStart + 15, 190, yStart + 15);
  
  // Total Amount
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount:', 20, yStart + 25);
  doc.text(`INR ${bookingData.totalAmount.toLocaleString()}`, 150, yStart + 25, { align: 'right' });
  
  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for choosing GoTrip! Have a great adventure!', 105, 270, { align: 'center' });
  doc.text('For support, contact us at support@gotrip.com', 105, 277, { align: 'center' });
  
  // Save the PDF
  doc.save(`GoTrip_Receipt_${bookingData.bookingId}.pdf`);
};

// View receipt in new tab (without downloading)
export const viewReceipt = (bookingData) => {
  const doc = new jsPDF();
  
  // Same PDF generation code as above
  const primaryColor = [75, 140, 168];
  const textColor = [30, 58, 95];
  const lightGray = [200, 200, 200];
  
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 45, 'F');
  
  // Add logo
  try {
    const logo = '/logo.png';
    doc.addImage(logo, 'PNG', 15, 8, 30, 30);
  } catch (err) {
    console.log('Logo not found, using text only');
  }
  
  // GoTrip branding - "Go" in blue, "Trip" in yellow
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  
  // "Go" in blue/cyan color
  doc.setTextColor(52, 152, 219); // Blue color
  doc.text('Go', 88, 25);
  
  // "Trip" in yellow/orange color (positioned right next to "Go" - no space)
  doc.setTextColor(255, 165, 0); // Orange/Yellow color
  doc.text('Trip', 105, 25);
  
  // Reset to white for subtitle
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Travel Booking Receipt', 105, 35, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('Your Adventure Starts Here', 105, 41, { align: 'center' });
  
  doc.setTextColor(...textColor);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Booking ID: ${bookingData.bookingId}`, 20, 58);
  doc.text(`Date: ${new Date(bookingData.bookingDate).toLocaleDateString()}`, 150, 58);
  
  doc.setDrawColor(...lightGray);
  doc.line(20, 63, 190, 63);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Customer Details', 20, 73);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Name: ${bookingData.customerName}`, 20, 83);
  doc.text(`Email: ${bookingData.customerEmail}`, 20, 91);
  doc.text(`Phone: ${bookingData.customerPhone || 'N/A'}`, 20, 99);
  
  doc.line(20, 108, 190, 108);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Trip Details', 20, 118);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Package: ${bookingData.packageName}`, 20, 128);
  doc.text(`Destination: ${bookingData.destination}`, 20, 136);
  doc.text(`Travel Dates: ${bookingData.travelStartDate} to ${bookingData.travelEndDate}`, 20, 144);
  doc.text(`Duration: ${bookingData.duration} days`, 20, 152);
  
  doc.line(20, 161, 190, 161);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Details', 20, 171);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Payment ID: ${bookingData.paymentId}`, 20, 181);
  doc.text(`Payment Method: ${bookingData.paymentMethod}`, 20, 189);
  doc.text(`Payment Status: ${bookingData.paymentStatus}`, 20, 197);
  
  const yStart = 213;
  doc.text('Package Cost:', 20, yStart);
  doc.text(`INR ${bookingData.packageCost.toLocaleString()}`, 150, yStart, { align: 'right' });
  
  if (bookingData.taxes > 0) {
    doc.text('Taxes & Fees:', 20, yStart + 8);
    doc.text(`INR ${bookingData.taxes.toLocaleString()}`, 150, yStart + 8, { align: 'right' });
  }
  
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(20, yStart + 15, 190, yStart + 15);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount:', 20, yStart + 25);
  doc.text(`INR ${bookingData.totalAmount.toLocaleString()}`, 150, yStart + 25, { align: 'right' });
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for choosing GoTrip! Have a great adventure!', 105, 270, { align: 'center' });
  doc.text('For support, contact us at support@gotrip.com', 105, 277, { align: 'center' });
  
  // Open in new tab
  window.open(doc.output('bloburl'), '_blank');
};

