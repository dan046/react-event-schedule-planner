import { Outlet } from "react-router-dom";
import { EventProvider } from "./context/EventContext";

const App = () => {
  return (
    <EventProvider>
      <Outlet />
    </EventProvider>
  );
};

export default App;
