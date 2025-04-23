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
    title: "Linear Algebra",
    start: new Date(2025, 3, 21, 9, 0),
    end: new Date(2025, 3, 21, 10, 0),
    color: "#bfdbfe",
  },
  {
    title: "Computer Science",
    start: new Date(2025, 3, 23, 11, 0),
    end: new Date(2025, 3, 23, 12, 0),
    color: "#bfdbfe",
  },
  {
    title: "Computer Science",
    start: new Date(2025, 3, 21, 13, 0),
    end: new Date(2025, 3, 21, 14, 0),
    color: "#bfdbfe",
  },
  {
    title: "History",
    start: new Date(2025, 3, 23, 14, 0),
    end: new Date(2025, 3, 23, 15, 0),
    color: "#e5e7eb",
  },
];

const CustomEvent = ({ event }) => {
  return (
    <div
      style={{
        padding: "6px 10px",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: 500,
        backgroundColor: event.color,
        color: "#111827",
      }}
    >
      {event.title}
    </div>
  );
};

export default function CalendarComponent() {
  return (
    <div style={{ height: "75vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week"]}
        toolbar={false}
        components={{ event: CustomEvent }}
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
        }}
        dayLayoutAlgorithm="no-overlap"
      />
    </div>
  );
}
