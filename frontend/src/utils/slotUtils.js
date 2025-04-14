const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const computeNextAvailableSlot = (slots = []) => {
  const validSlots = slots
    .filter(slot => slot.startTime !== slot.endTime)
    .sort((a, b) => {
      const dayDiff = weekdays.indexOf(a.day) - weekdays.indexOf(b.day);
      return dayDiff !== 0 ? dayDiff : a.startTime.localeCompare(b.startTime);
    });

  return validSlots.length > 0
    ? `${validSlots[0].day}, ${validSlots[0].startTime}`
    : 'Not Available';
};


