import { Button } from "../../ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card";
import { Calendar, CreditCard, Bell, FileText, MessageCircle, Clock } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { useAppSelector } from "../../../hooks";


export default function Notifications() {
 const user  = useAppSelector((state) =>state.auth.user);
  const patient = user;
  
  // Demo data for notifications
  const notifications = [
    {
      id: "not1",
      userId: "p1",
      title: "Appointment Reminder",
      message: "Your appointment with Dr. Sarah Smith is scheduled for tomorrow at 2:30 PM.",
      createdAt: new Date("2025-04-30T10:00:00"),
      read: false,
      type: "appointment"
    },
    {
      id: "not2",
      userId: "p1",
      title: "New Prescription Available",
      message: "Dr. Michael Johnson has issued a new prescription for you.",
      createdAt: new Date("2025-04-28T14:15:00"),
      read: false,
      type: "prescription"
    },
    {
      id: "not3",
      userId: "p1",
      title: "Payment Confirmation",
      message: "Your payment of $85.00 for appointment on April 25 has been processed successfully.",
      createdAt: new Date("2025-04-25T16:30:00"),
      read: true,
      type: "payment"
    },
    {
      id: "not4",
      userId: "p1",
      title: "Medical Report Uploaded",
      message: "Your blood test results have been uploaded to your medical records.",
      createdAt: new Date("2025-04-20T09:45:00"),
      read: true,
      type: "alert"
    },
    {
      id: "not5",
      userId: "p1",
      title: "Consultation Summary",
      message: "Summary of your video consultation with Dr. Emily Clarke is now available.",
      createdAt: new Date("2025-04-15T17:20:00"),
      read: true,
      type: "system"
    }
  ];
  
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays > 7) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } else if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-5 w-5" />;
      case "payment":
        return <CreditCard className="h-5 w-5" />;
      case "prescription":
        return <FileText className="h-5 w-5" />;
      case "alert":
        return <Bell className="h-5 w-5" />;
      default:
        return <MessageCircle className="h-5 w-5" />;
    }
  };
  
  const getNotificationColor = (type) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-500";
      case "payment":
        return "bg-green-100 text-green-500";
      case "prescription":
        return "bg-purple-100 text-purple-500";
      case "alert":
        return "bg-amber-100 text-amber-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
   
    <div className="container mx-auto">
           
            <header className="bg-background border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                <h1 className="bg-primary text-2xl font-bold">Notifications</h1>
                <p className="text-gray-500 text-sm mt-1">Stay updated with your healthcare journey</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-medical-secondary">{unreadCount} New</Badge>
                  <Button variant="outline" size="sm" className="bg-gray-100 text-black hover:bg-medical-sky hover:text-white">Mark All as Read</Button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
              <Card>
                <CardHeader>
                  <CardTitle>All Notifications</CardTitle>
                  <CardDescription className="text-gray-500">Your recent updates and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-0 p-0">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start p-4 border-b last:border-0 ${!notification.read ? 'bg-secondary/10' : ''}`}
                    >
                      <div className={`p-2 mr-4 rounded-full ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(notification.createdAt)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 text-gray-500">{notification.message}</p>
                      </div>
                    </div>
                  ))}
                  
                  {notifications.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <Bell className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No Notifications</h3>
                      <p className="text-muted-foreground mt-2">
                        You don't have any notifications at the moment
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </main>
      </div>
  
  );
}