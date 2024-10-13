import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import AddSessions from "./pages/AddSessions.jsx";
import ScheduleSummary from "./pages/ScheduleSummary.jsx";
import ConfirmAndSave from "./pages/ConfirmAndSave.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <EventDetails />,
          },
          {
            path: "add-sessions",
            element: <AddSessions />,
          },
          {
            path: "schedule-summary",
            element: <ScheduleSummary />,
          },
          {
            path: "confirm-and-save",
            element: <ConfirmAndSave />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
