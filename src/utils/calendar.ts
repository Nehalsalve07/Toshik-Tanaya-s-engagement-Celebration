export const WEDDING_DETAILS = {
  groom: "Toshik Karadbhajne",
  bride: "Tanaya Sarve",
  groomParents: "Mr. Dinkar Karadbhajne & Mrs. Vandana Karadbhajne",
  brideParents: "Mr. Dattatray Sarve & Mrs. Sharayu Sarve",
  dateString: "10 November 2026",
  timeString: "4:30 PM IST",
  eventDate: new Date("2026-11-10T16:30:00+05:30"),
  venueName: "Aditya villa",
  venueAddress: "Plot no . 141 Shri Suraj Gruhniwaran soc, Besa-Pipla Rd, New Hanuman Nagar, Besa Pipla, Maharashtra 440037",
  mapSearchQuery: "Aditya villa Plot no 141 Shri Suraj Gruhniwaran soc Besa-Pipla Rd New Hanuman Nagar Besa Pipla Maharashtra 440037",
};

export function getGoogleCalendarUrl(): string {
  const startTime = "20261110T110000Z"; // 4:30 PM IST in UTC is 11:00 AM UTC
  const endTime = "20261110T180000Z"; // 11:30 PM IST in UTC is 6:00 PM UTC
  const title = encodeURIComponent("Engagement Ceremony: Toshik & Tanaya");
  const details = encodeURIComponent(
    `Auspicious Engagement Ceremony and Sakharpuda / Ring Ceremony of Toshik Karadbhajne (Son of Mr. Dinkar & Mrs. Vandana Karadbhajne) and Tanaya Sarve (Daughter of Mr. Dattatray & Mrs. Sharayu Sarve).\n\nVenue: Aditya villa, Plot no . 141 Shri Suraj Gruhniwaran soc, Besa-Pipla Rd, New Hanuman Nagar, Besa Pipla, Maharashtra 440037.\nCeremony starts at 4:30 PM.`
  );
  const location = encodeURIComponent(WEDDING_DETAILS.venueAddress);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
}

export function downloadIcsFile(): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Toshik and Tanaya Engagement Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:engagement-toshik-tanaya-20261110@weddingcelebration.in",
    "DTSTAMP:20261013T000000Z",
    "DTSTART:20261110T110000Z",
    "DTEND:20261110T180000Z",
    "SUMMARY:Engagement Ceremony: Toshik & Tanaya",
    "DESCRIPTION:Celebrate the auspicious engagement ceremony and Sakharpuda of Toshik Karadbhajne & Tanaya Sarve at Aditya Villa\\, Besa-Pipla\\, Maharashtra.",
    `LOCATION:${WEDDING_DETAILS.venueAddress.replace(/,/g, "\\,")}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Toshik_Tanaya_Engagement.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
