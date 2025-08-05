import Select from '@/components/Select';
import AppIcon from '@/components/AppIcon';
import type { ProfileData } from '@/types/profile';

// Timezone options for dropdown
const timezones = [
  { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
  { value: 'UTC-7', label: 'Mountain Time (UTC-7)' },
  { value: 'UTC-6', label: 'Central Time (UTC-6)' },
  { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
  { value: 'UTC+0', label: 'GMT (UTC+0)' },
  { value: 'UTC+1', label: 'Central European Time (UTC+1)' },
  { value: 'UTC+5:30', label: 'India Standard Time (UTC+5:30)' },
  { value: 'UTC+8', label: 'China Standard Time (UTC+8)' },
  { value: 'UTC+9', label: 'Japan Standard Time (UTC+9)' },
];

// Weekly commitment options for dropdown
const commitmentOptions = [
  { value: '1-2-hours', label: '1-2 hours per week' },
  { value: '3-5-hours', label: '3-5 hours per week' },
  { value: '6-10-hours', label: '6-10 hours per week' },
  { value: '10-plus-hours', label: '10+ hours per week' },
  { value: 'flexible', label: 'Flexible schedule' },
];

// Days of the week
const weekdays = [
  { id: 'monday', label: 'Monday', short: 'Mon' },
  { id: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { id: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { id: 'thursday', label: 'Thursday', short: 'Thu' },
  { id: 'friday', label: 'Friday', short: 'Fri' },
  { id: 'saturday', label: 'Saturday', short: 'Sat' },
  { id: 'sunday', label: 'Sunday', short: 'Sun' },
];

// Time slots for each day
const timeSlots = [
  { id: 'early-morning', label: 'Early Morning', time: '6:00 - 9:00 AM' },
  { id: 'morning', label: 'Morning', time: '9:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 - 5:00 PM' },
  { id: 'evening', label: 'Evening', time: '5:00 - 8:00 PM' },
  { id: 'night', label: 'Night', time: '8:00 - 11:00 PM' },
];

// Props expected from parent component
interface AvailabilityProps {
  data: ProfileData;
  errors: Record<string, string>;
  onUpdate: (stepData: ProfileData) => void;
}

// Helper to create "day time-slot" combinations like "monday morning"
const generateAvailability = (days: string[], slots: string[]) =>
  days.flatMap((day) => slots.map((slot) => `${day} ${slot}`));

// Pre-filtered day and time slot arrays for quick selection buttons
const weekdayIds = weekdays
  .filter((d) => !['saturday', 'sunday'].includes(d.id))
  .map((d) => d.id);
const weekendIds = weekdays
  .filter((d) => ['saturday', 'sunday'].includes(d.id))
  .map((d) => d.id);
const businessSlotIds = timeSlots
  .filter((s) => !['night', 'early-morning'].includes(s.id))
  .map((s) => s.id);
const eveningSlotIds = timeSlots
  .filter((s) => s.id === 'evening')
  .map((s) => s.id);
const allSlotIds = timeSlots.map((s) => s.id);
const allDayIds = weekdays.map((d) => d.id);

// Main component
function Availability({ data, errors, onUpdate }: AvailabilityProps) {
  // Toggles a single time-slot for a given day
  const toggleAvailability = (day: string, slot: string) => {
    const key = `${day} ${slot}`;
    const currentAvailability = data.availability || [];

    const newAvailability = currentAvailability.includes(key)
      ? currentAvailability.filter((item) => item !== key) // remove if already selected
      : [...currentAvailability, key]; // add if not selected

    onUpdate({ ...data, availability: newAvailability });
  };

  // Sets availability with given days and slots
  const updateAvailability = (dayIds: string[], slotIds: string[]) => {
    onUpdate({ ...data, availability: generateAvailability(dayIds, slotIds) });
  };

  return (
    <section className='space-y-5'>
      {/* Header */}
      <h1 className='text-2xl font-semibold text-center'>
        When are you available?
      </h1>
      <p className='text-muted-foreground text-center'>
        Select your preferred time slots to help us match you with partners in
        compatible schedules
      </p>

      {/* Timezone selection */}
      <h2 className='text-lg font-semibold'>Your Timezone</h2>
      <Select options={timezones} variant='search' />

      {/* Weekly commitment */}
      <h2 className='text-lg font-semibold'>
        Your Commitment <span className='text-red-500'>*</span>
      </h2>
      <Select
        options={commitmentOptions}
        value={data.timeCommitment}
        onChange={(value) => onUpdate({ ...data, timeCommitment: value })}
        error={errors.timeCommitment}
      />

      {/* Availability grid */}
      <h2 className='text-lg font-semibold'>
        Weekly Availability <span className='text-red-500'>*</span>
      </h2>
      <div className='overflow-x-auto space-y-2'>
        <table className='table-auto border-collapse border border-gray-300 w-full text-sm text-center'>
          <thead>
            <tr className='bg-gray-100 dark:bg-gray-700'>
              <th className='border border-gray-300 p-2'>Days</th>
              {weekdays.map((day) => (
                <th key={day.id} className='border border-gray-300 p-2'>
                  {day.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot.id}>
                <td className='border border-gray-300 p-2 font-medium'>
                  {slot.label}
                  <div className='text-xs text-gray-500'>{slot.time}</div>
                </td>
                {weekdays.map((day) => {
                  const key = `${day.id} ${slot.id}`;
                  const isSelected = data.availability?.includes(key);
                  return (
                    <td
                      key={day.id}
                      className={`p-2 cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      title={`${day.label} - ${slot.label}`}
                      onClick={() => toggleAvailability(day.id, slot.id)}
                    >
                      {isSelected && <AppIcon name='Check' size={20} />}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {errors.availability && (
          <p className='text-sm text-destructive'>{errors.availability}</p>
        )}
      </div>

      {/* Quick selection buttons */}
      <div className='flex flex-wrap gap-2'>
        <h3 className='text-sm font-semibold w-full'>Quick Selection</h3>
        <button
          className='hover:border-primary border p-2 rounded-lg'
          onClick={() => updateAvailability(weekdayIds, businessSlotIds)}
        >
          Weekdays Business Hours
        </button>
        <button
          className='hover:border-primary border p-2 rounded-lg'
          onClick={() => updateAvailability(weekendIds, allSlotIds)}
        >
          Weekends
        </button>
        <button
          className='hover:border-primary border p-2 rounded-lg'
          onClick={() => updateAvailability(allDayIds, eveningSlotIds)}
        >
          Evenings Only
        </button>
        <button
          className='hover:border-red-500 border p-2 rounded-lg text-red-500'
          onClick={() => onUpdate({ ...data, availability: [] })}
        >
          Clear All
        </button>
      </div>
    </section>
  );
}

export default Availability;
