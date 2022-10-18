import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from "@mui/material/Autocomplete";

function Employee_entry() {

const [Personal_ID, SetPersonal_ID] = useState<String>("");
const [Password, SetPassword] = useState<String>("");
const [FirstName, SetFirstName] = useState<String>("");
const [LastName, SetLastName] = useState<String>("");
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const emp_gender = [ "Mele", "Female"];
  const [gender, setGender] = React.useState<string | null>(null);

  const blood_groups = [ "A RH+", "A RH-", "B RH+", "B RH-", "AB RH+", "AB RH-", "O RH+", "O RH-"];
  const [bloodgroups, setBloodgroups] = React.useState<string | null>(null);

  const emp_department = [ "IT", "MED", "Finance"];
  const [department, setDepartment] = React.useState<string | null>(null);

  const emp_position = [ "Admin", "Doctor", "Nurse", "Cashier"];
  const [position, setPosition] = React.useState<string | null>(null);

const submit = () => {
  console.log(Personal_ID,FirstName,LastName,gender,bloodgroups,department,position,Password);
}

  return (
    <div>
      <Box>
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
            <h1>บันทึกข้อมูล</h1>
          </Box>
            <Grid container spacing={2}>

              <Grid container justifyContent={"center"}
                sx={{
                  paddingY: 2,
                }}
              >
              <Grid item xs={2}>
                <p>Personal ID:</p>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth id="Personal_ID" type="string" variant="outlined" 
                onChange={(event) => SetPersonal_ID(event.target.value)}  />
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
                  onChange={(event) => SetFirstName(event.target.value)}
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
                  onChange={(event) => SetLastName(event.target.value)}
                />
                </Grid>
              </Grid>

              <Grid container justifyContent={"center"}
                  sx={{
                    paddingY: 2,
                  }}
                >
                <Grid item xs={2}>
                <p>Gender:</p>
                </Grid>
                <Grid item xs={6}>
                <Autocomplete
                    value={gender}
                    onChange={(event: any, newValue: string | null) => {
                      setGender(newValue);
                      console.log(newValue);
                    }}
                    id="gender"
                    options={emp_gender}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="gender" />
                    )}/>
                </Grid>
              </Grid>

              <Grid container justifyContent={"center"}
                  sx={{
                    paddingY: 2,
                  }}
                >
                <Grid item xs={2}>
                <p>Blood groups:</p>
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
                      <TextField {...params} label="Bloodgroups" />
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
                <p>Department:</p>
                </Grid>
                <Grid item xs={6}>
                <Autocomplete
                    value={department}
                    onChange={(event: any, newValue: string | null) => {
                      setDepartment(newValue);
                      console.log(newValue);
                    }}
                    id="department"
                    options={emp_department}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="department" />
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
                <p>Position:</p>
                </Grid>
                <Grid item xs={6}>
                <Autocomplete
                    value={position}
                    onChange={(event: any, newValue: string | null) => {
                      setPosition(newValue);
                      console.log(newValue);
                    }}
                    id="position"
                    options={emp_position}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="position" />
                    )}
                    />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
              <Grid container justifyContent={"center"}
                sx={{
                  paddingY: 2,
                }}
              >
              <Grid item xs={2}>
                <p>Password:</p>
              </Grid>
              <Grid item xs={6}>
              <TextField fullWidth id="Password" type="string" variant="outlined" 
                onChange={(event) => SetPassword(event.target.value)}
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
                <Button variant="contained" color="primary" onClick={submit}>
                  Save
                </Button>
              </Grid>
              <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
              >
                <Button variant="contained" color="primary" onClick={submit}>
                  Back
                </Button>
              </Grid>

            </Grid>
            </Grid>
        </Paper>
        </Container>
        </Box>
    </div>
  );
}
 
export default Employee_entry;

