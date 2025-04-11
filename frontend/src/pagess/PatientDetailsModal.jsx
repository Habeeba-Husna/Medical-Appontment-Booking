import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from '../components/ui/Dialog';
import { Button } from '../components/ui/Button';

const PatientDetailsModal = ({ patient }) => {
  if (!patient) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
          <DialogDescription>
            View complete information of the patient.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Name:</span> {patient.fullName}</p>
          <p><span className="font-medium">Email:</span> {patient.email}</p>
          <p><span className="font-medium">Phone:</span> {patient.phoneNumber}</p>
          <p><span className="font-medium">Age:</span> {patient.age}</p>
          <p><span className="font-medium">Gender:</span> {patient.gender}</p>
          <p><span className="font-medium">Medical History:</span> {patient.medicalHistory || 'N/A'}</p>
        </div>
        <DialogClose asChild>
          <Button className="mt-4">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsModal;
