import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { schedulePatientRoutine } from "../lib/api/routinesApi";

export type ScheduleRoutineDialogProps = {
  open: boolean;
  onClose: () => void;
  patientId: string;
};

export const ScheduleRoutineDialog = ({
  open,
  onClose,
  patientId,
}: ScheduleRoutineDialogProps) => {
  const [date, setDate] = useState<string>();
  const [dateError, setDateError] = useState<boolean>(false);
  const [dateErrorMessage, setDateErrorMessage] = useState<string>();

  const [activity, setActivity] = useState<string>();
  const [activityError, setActivityError] = useState<boolean>(false);
  const [activityErrorMessage, setActivityErrorMessage] = useState<string>();

  const [duration, setDuration] = useState<string>();
  const [durationError, setDurationError] = useState<boolean>(false);
  const [durationErrorMessage, setDurationErrorMessage] = useState<string>();

  const onSubmit = () => {
    if (date === undefined || date === "") {
      setDateError(true);
      setDateErrorMessage("Date is required");
    } else if (new Date(date) < new Date()) {
      setDateError(true);
      setDateErrorMessage("Date cannot be in the past");
    } else {
      setDateError(false);
      setDateErrorMessage("");
    }

    if (activity === undefined || activity === "") {
      setActivityError(true);
      setActivityErrorMessage("Activity is required");
    } else {
      setActivityError(false);
      setActivityErrorMessage("");
    }

    if (
      duration === undefined ||
      duration === "" ||
      Number.isNaN(Number(duration))
    ) {
      setDurationError(true);
      setDurationErrorMessage("Duration is required and must be a number");
    } else {
      setDurationError(false);
      setDurationErrorMessage("");
    }

    if (activityError || dateError || durationError) {
      return;
    }

    (async () => {
      await schedulePatientRoutine(
        patientId,
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        new Date(date!),
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        activity!,
        Number(duration),
      );

      setDate("");
      setActivity("");
      setDuration("");

      onClose();
    })();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Schedule Routine</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="1rem">
          <TextField
            type="date"
            id="schedule-routine-date"
            aria-label="Date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            error={dateError}
            helperText={dateError ? dateErrorMessage : ""}
          />
          <TextField
            id="schedule-routine-activity"
            label="Activity"
            value={activity}
            onChange={(event) => setActivity(event.target.value)}
            error={activityError}
            helperText={activityError ? activityErrorMessage : ""}
          />
          <TextField
            type="number"
            id="schedule-routine-duration"
            label="Duration (in minutes)"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            error={durationError}
            helperText={durationError ? durationErrorMessage : ""}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>Save</Button>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
