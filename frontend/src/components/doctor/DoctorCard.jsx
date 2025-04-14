import React from 'react';
import { Star, MapPin, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full p-4 shadow-md rounded-xl relative">
      {/* Top-right rating */}
      {/* <div className="absolute top-4 right-4 flex items-center text-yellow-500 font-semibold">
        <Star className="w-4 h-4 fill-yellow-500 mr-1" />
        <span>{doctor.rating || 'N/A'}</span>
      </div> */}

<div className="absolute top-4 right-4 flex items-center text-yellow-500 font-semibold space-x-1"
title={`Rated ${doctor.rating || 'N/A'} by ${doctor.totalRatings || 0} users`}
>
  <Star className="w-4 h-4 fill-yellow-500" />
  <span>{doctor.rating || 'N/A'}</span>
  <span className="text-gray-500 text-sm">
    ({doctor.totalRatings || 0})
  </span>
</div>


      <CardContent className="p-0">
        {/* Top row: Small photo and text info */}
        <div className="flex gap-4 items-start">
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={doctor.imageUrl  || '/doctor-placeholder.png'}
              alt={doctor.fullName}
            />
            <AvatarFallback>{doctor.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
            <p className="text-sm text-gray-500">{doctor.specialization}</p>

            <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
              <span className="bg-sky-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                {doctor.experience} yrs exp
              </span>

              <div className="flex items-center gap-1 text-gray-700">
                <MapPin size={16} />
                <span>{doctor.clinicDetails || 'Not Provided'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar below photo and info */}
        <div className="flex items-center gap-1 text-sm text-gray-700 mt-4 ml-1">
          <CalendarDays size={16} className="text-blue-800" />
          <span>Next available: {doctor.nextAvailable || 'Not Available'}</span>
        </div>

        {/* Full-width buttons */}
        <div className="w-full bg-gray-100 mt-4 p-3 rounded">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-blue-800 text-blue-800 hover:bg-sky-200 hover:text-black"
              onClick={() => navigate(`/doctors/${doctor._id}`)} 
            >
              View Profile
            </Button>
            <Button
              className="w-full sm:w-auto bg-sky-400 text-white hover:bg-blue-800"
              onClick={() => navigate(`/book-appointment/${doctor._id}`)}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
