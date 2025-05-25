import {
  CssBaseline,
  InitColorSchemeScript,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";

import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import PatientPage from "./pages/patients/PatientPage";
import PatientsPage from "./pages/patients/PatientsPage";

const theme = createTheme({
  typography: {
    fontFamily: "Karla",
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <InitColorSchemeScript />
        <CssBaseline enableColorScheme />
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="patients">
              <Route index element={<PatientsPage />} />
              <Route path=":patientId" element={<PatientPage />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
