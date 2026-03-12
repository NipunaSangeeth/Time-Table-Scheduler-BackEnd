/**
 * Converts a time string (12-hour or 24-hour format) to total minutes from midnight.
 * This helps correctly compare overlap for Clash Detection.
 * Examples: 
 *   "09:00 AM" => 540
 *   "02:30 PM" => 870
 *   "14:30" => 870
 *   "9:00" => 540
 * 
 * @param {string} timeStr - The time string from the frontend.
 * @returns {number} Total minutes since midnight.
 */
function convertTimeToMinutes(timeStr) {
  if (!timeStr) return 0;
  
  // Clean string and standardize
  const cleanStr = timeStr.trim().toUpperCase();
  
  // Extract hours and minutes
  const match = cleanStr.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)?$/);
  
  if (!match) {
    console.warn(`[Anti-Clash] Invalid time format passed: ${timeStr}`);
    return 0; // Or throw error
  }
  
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const modifier = match[3]; // AM or PM
  
  // Handle 12-hour format logic
  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }
  
  return (hours * 60) + minutes;
}

module.exports = {
  convertTimeToMinutes
};
