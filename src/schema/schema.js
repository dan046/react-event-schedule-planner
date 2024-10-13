import z from "zod";

export const eventSchema = z.object({
  eventName: z.string().min(1, { message: "Name is required" }),
  eventDate: z.string().min(1, { message: "Date is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  contactEmail: z.string().email(),
  description: z.string().optional(),
});

export const sessionSchema = z.object({
  sessionName: z.string().min(1, { message: "Session Name is required" }),
  speakerName: z.string().min(1, { message: "Speaker Name is required" }),
  startTime: z.string().min(1, { message: "Start Time is required" }),
  endTime: z.string().min(1, { message: "End Time is required" }),
  description: z.string().optional(),
});
