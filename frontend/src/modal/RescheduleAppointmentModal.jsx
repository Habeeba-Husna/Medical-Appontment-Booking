import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogDescription } from "../components/ui/Dialog";
import { Button } from '../components/ui/Button';
import { Input } from "../components/ui/Input";
import { toast } from "react-toastify";
import { Calendar, Clock } from "lucide-react";

const RescheduleAppointmentModal = ({
  showRescheduleModal,
  setShowRescheduleModal,
  selectedAppointment,
  onSubmit,
}) => {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (showRescheduleModal && selectedAppointment) {
      // Ensure the date and time are in correct input formats // Reset form when modal opens
      // const formattedDate = selectedAppointment.date?.slice(0, 10) || "";
      // const formattedTime = selectedAppointment.time?.slice(0, 5) || "";

      const formattedDate = selectedAppointment.date?.split('T')[0] || "";
      const formattedTime = selectedAppointment.time?.slice(0, 5) || "";
      


      setNewDate(formattedDate);
      setNewTime(formattedTime);
      setIsSubmitting(false);
    }
  }, [showRescheduleModal, selectedAppointment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newDate || !newTime) {
      toast.error("Please select both date and time");
      return;
    }

    // Validate future date/time
    const selectedDateTime = new Date(`${newDate}T${newTime}`);
    const now = new Date();
    
    if (selectedDateTime <= now) {
      toast.error("Please select a future date and time");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({ 
        newDate, 
        newTime, 
        appointmentId: selectedAppointment._id 
      });
      toast.success("Appointment rescheduled successfully!");
      setShowRescheduleModal(false);
    } catch (error) {
      toast.error(error.message || "Failed to reschedule appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate minimum date (tomorrow) for date picker
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Dialog open={showRescheduleModal} onOpenChange={setShowRescheduleModal}>
      <DialogContent className="rounded-xl p-6 sm:max-w-[450px] bg-white shadow-lg border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-blue-800 mb-2 text-center">
            Reschedule Appointment
          </DialogTitle>
          <DialogDescription>
      Select a new date and time for your appointment.
    </DialogDescription>
          {selectedAppointment && (
            <div className="text-center text-gray-600 mb-4">
              <p>Current: {new Date(selectedAppointment.date).toLocaleDateString()} at {selectedAppointment.time}</p>
            </div>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                New Date
              </label>
              <Input
                id="date"
                type="date"
                value={newDate}
                min={minDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="time" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                New Time
              </label>
              <Input
                id="time"
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowRescheduleModal(false)}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleAppointmentModal;
