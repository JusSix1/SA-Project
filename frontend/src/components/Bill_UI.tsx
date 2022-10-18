import React, { useState } from "react";

/* appbar */
import FullAppBar from "./FullAppBar";

/* Buttom */
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

/* Grid */
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";

/* combobox */
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import Container from "@mui/material/Container";

/* Datetimepicker */
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Diagnostic = ["1", "2", "3"];
const Dispensation_ID = ["1", "2", "3"];
const Payment_Type = ["8001", "8002"];

function Bill() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [patient_personal_id, setPatient_Personal_ID] = React.useState<
    string | null
  >(null);
  const [dispensation_id, setDispensation_ID] = React.useState<string | null>(
    null
  );
  const [payment_type, setPayment_Type] = React.useState<string | null>(null);

  const submit = () => {
    console.log(dispensation_id, payment_type, value);
  };
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container maxWidth="md">
      <LocalHospitalIcon color="success" sx={{ fontSize: 80 }}/>
      {/* <Box sx={{ bgcolor: '#cfe8fc', height: '85vh' }} /> */}
      <Paper
        sx={{
          paddingX: 2,
        }}
      >
        <h1>Receipt</h1>
        <Box
          display={"flex"}
          sx={{
            paddingX: 2,
          }}
        >
          <Grid container spacing={5}>
            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={3}>
                <h3>Patient Personal ID</h3>
              </Grid>
              <Grid item xs={5}>
                <Autocomplete
                  value={patient_personal_id}
                  onChange={(event: any, newValue: string | null) => {
                    setPatient_Personal_ID(newValue);
                    console.log(newValue);
                  }}
                  id="combobox_Patient_Personal_ID"
                  options={Diagnostic}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Patient Personal ID" />
                  )}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={3}>
                <h3>Dispensation ID</h3>
              </Grid>
              <Grid item xs={5}>
                <Autocomplete
                  value={dispensation_id}
                  onChange={(event: any, newValue: string | null) => {
                    setDispensation_ID(newValue);
                    console.log(newValue);
                  }}
                  id="combobox_Dispensation_ID"
                  options={Dispensation_ID}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Dispensation ID" />
                  )}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={3}>
                <h3>Payment Type</h3>
              </Grid>
              <Grid item xs={5}>
                <Autocomplete
                  value={payment_type}
                  onChange={(event: any, newValue: string | null) => {
                    setPayment_Type(newValue);
                    console.log(newValue);
                  }}
                  id="combobox_Payment_Type"
                  options={Payment_Type}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Payment Type" />
                  )}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={3}>
                <h3>Date Time</h3>
              </Grid>
              <Grid item xs={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="DateTimePicker"
                    renderInput={(params) => <TextField {...params} />}
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Button
                        variant="contained"
                        color="success"
                        onClick={submit}
                        endIcon={<SaveIcon />}
                      >
                        Submit
                      </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Bill;
