import { useContext } from "react";
import { EventContext } from "../context/EventContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../schema/schema";

const EventDetails = () => {
  const navigate = useNavigate();
  const { eventDetails, setEventDetails, progressBar, setProgressBar } =
    useContext(EventContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: eventDetails,
    resolver: zodResolver(eventSchema),
    setFocus: true,
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //   throw new Error("Something went wrong"); // Uncomment this line to test error handling
      setEventDetails(data);
      setProgressBar(progressBar + 1);
      navigate("/add-sessions");
    } catch (error) {
      setError("root", {
        message: error.message,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <header>
        <h2 className="flex justify-between text-2xl font-bold">
          Event Details
          <span className="font-bold">Step {progressBar} of 4</span>
        </h2>
      </header>
      <div>
        <label htmlFor="eventName">Event Name</label>
        <input
          {...register("eventName")}
          placeholder="Event Name"
          className="w-full rounded border p-2"
        />
        {errors.eventName && (
          <p className="text-red-500">{errors.eventName.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="eventDate">Event Date</label>
        <input
          type="date"
          {...register("eventDate")}
          className="w-full rounded border p-2"
        />
        {errors.eventDate && (
          <p className="text-red-500">{errors.eventDate.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input
          {...register("location")}
          placeholder="Location"
          className="w-full rounded border p-2"
        />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="contactEmail">Contact Email</label>
        <input
          type="email"
          {...register("contactEmail")}
          placeholder="Contact Email"
          className="w-full rounded border p-2"
        />
        {errors.contactEmail && (
          <p className="text-red-500">{errors.contactEmail.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="description">Event Description</label>
        <textarea
          {...register("description")}
          placeholder="Event Description (optional)"
          className="w-full rounded border p-2"
        />
      </div>
      <div>
        {errors.root && (
          <p className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {errors.root.message}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          {isSubmitting ? "Saving..." : "Next"}
        </button>
      </div>
    </form>
  );
};

export default EventDetails;
