import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Autocomplete from "@mui/material/Autocomplete";


function Patient_UI() {
  
  const [Patient_Personal_ID, setPatient_Personal_ID] =  React.useState<string | null>(null);
  const [FirstName, setFirstName] =  React.useState<string | null>(null);
  const [LastName, setLastName] =  React.useState<string | null>(null);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const blood_groups = [ "001 (A RH+", "002 (A RH-)", "003 (B RH+)", "004 (B RH-)", "005 (AB RH+)", "006 (AB RH-)", "007 (O RH+)", "008 (O RH-)"];
  const [bloodgroups, setBloodgroups] = React.useState<string | null>(null);
  
  const patient_rights = ["77 (สิทธิบัตรทอง)", "OFC (สิทธิข้าราชการ / สิทธิรัฐวิสาหกิจ)", "99 (ชำระเอง)"];
  const [patientrights, setPatientrights] = React.useState<string | null>(null);

  const submit = () => {
    console.log(Patient_Personal_ID,FirstName,LastName,bloodgroups,patientrights);
  }
  
  return (
    <div>
      <Container maxWidth="md">
        <Paper>
          <Box
            display={"flex"}
            sx={{
              marginTop: 6,
              paddingX: 2,
              paddingY: 2,
            }}
          >
            <h1>Patient</h1>
          </Box>
            <Grid container spacing={2}>
              <Grid container justifyContent={"center"}
                sx={{
                  paddingY: 2,
                }}
              >
              <Grid item xs={2}>
                <p>Patient Personal ID:</p>
              </Grid>
              <Grid item xs={6}>
              <TextField fullWidth id="Patient_Personal_ID" type="string" variant="outlined" 
                onChange={(event) => setPatient_Personal_ID(event.target.value)}
              />
              </Grid>
            </Grid>

              <Grid container justifyContent={"center"}
                  sx={{
                    paddingY: 3,
                  }}
                >
                <Grid item xs={2}>
                  <p>First Name:</p>
                </Grid>
                <Grid item xs={6}>
                <TextField fullWidth id="FirstName" type="string" variant="outlined"
                  onChange={(event) => setFirstName(event.target.value)}
                />
                </Grid>
              </Grid>

              <Grid container justifyContent={"center"}
                  sx={{
                    paddingY: 2,
                  }}
                >
                <Grid item xs={2}>
                  <p>Last Name:</p>
                </Grid>
                <Grid item xs={6}>
                <TextField fullWidth id="LastName" type="string" variant="outlined"
                  onChange={(event) => setLastName(event.target.value)}
                />
                </Grid>
              </Grid>

              <Grid container justifyContent={"center"}
                  sx={{
                    paddingY: 2,
                  }}
                >
                <Grid item xs={2}>
                  <p>Blood Groups:</p>
                </Grid>
                <Grid item xs={6}>
                <Autocomplete
                    value={bloodgroups}
                    onChange={(event: any, newValue: string | null) => {
                      setBloodgroups(newValue);
                      console.log(newValue);
                    }}
                    id="bloodgroups"
                    options={blood_groups}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Blood Groups" />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent={"center"}
                  sx={{
                    paddingY: 2,
                  }}
                >
                <Grid item xs={2}>
                  <p>Patient Rights:</p>
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    value={patientrights}
                    onChange={(event: any, newValue: string | null) => {
                      setPatientrights(newValue);
                      console.log(newValue);
                    }}
                    id="patientrights"
                    options={patient_rights}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Patient Rights" />
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
                <Button variant="contained" color="success" onClick={submit}>
                  SAVE
                </Button>
              </Grid>
            </Grid>
        </Paper>
        </Container>
    </div>
  );
}
export default Patient_UI;
