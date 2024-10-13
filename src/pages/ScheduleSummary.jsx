import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";

const ScheduleSummary = () => {
  const navigate = useNavigate();
  const { sessions, progressBar, setProgressBar } = useContext(EventContext);

  const sortedSessions = [...sessions].sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );

  const handleBack = () => {
    navigate("/add-sessions");
  };

  const handleNext = () => {
    setProgressBar(progressBar + 1);
    navigate("/confirm-and-save");
  };

  return (
    <div className="space-y-4">
      <header>
        <h2 className="flex justify-between text-2xl font-bold">
          Schedule Summary
          <span className="font-bold">Step {progressBar} of 4</span>
        </h2>
      </header>
      {sortedSessions.length === 0 && (
        <p>No sessions added. Please add sessions to continue.</p>
      )}
      <ul className="space-y-4">
        {sortedSessions.map((session, index) => (
          <li key={index} className="space-y-2 rounded border p-4">
            <div>
              <span className="font-bold">Session Name:</span>{" "}
              {session.sessionName}
            </div>
            <div>
              <span className="font-bold">Start Time:</span> {session.startTime}
            </div>
            <div>
              <span className="font-bold">End Time:</span> {session.endTime}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="rounded bg-gray-500 p-2 text-white hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ScheduleSummary;
