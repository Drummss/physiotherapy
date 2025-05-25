import { useEffect, useState } from "react";
import { Link } from "react-router";

import { Box, Button, Skeleton, Typography, useTheme } from "@mui/material";

import { PageHeading } from "../../components/PageHeading";
import { type Patient, getPatientsAsync } from "../../lib/api/patientsApi";

const PatientsPage = () => {
  const { palette } = useTheme();
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getPatientsAsync();
      setPatients(data);
    })();
  }, []);

  return (
    <Box>
      <PageHeading>Patients</PageHeading>

      {patients.length === 0 && <Skeleton variant="text" />}

      <Box display="flex" flexDirection="column" gap="0.5rem">
        {patients.length > 0 &&
          patients?.map((patient) => (
            <Box
              key={patient.id}
              p="0.2rem 1rem"
              bgcolor={palette.grey[50]}
              borderRadius="0.2rem"
              border="1px solid #d2d2d2"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight={600}>{patient.name}</Typography>
              <Box>
                <Button component={Link} to={`/patients/${patient.id}`}>
                  Manage
                </Button>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default PatientsPage;
