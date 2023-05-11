import data from "@/temp/calendarData";
import { NotecardSet } from "@/values/types";
import { Appointment } from "devextreme/ui/scheduler";
import {
  useMemo,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

export const NotecardSetContext = createContext<{
  notecardSet: NotecardSet;
  setNotecardSet: Dispatch<SetStateAction<NotecardSet>>;
}>({
  notecardSet: {
    id: "",
    name: "",
    isPublic: false,
    nNumber: "",
    creator: {imageUrl: "", name: "", nNumber: ""},
    imageUrl: "",
  },
  setNotecardSet: () => {},
});

export default function NotecardSetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notecardSet, setNotecardSet] = useState<NotecardSet>({
    id: "",
    name: "",
    isPublic: false,
    nNumber: "",
    creator: {imageUrl: "", name: "", nNumber: ""},
    imageUrl: "",
  });

  const notecardSetProviderValue = useMemo(
    () => ({ notecardSet, setNotecardSet }),
    [notecardSet, setNotecardSet]
  );

  return (
    <>
      <NotecardSetContext.Provider value={notecardSetProviderValue}>
        {children}
      </NotecardSetContext.Provider>
    </>
  );
}
