import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SaveIcon from "@mui/icons-material/Save";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import Select from "@material-ui/core/Select";

import { AppointmentsInterface } from "../models/Appointment/IAppointment";
import { PatientsInterface } from "../models/patient/IPatient";
import { DepartmentsInterface } from "../models/employee/IDepartment";

function Appointment_UI() {
  //const [value, setValue] = React.useState<string | null>(options[0]);
  //const [inputValue, setInputValue] = React.useState(''); //set inputValue back

  const [appointment,setAppointment] =React.useState<Partial<AppointmentsInterface>>({});
  
  const [patient, setPatient] = React.useState<PatientsInterface[]>([]);

  const [department, setDepartment] = React.useState<DepartmentsInterface[]>([]);

  const [dateOut, setDateOut] = React.useState<Dayjs | null>(dayjs());

  const [dateIn, setDateIn] = React.useState<Dayjs | null>(dayjs());

  const [details, setDetails] = React.useState<String>("");

  const [passPatient, setPassPatient] = React.useState<string | null>("");

  const [success, setSuccess] = React.useState(false);

  const [error, setError] = React.useState(false);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var patientArray = patient.map((item: PatientsInterface) => (item.Patient_Personal_ID));       //ดึงรหัสบัตรประชาชนมาเป็น Array

  const getPatient = async () => {                                                              //ดึงข้อมูลผู้ป๋วย                                   
      const apiUrl = "http://localhost:8080/patients/:id";
      const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
      };

      fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((res) => {
              if (res.data) {
                  setPatient(res.data);
              }
          });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const getDepartment = async () => {                                                           //ดึงข้อมูล Department
    const apiUrl = "http://localhost:8080/department/:id";
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
              setDepartment(res.data);
            }
        });
  }; 

  const convertType = (data: string | number | undefined) => {                                  //แปลงข้อมูลจาก string เป็น number
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const handleChangeDepartment = (                                                              // เปลี่ยนชื่อการแสดงผลใน combobox
    event: React.ChangeEvent<{ name?: any; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof appointment;
    setAppointment({
      ...appointment,
      [name]: event.target.value,
      });      
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleClose = (                                                                         //ป้ายบันทึกเปิดปิด

    event?: React.SyntheticEvent | Event,
 
    reason?: string
 
  ) => {
 
    if (reason === "clickaway") {
 
      return;
 
    }
 
    setSuccess(false);
 
    setError(false);
 
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const submit = () => {                                                                        //กด submit 
    let data = {                                   //ประกาศก้อนข้อมูล

      Employee_ID: 1,

      Patient_ID: patientArray.indexOf(passPatient || "") + 1 ?? 0,
 
      APP_OUT: dateOut,
 
      APP_IN: dateIn,
 
      APP_NOTE: details ?? "",
 
      DepartmentID: convertType(appointment.DepartmentID),
 
    }; 

    console.log(data)
 
    const apiUrl = "http://localhost:8080/appointment";           //ส่งขอบันทึก
 
    const requestOptions = {
 
      method: "POST",
 
      headers: { "Content-Type": "application/json" },
 
      body: JSON.stringify(data),
 
    };
 
    fetch(apiUrl, requestOptions)                                       //ขอการส่งกลับมาเช็คว่าบันทึกสำเร็จมั้ย
 
      .then((response) => response.json())
 
      .then((res) => {
 
        if (res.data) {
          setSuccess(true);
 
        } else {
          setError(true);
 
        }
      });
  };

  React.useEffect(() => {                                                                       //เรียกข้อมูล                     
    getPatient();
    getDepartment();    
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (                                                                                      //UI
    <Box sx={{ flexGrow: 1 }}>
      <Snackbar                                                                                 //ป้ายบันทึกสำเร็จ

        open={success}

        autoHideDuration={6000}

        onClose={handleClose}

        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}

        >

        <Alert onClose={handleClose} severity="success">              

          บันทึกข้อมูลสำเร็จ

        </Alert>

      </Snackbar>

      <Snackbar                                                                                 //ป้ายบันทึกไม่สำเร็จ
        open={error} 
        autoHideDuration={6000} 
        onClose={handleClose} 
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>

        <Alert onClose={handleClose} severity="error">

          บันทึกข้อมูลไม่สำเร็จ

        </Alert>

      </Snackbar>
      <Container maxWidth="xl">
        <Box>
          <Paper elevation={2} sx={{ marginTop: 1, marginX: 10 }}>
            <Grid item xs={5}>
              <Box>
                <Grid container padding={2}>
                  <Grid item xs={3} sx={{ padding: 2 }}>
                    Patient Personal ID
                  </Grid>
                    <Grid item xs={9} sx={{ padding: 2, width: 150 }}>                          
                      <Autocomplete                                                             //combobox Patient
                        value={passPatient}
                        onChange={(
                          event: any,
                          newValue: string | null
                          ) => {
                          setPassPatient(newValue);
                          }
                        }
                        id="controllable-states-demo"
                        options={patientArray}
                        size="small"
                        renderInput={(params) => (
                          <TextField {...params} />
                          )
                        }
                      />
                  </Grid>
                  <Grid item xs={3} sx={{ padding: 2 }}>
                    Department
                  </Grid>
                  <Grid item xs={9} sx={{ padding: 2 }}>                                        {/* combobox department */}
                    <FormControl fullWidth variant="outlined">
                      <Select
                        native
                        value={appointment.DepartmentID}
                        onChange={handleChangeDepartment}
                        inputProps={{
                          name: "DepartmentID",
                        }}
                      >
                        <option aria-label="None" value="">
                          -
                        </option>
                        {department.map((item: DepartmentsInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.Department_NAME}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sx={{ padding: 2 }}>
                    Date
                  </Grid>
                  <Grid item xs={9} sx={{ padding: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker   
                        label="disabled"
                        disabled
                        value={dateOut}
                        onChange={(newValue) => {
                          setDateOut(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3} sx={{ padding: 2 }}>
                    Appointment Date
                  </Grid>
                  <Grid item xs={9} sx={{ padding: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label="Responsive"
                        value={dateIn}
                        onChange={(newValue) => {
                          setDateIn(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3} sx={{ padding: 2 }}>
                    Details
                  </Grid>
                  <Grid item xs={9}>
                    <Box>
                      <Grid container>
                        <Grid item xs={9} sx={{ padding: 2 }}>
                          <TextField
                            id="outlined-basic"
                            placeholder="Insert details"
                            variant="outlined"
                            size="medium"
                            multiline={true}
                            minRows={9}
                            maxRows={5}
                            fullWidth={true}
                            onChange={(event) => setDetails(event.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={9} sx={{ padding: 2 }}></Grid>
                </Grid>
              </Box>
            </Grid>
              <Grid container paddingRight={2} justifyContent="flex-end" sx={{ padding: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={submit}
                endIcon={<SaveIcon />}
              >
                Submit
              </Button>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
  
export default Appointment_UI;
  