/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    eventDate: "",
    location: "",
    contactEmail: "",
    description: "",
  });

  const [sessions, setSessions] = useState([]);

  const [progressBar, setProgressBar] = useState(1);

  return (
    <EventContext.Provider
      value={{
        eventDetails,
        setEventDetails,
        sessions,
        setSessions,
        progressBar,
        setProgressBar,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
