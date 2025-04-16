import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

const AvailabilityPage = () => {
    return (


        <Card className="shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Your Availability</CardTitle>
                    <Button size="sm" variant="outline" className="bg-gray-200 text-black hover:bg-medical-sky hover:text-white">Manage</Button>
                </div>
                <CardDescription className="text-gray-400">Configure your available time slots</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {[
                    ["Monday to Friday", "9:00 AM - 5:00 PM"],
                    ["Saturday", "10:00 AM - 3:00 PM"],
                    ["Sunday", "Not available"]
                ].map(([day, time]) => (
                    <div key={day} className="flex items-center justify-between border-b pb-2">
                        <div className="font-medium">{day}</div>
                        <div className="text-sm text-muted-foreground">{time}</div>
                    </div>
                ))}
                <div className="flex items-center justify-between pb-2">
                    <div className="font-medium">Video Consultations</div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-300" variant="outline">Available</Badge>
                </div>
            </CardContent>
        </Card>
    );
};

export default AvailabilityPage;
