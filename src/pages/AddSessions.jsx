import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sessionSchema } from "../schema/schema";

const AddSessions = () => {
  const navigate = useNavigate();
  const { sessions, setSessions, progressBar, setProgressBar } =
    useContext(EventContext);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(sessionSchema),
    setFocus: true,
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API request
      // throw new Error("Something went wrong"); // Uncomment this line to test error handling
      setSessions([...sessions, data]);
      reset();
    } catch (error) {
      setError("root", {
        message: error.message,
      });
    }
  };

  const handleRemove = (index) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  const handlePrevious = () => {
    setProgressBar(progressBar - 1);
    navigate("/");
  };

  const handleNext = () => {
    setProgressBar(progressBar + 1);
    navigate("/schedule-summary");
  };

  return (
    <div className="space-y-4">
      <h2 className="flex justify-between text-2xl font-bold">
        Add Sessions
        <span className="font-bold">Step {progressBar} of 4</span>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="sessionName">Session Name</label>
          <input
            {...register("sessionName")}
            placeholder="Session Name"
            className="w-full rounded border p-2"
          />
          {errors.sessionName && (
            <p className="text-red-500">{errors.sessionName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="speakerName">Speaker Name</label>
          <input
            type="text"
            {...register("speakerName")}
            placeholder="Speaker Name"
            className="w-full rounded border p-2"
          />
          {errors.speakerName && (
            <p className="text-red-500">{errors.speakerName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            {...register("startTime")}
            className="w-full rounded border p-2"
          />
          {errors.startTime && (
            <p className="text-red-500">{errors.startTime.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            {...register("endTime")}
            className="w-full rounded border p-2"
          />
          {errors.endTime && (
            <p className="text-red-500">{errors.endTime.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="description">Session Description</label>
          <textarea
            {...register("description")}
            placeholder="Session Description (optional)"
            className="w-full rounded border p-2"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div>
          {errors.root && (
            <p className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
              {errors.root.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 p-2 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Session"}
        </button>
      </form>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Sessions</h3>
        <ul className="space-y-4">
          {sessions.map((session, index) => (
            <li key={index} className="space-y-2 rounded border p-4">
              <h4 className="text-xl font-bold">{session.sessionName}</h4>
              <p>
                <span className="font-bold">Speaker:</span>{" "}
                {session.speakerName}
              </p>
              <p>
                <span className="font-bold">Start Time:</span>{" "}
                {session.startTime}
              </p>
              <p>
                <span className="font-bold">End Time:</span> {session.endTime}
              </p>
              <p>
                <span className="font-bold">Description:</span>{" "}
                {session.description}
              </p>
              <button
                onClick={() => handleRemove(index)}
                className="rounded bg-red-500 p-2 text-white"
              >
                <span role="button" aria-label="remove">
                  Remove
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          className="rounded bg-gray-500 p-2 text-white hover:bg-gray-600"
        >
          Previous
        </button>
        {sessions.length < 1 ? (
          <button
            disabled
            className="rounded bg-gray-500 p-2 text-white hover:bg-gray-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AddSessions;
