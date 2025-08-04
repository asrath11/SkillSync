import Select from '@/components/Select';
import { useProfile } from '@/context/profileProvider';
import AppIcon from '@/components/AppIcon';
import { ValidationErrorDisplay } from '@/components/ui/validation-error';
import type { ValidationError } from '@/types/profile';
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
const commitmentOptions = [
  { value: '1-2-hours', label: '1-2 hours per week' },
  { value: '3-5-hours', label: '3-5 hours per week' },
  { value: '6-10-hours', label: '6-10 hours per week' },
  { value: '10-plus-hours', label: '10+ hours per week' },
  { value: 'flexible', label: 'Flexible schedule' },
];
const weekdays = [
  { id: 'monday', label: 'Monday', short: 'Mon' },
  { id: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { id: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { id: 'thursday', label: 'Thursday', short: 'Thu' },
  { id: 'friday', label: 'Friday', short: 'Fri' },
  { id: 'saturday', label: 'Saturday', short: 'Sat' },
  { id: 'sunday', label: 'Sunday', short: 'Sun' },
];

const timeSlots = [
  { id: 'early-morning', label: 'Early Morning', time: '6:00 - 9:00 AM' },
  { id: 'morning', label: 'Morning', time: '9:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 - 5:00 PM' },
  { id: 'evening', label: 'Evening', time: '5:00 - 8:00 PM' },
  { id: 'night', label: 'Night', time: '8:00 - 11:00 PM' },
];

interface AvailabilityProps {
  validationErrors?: ValidationError[];
}

function Availability({ validationErrors = [] }: AvailabilityProps) {
  const { profile, setProfile } = useProfile();
  const toggleAvailability = (day: string, slot: string) => {
    setProfile({
      ...profile,
      availability: profile.availability.includes(`${day} ${slot}`)
        ? profile.availability.filter((d) => d !== `${day} ${slot}`)
        : [...profile.availability, `${day} ${slot}`],
    });
  };
  const clearAvailability = () => {
    setProfile({
      ...profile,
      availability: [],
    });
  };
  const handleWeekdays = () => {
    const weekdaysSlots = timeSlots
      .filter((slot) => slot.id !== 'night' && slot.id !== 'early-morning')
      .map((slot) => `${slot.id}`);
    const Weekdays = weekdays
      .filter((days) => days.id !== 'saturday' && days.id !== 'sunday')
      .map((day) => `${day.id}`);
    const daySlot = Weekdays.map((day) =>
      weekdaysSlots.map((slot) => `${day} ${slot}`)
    ).flat();
    setProfile({
      ...profile,
      availability: [...daySlot],
    });
  };
  const handleWeekends = () => {
    const weekendsSlots = timeSlots.map((slot) => `${slot.id}`);
    const Weekends = weekdays
      .filter((days) => days.id === 'saturday' || days.id === 'sunday')
      .map((day) => `${day.id}`);
    const daySlot = Weekends.map((day) =>
      weekendsSlots.map((slot) => `${day} ${slot}`)
    ).flat();
    setProfile({
      ...profile,
      availability: [...daySlot],
    });
  };
  const handleEvenings = () => {
    const eveningsSlots = timeSlots
      .filter((slot) => slot.id === 'evening')
      .map((slot) => `${slot.id}`);
    const Weekends = weekdays.map((day) => `${day.id}`);
    const daySlot = Weekends.map((day) =>
      eveningsSlots.map((slot) => `${day} ${slot}`)
    ).flat();
    setProfile({
      ...profile,
      availability: [...daySlot],
    });
  };
  return (
    <section className='space-y-5'>
      <h1 className='text-2xl font-semibold text-center'>
        When are you available?
      </h1>
      <p className='text-muted-foreground text-center'>
        Select your preferred time slots to help us match you with partners in
        compatible schedules
      </p>
      <h1 className='text-lg font-semibold'>Your Timezone</h1>
      <Select options={timezones} variant='search' />
      <h1 className='text-lg font-semibold'>Your Commitment</h1>
      <Select options={commitmentOptions} />
      <h1 className='text-lg font-semibold'>
        Weekly Availability <span className='text-red-500'>*</span>
      </h1>
      <div className='overflow-x-auto'>
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
                {weekdays.map((day) => (
                  <td
                    key={day.id}
                    className={
                      profile.availability.includes(`${day.id} ${slot.id}`)
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-gray-300 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
                    }
                    onClick={() => toggleAvailability(day.id, slot.id)}
                  >
                    {profile.availability.includes(`${day.id} ${slot.id}`) ? (
                      <AppIcon name='Check' size={20} />
                    ) : (
                      ''
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='space-y-2 space-x-2'>
        <h1 className='text-sm font-semibold'>Quick Selection</h1>
        <button
          className='hover:border-primary border p-2 rounded-lg cursor-pointer'
          onClick={handleWeekdays}
        >
          Weekdays Business Hours
        </button>
        <button
          className='hover:border-primary border p-2 rounded-lg cursor-pointer'
          onClick={handleWeekends}
        >
          Weekends
        </button>
        <button
          className='hover:border-primary border p-2 rounded-lg cursor-pointer'
          onClick={handleEvenings}
        >
          Evenings Only
        </button>
        <button
          className='hover:border-red-500 border p-2 rounded-lg text-red-500 cursor-pointer'
          onClick={clearAvailability}
        >
          Clear All
        </button>
      </div>
      <ValidationErrorDisplay errors={validationErrors} />
    </section>
  );
}

export default Availability;
