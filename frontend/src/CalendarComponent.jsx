/* CalendarComponent.jsx */
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const events = [
  {
    title: "Deep Work Block",
    start: new Date(2025, 3, 24, 9, 0),
    end: new Date(2025, 3, 24, 11, 0),
  },
  {
    title: "Team Meeting",
    start: new Date(2025, 3, 24, 14, 0),
    end: new Date(2025, 3, 24, 15, 0),
  },
];

const CustomEvent = ({ event }) => {
  return (
    <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
      <strong>{event.title}</strong>
    </div>
  );
};

export default function CalendarComponent() {
  return (
    <div
      style={{ height: "80vh", padding: "1rem", backgroundColor: "#1e1e1e" }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week", "day", "agenda"]}
        style={{ backgroundColor: "#2b2b2b", color: "white" }}
        components={{ event: CustomEvent }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.title.includes("Deep")
              ? "#3b82f6"
              : "#10b981",
            color: "white",
            borderRadius: "6px",
            padding: "2px 4px",
          },
        })}
      />
    </div>
  );
}
