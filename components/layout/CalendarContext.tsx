import data from "@/temp/calendarData";
import { Appointment } from "devextreme/ui/scheduler";
import { useMemo, useState, createContext, Dispatch, SetStateAction } from "react";

export const CalendarContext = createContext<{
  events: Appointment[];
  setEvents: Dispatch<SetStateAction<Appointment[]>>;
}>({
  events: data,
  setEvents: () => {},
});

export default function EventsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, setEvents] = useState(data);

  const eventsProviderValue = useMemo(() => ({ events, setEvents }), [events, setEvents]);

  return (
    <>
      <CalendarContext.Provider value={eventsProviderValue}>
        {children}
      </CalendarContext.Provider>
    </>
  );
}
