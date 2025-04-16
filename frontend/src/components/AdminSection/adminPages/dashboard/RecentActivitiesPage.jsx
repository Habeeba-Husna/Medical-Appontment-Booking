import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../ui/Card";
import { Avatar, AvatarFallback } from "../../../ui/Avatar";
import { Button } from "../../../ui/Button";

// Dummy activity data
const recentActivities = [
  {
    id: "act1",
    user: "Dr. Sarah Smith",
    action: "Updated availability schedule",
    timestamp: new Date("2025-04-30T09:45:00"),
  },
  {
    id: "act2",
    user: "John Doe",
    action: "Booked appointment with Dr. Michael Brown",
    timestamp: new Date("2025-04-30T08:15:00"),
  },
  {
    id: "act3",
    user: "Dr. David Wilson",
    action: "Uploaded prescription for patient #P12345",
    timestamp: new Date("2025-04-29T17:30:00"),
  },
  {
    id: "act4",
    user: "Admin User",
    action: "Approved doctor registration",
    timestamp: new Date("2025-04-29T16:10:00"),
  },
  {
    id: "act5",
    user: "Emily Johnson",
    action: "Updated medical history",
    timestamp: new Date("2025-04-29T15:45:00"),
  },
];

// Format functions
const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateTime = (date) => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

// Component
const RecentActivitiesPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest actions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="mt-0.5">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      {activity.action}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Activities
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecentActivitiesPage;
