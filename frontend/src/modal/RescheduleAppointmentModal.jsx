import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { toast } from "react-toastify";

const RescheduleAppointmentModal = ({
  showRescheduleModal,
  setShowRescheduleModal,
  selectedAppointment,
  onSubmit,
}) => {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    if (showRescheduleModal && selectedAppointment) {
      // Ensure the date and time are in correct input formats
      const formattedDate = selectedAppointment.date?.slice(0, 10) || "";
      const formattedTime = selectedAppointment.time?.slice(0, 5) || "";

      setNewDate(formattedDate);
      setNewTime(formattedTime);
    }
  }, [showRescheduleModal, selectedAppointment]);

  const handleRescheduleSubmit = () => {
    if (!newDate || !newTime) {
      toast.error("Please select both date and time");
      return;
    }

    onSubmit({ newDate, newTime, appointmentId: selectedAppointment._id });
    toast.success("Appointment rescheduled successfully!");
    setShowRescheduleModal(false);
  };

  return (
    <Dialog open={showRescheduleModal} onOpenChange={setShowRescheduleModal}>
      <DialogContent className="rounded-xl p-6 sm:max-w-[450px] bg-white shadow-lg border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-blue-800 mb-4 text-center">
            Reschedule Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="text-sm font-medium text-gray-700">
              New Date
            </label>
            <Input
              id="date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="time" className="text-sm font-medium text-gray-700">
              New Time
            </label>
            <Input
              id="time"
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <Button
            onClick={handleRescheduleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-300 mt-2"
          >
            Confirm Reschedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleAppointmentModal;
