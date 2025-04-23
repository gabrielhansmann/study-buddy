/* CalendarComponent.jsx */
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useState } from "react";

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

const getFormattedDate = (date, view) => {
  switch (view) {
    case "month":
      return format(date, "MMMM yyyy");
    case "day":
      return format(date, "d. MMMM yyyy");
    case "week":
    default:
      return format(date, "d. MMMM yyyy");
  }
};

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.WEEK);

  return (
    <div style={{ height: "80vh" }}>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{ fontSize: "1.125rem", fontWeight: 500, color: "#111827" }}
        >
          {getFormattedDate(currentDate, currentView)}
        </div>
        <div>
          <button onClick={() => setCurrentView(Views.DAY)} style={buttonStyle}>
            Day
          </button>
          <button
            onClick={() => setCurrentView(Views.WEEK)}
            style={buttonStyle}
          >
            Week
          </button>
          <button
            onClick={() => setCurrentView(Views.MONTH)}
            style={buttonStyle}
          >
            Month
          </button>
        </div>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.WEEK}
        view={currentView}
        onView={(view) => setCurrentView(view)}
        views={["day", "week", "month"]}
        toolbar={false}
        components={{ event: CustomEvent }}
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
        }}
        date={currentDate}
        onNavigate={(newDate) => setCurrentDate(newDate)}
        dayLayoutAlgorithm="no-overlap"
      />
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#f3f4f6",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  padding: "6px 12px",
  marginLeft: "0.5rem",
  fontWeight: 500,
  cursor: "pointer",
};
