import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { DirectionsWalk, Receipt, Schedule } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";

import { PageHeading } from "../../components/PageHeading";
import { ScheduleRoutineDialog } from "../../components/ScheduleRoutineDialog";
import { type Patient, getPatientAsync } from "../../lib/api/patientsApi";
import {
  type Routine,
  getPatientRoutinesAsync,
} from "../../lib/api/routinesApi";
import {
  type SessionRecording,
  getSessionsAsync,
} from "../../lib/api/sessionsApi";

export type RoutineInfoProps = {
  routine: Routine;
  openModal: (routineId: string) => void;
};

const RoutineInfo = ({ routine, openModal: openModel }: RoutineInfoProps) => {
  const { palette } = useTheme();

  const status =
    routine.status === "Scheduled" && new Date(routine.date) < new Date()
      ? "Missed"
      : routine.status;

  const colourMap: { [key: string]: string[] } = {
    Missed: ["#F9C1C1", "#B04242"],
    Scheduled: [palette.grey[200], "#d2d2d2"],
    Completed: ["#C1F9CC", "#42B05C"],
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p="0.4rem"
      bgcolor={colourMap[status][0]}
      border={`1px solid ${colourMap[status][1]}`}
      borderRadius="0.2rem"
    >
      <Box>
        <Box display="flex" gap={1} alignItems="center">
          <Schedule />
          <Typography>
            {new Date(routine.date).toLocaleDateString()} for{" "}
            {routine.targetDuration} minutes
          </Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <DirectionsWalk />
          <Typography>{routine.activity}</Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <Receipt />
          <Typography>{status}</Typography>
        </Box>
      </Box>

      {status === "Completed" && (
        <Box display="flex" alignItems="center">
          <Button variant="contained" onClick={() => openModel(routine.id)}>
            Results
          </Button>
        </Box>
      )}
    </Box>
  );
};

const PatientPage = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [routines, setRoutines] = useState<Routine[]>([]);

  const [scheduleRoutineDialogOpen, setScheduleRoutineDialogOpen] =
    useState(false);

  const [sessionResultsDialogOpen, setSessionResultsDialogOpen] =
    useState(false);
  const [sessionRecordings, setSessionRecordings] = useState<
    SessionRecording[]
  >([]);

  const fetchRoutines = async () => {
    if (patientId === undefined) return;

    const routineData = await getPatientRoutinesAsync(patientId);
    setRoutines(routineData);
  };

  const handleSessionResultsOpen = (routineId: string) => {
    (async () => {
      const sessions = await getSessionsAsync(routineId);
      setSessionRecordings(sessions);
      setSessionResultsDialogOpen(true);
    })();
  };

  const handleSessionResultsClose = () => {
    setSessionResultsDialogOpen(false);
    setSessionRecordings([]);
  };

  const handleScheduleRoutineOpen = () => {
    setScheduleRoutineDialogOpen(true);
  };

  const handleScheduleRoutineClose = () => {
    setScheduleRoutineDialogOpen(false);
    fetchRoutines();
  };

  useEffect(() => {
    if (patientId === undefined) {
      navigate(-1);
      return;
    }

    (async () => {
      const [patientData, routineData] = await Promise.all([
        await getPatientAsync(Number.parseInt(patientId)),
        await getPatientRoutinesAsync(patientId),
      ]);

      setPatient(patientData);
      setRoutines(routineData);
    })();
  }, [navigate, patientId]);

  return (
    <Box>
      <PageHeading>{patient?.name}</PageHeading>

      <Button
        variant="contained"
        sx={{ mb: "1rem" }}
        onClick={handleScheduleRoutineOpen}
      >
        Schedule Routine
      </Button>

      {routines.length === 0 && (
        <Typography>
          Looks like this patient doesn't have any routines scheduled yet.
        </Typography>
      )}

      {routines.length > 0 && (
        <Box display="flex" flexDirection="column" gap="0.8rem">
          {routines.map((routine) => (
            <RoutineInfo
              key={routine.id}
              routine={routine}
              openModal={handleSessionResultsOpen}
            />
          ))}
        </Box>
      )}

      <Dialog
        open={sessionResultsDialogOpen}
        onClose={handleSessionResultsClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>Session Results</DialogTitle>
        {sessionRecordings.length > 0 && (
          <DialogContent>
            <Box>
              Duration:{" "}
              {(new Date(sessionRecordings[0].endTime).getTime() -
                new Date(sessionRecordings[0].startTime).getTime()) /
                1000 /
                60}{" "}
              minutes
            </Box>
            <Box>Score: {sessionRecordings[0].score}</Box>
          </DialogContent>
        )}
      </Dialog>

      <ScheduleRoutineDialog
        open={scheduleRoutineDialogOpen}
        onClose={handleScheduleRoutineClose}
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        patientId={patientId!}
      />
    </Box>
  );
};

export default PatientPage;
