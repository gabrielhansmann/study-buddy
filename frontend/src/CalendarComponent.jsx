/* CalendarComponent.jsx */
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay, getISOWeek } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useState } from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
  Button,
} from "@mui/material";

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
      return `KW ${getISOWeek(date)} – ${format(date, "MMMM yyyy")}`;
    default:
      return format(date, "d. MMMM yyyy");
  }
};

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.WEEK);

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setCurrentView(newView);
    }
  };

  const handleToday = () => setCurrentDate(new Date());
  const handleNext = () => {
    const next = new Date(currentDate);
    if (currentView === Views.MONTH) next.setMonth(next.getMonth() + 1);
    else if (currentView === Views.WEEK) next.setDate(next.getDate() + 7);
    else next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  const handleBack = () => {
    const prev = new Date(currentDate);
    if (currentView === Views.MONTH) prev.setMonth(prev.getMonth() - 1);
    else if (currentView === Views.WEEK) prev.setDate(prev.getDate() - 7);
    else prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

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
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <ButtonGroup variant="outlined" size="small">
            <Button onClick={handleToday}>Today</Button>
            <Button onClick={handleBack}>← Back</Button>
            <Button onClick={handleNext}>Next →</Button>
          </ButtonGroup>
          <ToggleButtonGroup
            value={currentView}
            exclusive
            onChange={handleViewChange}
            size="small"
            color="primary"
          >
            <ToggleButton value={Views.DAY}>Day</ToggleButton>
            <ToggleButton value={Views.WEEK}>Week</ToggleButton>
            <ToggleButton value={Views.MONTH}>Month</ToggleButton>
          </ToggleButtonGroup>
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
