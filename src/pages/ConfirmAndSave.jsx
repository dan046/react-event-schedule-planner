import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";

const ConfirmAndSave = () => {
  const navigate = useNavigate();
  const {
    eventDetails,
    sessions,
    setEventDetails,
    setSessions,
    progressBar,
    setProgressBar,
  } = useContext(EventContext);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // throw new Error("Something went wrong"); // Uncomment this line to test error handling
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving event:", error);
      setSaveError("An error occurred while saving. Please try again.");
    } finally {
      setIsSaving(false);

      // clear the event details and sessions after saving - cleanup
      setEventDetails({
        eventName: "",
        eventDate: "",
        location: "",
        contactEmail: "",
        description: "",
      });

      setSessions([]);
      setProgressBar(1);
    }
  };

  const handleBack = () => {
    navigate("/schedule-summary");
  };

  if (isSaved) {
    return (
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">Event Saved Successfully!</h2>
        <p>
          Your event has been saved. You can now close this page or start a new
          event.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Start New Event
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="flex justify-between text-2xl font-bold">
          Confirm and Save
          <span className="font-bold">Step {progressBar} of 4</span>
        </h2>
      </header>

      <div className="rounded border p-4">
        <h3 className="text-lg font-bold">Event Details</h3>
        <div>
          <p>
            <span className="font-bold">Event Name:</span>{" "}
            {eventDetails.eventName}
          </p>
        </div>
        <div>
          <span className="font-bold">Event Date:</span>{" "}
          {eventDetails.eventDate}
        </div>

        <div>
          <span className="font-bold">Location:</span> {eventDetails.location}
        </div>

        <div>
          <span className="font-bold">Contact Email:</span>{" "}
          {eventDetails.contactEmail}
        </div>

        <div>
          <span className="font-bold">Description:</span>{" "}
          {eventDetails.description}
        </div>

        <hr className="mb-4 mt-4" />

        <div>
          <h3 className="mb-2 text-lg font-bold">Sessions</h3>
          {sessions.length === 0 ? (
            <p className="mb-2">No sessions added</p>
          ) : (
            <ul className="mb-4 space-y-2">
              {sessions.map((session, index) => (
                <li key={index} className="space-y-2">
                  <h4 className="text-md font-semibold">
                    {session.sessionName}
                  </h4>
                  <div>
                    <span className="font-semibold">Speaker:</span>{" "}
                    {session.speakerName}
                  </div>
                  <div>
                    <span className="font-semibold">Start Time:</span>{" "}
                    {session.startTime}
                  </div>
                  <div>
                    <span className="font-semibold">End Time:</span>{" "}
                    {session.endTime}
                  </div>
                  <div>
                    <span className="font-semibold">Description:</span>{" "}
                    {session.description}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {saveError && (
          <div className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {saveError}
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <button
            onClick={handleBack}
            className="rounded bg-gray-500 p-2 text-white hover:bg-gray-600"
          >
            Back to Summary
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`${
              isSaving ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
            } rounded p-2 text-white`}
          >
            {isSaving ? "Saving..." : "Save Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAndSave;
