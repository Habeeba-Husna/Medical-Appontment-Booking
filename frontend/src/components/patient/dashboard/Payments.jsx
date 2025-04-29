import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../../api/axiosInstance';
import { Button } from "../../ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/Table";
import { CreditCard, Download, Calendar, User, Clock, CheckCircle, XCircle, FileText, Loader2 } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { clearBookingInfo } from '../../../store/slices/appointmentSlice';
import { clearUpcomingPayment } from '../../../store/slices/paymentSlice';
import { createSelector } from '@reduxjs/toolkit';

// Memoized selectors
const selectBookingInfo = (state) => state.appointments.bookingInfo;

const selectPaymentState = (state) => state.payment;

export const selectPayments = createSelector(
  [selectPaymentState],
  (payment) => payment?.history || []
);

export const selectUpcomingPayment = createSelector(
  [selectPaymentState],
  (payment) => payment?.upcomingPayment
);

const selectDoctorState = (state) => state.doctors;

export const selectDoctors = createSelector(
  [selectDoctorState],
  (doctors) => doctors?.doctors || []
);
// const selectPayments = (state) => state.payment?.history || [];
// const selectUpcomingPayment = (state) => state.payment?.upcomingPayment;
// const selectDoctors = (state) => state.doctors?.doctors || [];
const selectUser = (state) => state.auth.user;

const selectCurrentDoctor = createSelector(
  [selectBookingInfo, selectDoctors],
  (bookingInfo, doctors) => {
    if (!bookingInfo?.doctorId || !Array.isArray(doctors)) return null;
    return doctors.find(doctor => doctor._id === bookingInfo.doctorId);
  }
);

const selectCurrentAppointment = createSelector(
  [selectBookingInfo, selectCurrentDoctor],
  (bookingInfo, currentDoctor) => {
    if (!bookingInfo?.doctorId) return null;
    return {
      doctorId: bookingInfo.doctorId,
      date: bookingInfo.date || new Date().toISOString().split('T')[0],
      time: bookingInfo.time || '10:00 AM',
      doctorName: currentDoctor?.name || "Your Doctor",
      fee: currentDoctor?.consultationFee || 500,
      service: "Consultation",
      _id: `temp-${Date.now()}`
    };
  }
);

const selectTotalSpent = createSelector(
  [selectPayments],
  (payments) => payments.reduce((total, payment) => total + (payment.amount || 0), 0)
);

export default function Payments() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const payments = useAppSelector(selectPayments);
  const upcomingPayment = useAppSelector(selectUpcomingPayment);
  const currentDoctor = useAppSelector(selectCurrentDoctor);
  const currentAppointment = useAppSelector(selectCurrentAppointment);
  const totalSpent = useAppSelector(selectTotalSpent);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card_4581");


  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

    const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };
  
  const formatTime = (timeString) => {
    return timeString || '--:--';
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  const handlePayment = async (paymentData) => {
    if (!paymentData) {
      toast.error("No payment data available");
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Create order on backend
      const response = await axiosInstance.post('/payments/create-order', {
        amount: paymentData.fee,
        appointmentId: paymentData._id,
        doctorId: paymentData.doctorId,
        date: paymentData.date,
        time: paymentData.time
      });
      
      const { orderId, amount } = response.data;
  
      // 2. Initialize Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount * 100, // in paise
        currency: "INR",
        name: "MediCare Appointments",
        description: `Payment for appointment with Dr. ${paymentData.doctorName}`,
        order_id: orderId,
        handler: async (response) => {
          try {
            console.log("after razorpay.......gpay")
            // Verify payment on backend
            await axiosInstance.post('/payments/verify-payment', {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              appointmentData: paymentData
            });
            
            toast.success("Payment Successful! Appointment confirmed.");
            
            // Clear booking and payment states
            dispatch(clearBookingInfo());
            dispatch(clearUpcomingPayment());
            
            // Navigate to appointments page
            navigate('/patient/appointments');
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || ""
        },
        theme: {
          color: "#6d28d9",
        },
        modal: {
          ondismiss: () => {
            toast.info("Payment window closed");
            setIsProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your payment history and upcoming payments</p>
      </div>

      {/* Current Appointment Payment Section */}
      {currentAppointment && (
        <Card className="mb-6 border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              Confirm Your Appointment
            </CardTitle>
            <CardDescription>Complete payment to secure your appointment with Dr. {currentAppointment.doctorName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Doctor</p>
                <p className="font-medium">{currentAppointment.doctorName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date & Time</p>
                <p className="font-medium">
                  {formatDate(currentAppointment.date)} at {formatTime(currentAppointment.time)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Consultation Fee</p>
                <p className="font-medium">{formatCurrency(currentAppointment.fee)}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(currentAppointment.fee)}
                  </p>
                </div>
                <Button 
                  onClick={() => handlePayment(currentAppointment)}
                  disabled={isProcessing}
                  className="min-w-[120px]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime spending</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-primary" />
            <div>
              <div className="font-bold">Visa **** 4581</div>
              <p className="text-xs text-muted-foreground">Default payment method</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Payment</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingPayment ? (
              <>
                <div className="text-2xl font-bold">
                  {formatCurrency(upcomingPayment.fee || upcomingPayment.amount)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Due on {formatDate(upcomingPayment.date)} at {formatTime(upcomingPayment.time)}
                </p>
              </>
            ) : (
              <div className="text-sm">No upcoming payments</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Payments */}
      {upcomingPayment && !currentAppointment && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upcoming Payment</CardTitle>
            <CardDescription>Payment scheduled for your next appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-md">
              <div className="mb-4 md:mb-0">
                <h3 className="font-medium">{upcomingPayment.doctorName}</h3>
                <p className="text-sm text-muted-foreground">{upcomingPayment.service || "Consultation"}</p>
                <div className="flex items-center mt-1 text-sm">
                  <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                  <span>{formatDate(upcomingPayment.date)}</span>
                  <Clock className="ml-3 mr-1 h-3 w-3 text-muted-foreground" />
                  <span>{formatTime(upcomingPayment.time)}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="text-xl font-bold mb-2">
                  {formatCurrency(upcomingPayment.fee || upcomingPayment.amount)}
                </div>
                <Badge variant="outline" className="mb-3">Due for payment</Badge>
                <Button 
                  onClick={() => handlePayment(upcomingPayment)}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your past payments for medical services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map(payment => (
                  <TableRow key={payment._id || payment.id}>
                    <TableCell>
                      <div className="font-medium">{formatDate(payment.date)}</div>
                      <div className="text-xs text-muted-foreground">{formatTime(payment.time)}</div>
                    </TableCell>
                    <TableCell>{payment.doctorName}</TableCell>
                    <TableCell>{payment.service}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={payment.status === "paid" ? "outline" : "secondary"}
                        className="flex items-center gap-1"
                      >
                        {payment.status === "paid" ? (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            <span>Paid</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3" />
                            <span>Pending</span>
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {payments.length} payments
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download All Receipts
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axiosInstance from '../../../api/axiosInstance';
// import { Button } from "../../ui/Button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/Table";
// import { 
//   CreditCard, 
//   Download, 
//   Calendar, 
//   Clock, 
//   CheckCircle, 
//   XCircle, 
//   FileText, 
//   Loader2,
//   IndianRupee,
//   User,
//   ShieldCheck,
//   History
// } from "lucide-react";
// import { Badge } from "../../ui/Badge";
// import { useAppSelector, useAppDispatch } from "../../../hooks";
// import { clearBookingInfo } from '../../../store/slices/appointmentSlice';
// import { clearUpcomingPayment } from '../../../store/slices/paymentSlice';
// import { createSelector } from '@reduxjs/toolkit';
// import { Skeleton } from "../../ui/Skeleton";
// import PaymentMethodSelector from './PaymentMethodSelector';

// // Memoized selectors
// const selectBookingInfo = (state) => state.appointments.bookingInfo;
// const selectPaymentState = (state) => state.payment;
// const selectDoctorState = (state) => state.doctors;
// const selectUser = (state) => state.auth.user;

// const selectPayments = createSelector(
//   [selectPaymentState],
//   (payment) => payment?.history || []
// );

// const selectUpcomingPayment = createSelector(
//   [selectPaymentState],
//   (payment) => payment?.upcomingPayment
// );

// const selectDoctors = createSelector(
//   [selectDoctorState],
//   (doctors) => doctors?.doctors || []
// );

// const selectCurrentDoctor = createSelector(
//   [selectBookingInfo, selectDoctors],
//   (bookingInfo, doctors) => {
//     if (!bookingInfo?.doctorId || !Array.isArray(doctors)) return null;
//     return doctors.find(doctor => doctor._id === bookingInfo.doctorId);
//   }
// );

// const selectCurrentAppointment = createSelector(
//   [selectBookingInfo, selectCurrentDoctor],
//   (bookingInfo, currentDoctor) => {
//     if (!bookingInfo?.doctorId) return null;
//     return {
//       doctorId: bookingInfo.doctorId,
//       date: bookingInfo.date || new Date().toISOString().split('T')[0],
//       time: bookingInfo.time || '10:00 AM',
//       doctorName: currentDoctor?.name || "Your Doctor",
//       fee: currentDoctor?.consultationFee || 500,
//       service: "Consultation",
//       _id: `temp-${Date.now()}`
//     };
//   }
// );

// const selectTotalSpent = createSelector(
//   [selectPayments],
//   (payments) => payments.reduce((total, payment) => total + (payment.amount || 0), 0)
// );

// const selectSuccessfulPayments = createSelector(
//   [selectPayments],
//   (payments) => payments.filter(p => p.status === 'paid').length
// );

// export default function Payments() {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const user = useAppSelector(selectUser);
//   const payments = useAppSelector(selectPayments);
//   const upcomingPayment = useAppSelector(selectUpcomingPayment);
//   const currentDoctor = useAppSelector(selectCurrentDoctor);
//   const currentAppointment = useAppSelector(selectCurrentAppointment);
//   const totalSpent = useAppSelector(selectTotalSpent);
//   const successfulPayments = useAppSelector(selectSuccessfulPayments);
  
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card_4581");

//   // Formatting functions
//   const formatDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric'
//       });
//     } catch {
//       return 'Invalid date';
//     }
//   };
  
//   const formatTime = (timeString) => {
//     return timeString || '--:--';
//   };
  
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0
//     }).format(amount || 0);
//   };

//   // Load Razorpay script dynamically
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     script.onload = () => setLoading(false);
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handlePayment = async (paymentData) => {
//     if (!paymentData) {
//       toast.error("No payment data available");
//       return;
//     }

//     setIsProcessing(true);
//     try {
//       const response = await axiosInstance.post('/payments/create-order', {
//         amount: paymentData.fee,
//         appointmentId: paymentData._id,
//         doctorId: paymentData.doctorId,
//         date: paymentData.date,
//         time: paymentData.time
//       });
      
//       const { orderId, amount } = response.data;
  
//       const options = {
//         key: process.env.VITE_RAZORPAY_KEY_ID,
//         amount: amount * 100,
//         currency: "INR",
//         name: "MediCare Appointments",
//         description: `Payment for appointment with Dr. ${paymentData.doctorName}`,
//         order_id: orderId,
//         handler: async (response) => {
//           try {
//             await axiosInstance.post('/payments/verify-payment', {
//               paymentId: response.razorpay_payment_id,
//               orderId: response.razorpay_order_id,
//               signature: response.razorpay_signature,
//               appointmentData: paymentData
//             });
            
//             toast.success("Payment Successful! Appointment confirmed.");
//             dispatch(clearBookingInfo());
//             dispatch(clearUpcomingPayment());
//             navigate('/patient/appointments');
//           } catch (error) {
//             console.error("Payment verification failed:", error);
//             toast.error("Payment verification failed. Please contact support.");
//           }
//         },
//         prefill: {
//           name: user?.fullName || "",
//           email: user?.email || "",
//           contact: user?.phoneNumber || ""
//         },
//         theme: {
//           color: "#6d28d9",
//         },
//         modal: {
//           ondismiss: () => {
//             toast.info("Payment window closed");
//             setIsProcessing(false);
//           }
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.on('payment.failed', (response) => {
//         toast.error(`Payment failed: ${response.error.description}`);
//         setIsProcessing(false);
//       });
//       rzp.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error(error.response?.data?.message || "Payment failed. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const downloadReceipt = async (paymentId) => {
//     try {
//       const response = await axiosInstance.get(`/payments/receipt/${paymentId}`, {
//         responseType: 'blob'
//       });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `receipt-${paymentId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       toast.error("Failed to download receipt");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-6 space-y-6">
//         <Skeleton className="h-10 w-64" />
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {[1, 2, 3].map((i) => (
//             <Skeleton key={i} className="h-32" />
//           ))}
//         </div>
//         <Skeleton className="h-96" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//             <IndianRupee className="h-6 w-6" />
//             Payments
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Manage your payment history and upcoming payments
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" onClick={() => navigate('/patient/appointments')}>
//             <History className="mr-2 h-4 w-4" />
//             View Appointments
//           </Button>
//           <Button variant="outline" onClick={() => navigate('/patient/doctors')}>
//             <User className="mr-2 h-4 w-4" />
//             Find Doctors
//           </Button>
//         </div>
//       </div>

//       {/* Current Appointment Payment Section */}
//       {currentAppointment && (
//         <Card className="border-l-4 border-l-primary">
//           <CardHeader>
//             <div className="flex items-center gap-2">
//               <CheckCircle className="h-5 w-5 text-primary" />
//               <div>
//                 <CardTitle>Confirm Your Appointment</CardTitle>
//                 <CardDescription>
//                   Complete payment to secure your appointment with Dr. {currentAppointment.doctorName}
//                 </CardDescription>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//               <div className="space-y-1">
//                 <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
//                   <User className="h-4 w-4" />
//                   Doctor
//                 </p>
//                 <p className="font-medium">{currentAppointment.doctorName}</p>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
//                   <Calendar className="h-4 w-4" />
//                   Date & Time
//                 </p>
//                 <p className="font-medium">
//                   {formatDate(currentAppointment.date)} at {formatTime(currentAppointment.time)}
//                 </p>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
//                   <IndianRupee className="h-4 w-4" />
//                   Consultation Fee
//                 </p>
//                 <p className="font-medium">{formatCurrency(currentAppointment.fee)}</p>
//               </div>
//             </div>
            
//             <div className="border-t pt-4">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                 <div className="space-y-1">
//                   <p className="text-sm font-medium text-gray-500">Total Amount</p>
//                   <p className="text-2xl font-bold text-primary">
//                     {formatCurrency(currentAppointment.fee)}
//                   </p>
//                 </div>
//                 <div className="w-full md:w-auto space-y-4">
//                   <PaymentMethodSelector 
//                     value={selectedPaymentMethod}
//                     onChange={setSelectedPaymentMethod}
//                   />
//                   <Button 
//                     onClick={() => handlePayment(currentAppointment)}
//                     disabled={isProcessing}
//                     className="w-full md:w-auto"
//                   >
//                     {isProcessing ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <ShieldCheck className="mr-2 h-4 w-4" />
//                         Pay Securely
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Spent
//             </CardTitle>
//             <IndianRupee className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
//             <p className="text-xs text-muted-foreground">
//               {successfulPayments} successful payments
//             </p>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Payment Method
//             </CardTitle>
//             <CreditCard className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">Visa **** 4581</div>
//             <p className="text-xs text-muted-foreground">
//               Default payment method
//             </p>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Upcoming Payment
//             </CardTitle>
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             {upcomingPayment ? (
//               <>
//                 <div className="text-2xl font-bold">
//                   {formatCurrency(upcomingPayment.fee || upcomingPayment.amount)}
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   Due on {formatDate(upcomingPayment.date)}
//                 </p>
//               </>
//             ) : (
//               <div className="text-2xl font-bold">--</div>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Payment History */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <History className="h-5 w-5" />
//             Payment History
//           </CardTitle>
//           <CardDescription>Your past payments for medical services</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[150px]">Date & Time</TableHead>
//                   <TableHead>Doctor</TableHead>
//                   <TableHead>Service</TableHead>
//                   <TableHead className="text-right">Amount</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {payments.length > 0 ? (
//                   payments.map(payment => (
//                     <TableRow key={payment._id || payment.id}>
//                       <TableCell>
//                         <div className="font-medium">{formatDate(payment.date)}</div>
//                         <div className="text-xs text-muted-foreground">
//                           {formatTime(payment.time)}
//                         </div>
//                       </TableCell>
//                       <TableCell className="font-medium">
//                         {payment.doctorName}
//                       </TableCell>
//                       <TableCell>{payment.service}</TableCell>
//                       <TableCell className="text-right">
//                         {formatCurrency(payment.amount)}
//                       </TableCell>
//                       <TableCell>
//                         <Badge 
//                           variant={payment.status === "paid" ? "default" : "destructive"}
//                           className="flex items-center gap-1"
//                         >
//                           {payment.status === "paid" ? (
//                             <>
//                               <CheckCircle className="h-3 w-3" />
//                               <span>Paid</span>
//                             </>
//                           ) : (
//                             <>
//                               <XCircle className="h-3 w-3" />
//                               <span>Failed</span>
//                             </>
//                           )}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <Button 
//                           variant="ghost" 
//                           size="sm"
//                           onClick={() => downloadReceipt(payment._id)}
//                         >
//                           <FileText className="mr-2 h-4 w-4" />
//                           Receipt
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={6} className="h-24 text-center">
//                       No payment history found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//         {payments.length > 0 && (
//           <CardFooter className="flex justify-between">
//             <div className="text-sm text-muted-foreground">
//               Showing {payments.length} payments
//             </div>
//             <Button variant="outline" size="sm">
//               <Download className="mr-2 h-4 w-4" />
//               Export All
//             </Button>
//           </CardFooter>
//         )}
//       </Card>
//     </div>
//   );
// }