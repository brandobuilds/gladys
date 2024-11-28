export function generateTimeOptions() {
  const options = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    const label = formatHour(hour);
    options.push({ value: hour, label });
  }
  return options;
}

export function formatHour(hour: string): string {
  const hourNum = parseInt(hour, 10);
  if (hourNum === 0) return '12:00 AM';
  if (hourNum === 12) return '12:00 PM';
  return hourNum > 12 
    ? `${hourNum - 12}:00 PM`
    : `${hourNum}:00 AM`;
}

export function generateDefaultHours(frequency: number): string[] {
  if (frequency === 1) return ['09'];
  
  const startHour = 9;  // 9 AM
  const endHour = 21;   // 9 PM
  const totalHours = endHour - startHour;
  const interval = Math.floor(totalHours / (frequency - 1));
  
  const hours = [];
  for (let i = 0; i < frequency; i++) {
    const hour = startHour + (i * interval);
    hours.push(hour.toString().padStart(2, '0'));
  }
  
  // Adjust last hour if it exceeds endHour
  if (parseInt(hours[hours.length - 1]) > endHour) {
    hours[hours.length - 1] = endHour.toString().padStart(2, '0');
  }
  
  return hours;
}

export function generateRandomTimes(hours: string[], frequency: number, timezone: string): string[] {
  if (hours.length < 2) return [];
  
  const startHour = parseInt(hours[0]);
  const endHour = parseInt(hours[hours.length - 1]);
  const totalMinutes = (endHour - startHour) * 60;
  const interval = Math.floor(totalMinutes / frequency);
  const variance = Math.floor(interval * 0.3); // 30% variance
  
  const times = new Set<string>();
  
  while (times.size < frequency) {
    for (let i = 0; i < frequency; i++) {
      const baseMinute = i * interval;
      const randomVariance = Math.floor(Math.random() * (variance * 2)) - variance;
      const minute = Math.max(0, Math.min(totalMinutes, baseMinute + randomVariance));
      
      const hour = startHour + Math.floor(minute / 60);
      const min = minute % 60;
      
      const timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      times.add(timeString);
    }
  }
  
  return Array.from(times).sort();
}

export function getCurrentTimeInZone(timezone: string): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone
  });
}

export function getCurrentDayInZone(timezone: string): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: timezone
  });
}

export function getTimezones() {
  return [
    { value: 'America/New_York', label: 'EST/EDT: -05:00' },
    { value: 'America/Chicago', label: 'CST/CDT: -06:00' },
    { value: 'America/Denver', label: 'MST/MDT: -07:00' },
    { value: 'America/Los_Angeles', label: 'PST/PDT: -08:00' },
    { value: 'America/Anchorage', label: 'AKST/AKDT: -09:00' },
    { value: 'Pacific/Honolulu', label: 'HST: -10:00' }
  ];
}