import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Autocomplete, Button } from "@mui/material";
import { Container } from "@mui/system";
import { Snackbar, Alert } from "@mui/material";

import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import TextField from '@mui/material/TextField';

import SaveIcon from "@mui/icons-material/Save";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs ,{ Dayjs } from "dayjs";

import { PatientsInterface } from "../models/patient/IPatient";
import { MedicinesInterface } from "../models/dispensation/IMedicine";
import { DispensationMedicinesInterface } from "../models/dispensation/IDispensationMedicines";
import { DispensationsInterface } from "../models/dispensation/IDispensation";

const doc_id = "1"

function Dispensation(){
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());
    const [Medicine_Amount, SetMedicine_Amount] = React.useState<string | null>(null);
    const [NOWdispensationID, SetNOWdispensationID] = React.useState<string | null | undefined>(null);
    
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    // บันทึกค่าลง dispensation medicine
    const handleChangeDispensation_Medicines = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const name = event.target.name as keyof typeof dispensation_medicines;
        setDispensation_medicines({
            ...dispensation_medicines,
            [name]: event.target.value,
        });
    };

    // บันทึกค่าลง dispensation
    const handleChangeDispensations = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const name = event.target.name as keyof typeof dispensations;
        setDispensations({
            ...dispensations,
            [name]: event.target.value,
        });
        getDispensations() // get ใหม่เพื่อเวลาจะจ่ายยาให้คนไข้คนต่อไป dispensation ID จะได้ update โดยไม่ต้อง refresh page
    };

    const handleClose = ( // AlertBar
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") { // คลิปไปที่อื่นจะปิด
            return;
        }
        setSuccess(false);
        setError(false);
    };

    /** START step 8 บันทึกใบสั่งยา() */
    /* แปลงข้อมูลทุกชนิดที่เข้ามาให้เป็น int */
    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    /* Insert */
    async function submit() {
        let data_dispensation = {
            Patient_ID: convertType(dispensations.Patient_ID),
            Employee_ID: convertType(doc_id),
        };

        let data_dispensation_medicine = {
            Dispensation_ID: convertType(dispensationID),
            Medicine_ID: convertType(dispensation_medicines.Medicine_ID),
            Medicine_Amount: convertType(Medicine_Amount),
            Time_Stamp: date,
        };

        console.log(data_dispensation)
        console.log(data_dispensation_medicine)

        const apiUrl = "http://localhost:8080";

        const requestOptions_dispensation = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data_dispensation),
        };

        const requestOptions_dispensation_medicine = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data_dispensation_medicine),
        };

        // ต้องใช้ await ไม่งั้นมันจะไปทำคำสั่งต่อไปเลยโดยไม่รอคำสั่งนี้ทำเสร็จ แล้วมันจะแจ้งว่าหา dispensationID ไม่เจอ */
        if(dispensationID != NOWdispensationID){ // หากค่าเท่ากันจะไม่บันทึกซ้ำอีกรอบ
            // ตรวจสอบว่า Medicine ID และ Amount ได้ถูกกรอกร/เลือก หรือไม่ ถ้าไม่ถูกกรอกจะไม่ทำการ fetch และ
            // พอ fetch dsiepnsation medicine ก็จะแจ้ง error เพราะหา dispensation ไม่เจอ เนื่องจากมันไม่ถุก create จากตรงนี้
            if(data_dispensation_medicine.Medicine_Amount && data_dispensation_medicine.Medicine_ID){
                await fetch(`${apiUrl}/dispensations`, requestOptions_dispensation)
                    .then((response) => response.json())
                    .then((res) => {
                    if (res.data) {
                        console.log("บันทึกได้") // alert บันทึกสำเร็จ
                        SetNOWdispensationID(dispensationID)
                        setSuccess(true)
                    } else {
                        console.log("บันทึกไม่ได้") // alert บันทึกไม่สำเร็จ
                        setError(true)
                    }
                    });
                }
        }

        fetch(`${apiUrl}/dispensation_medicines`, requestOptions_dispensation_medicine)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) { 
                    console.log("บันทึกได้") // alert บันทึกสำเร็จ
                    setSuccess(true)
                } else {
                    console.log("บันทึกไม่ได้") // alert บันทึกไม่สำเร็จ
                    setError(true)
                }

            });

    }

    /** END step 8 บันทึกใบสั่งยา() */

    /** START step 4 เตรียมข้อมูลให้หน้าจอ */
    const [dispensation_medicines, setDispensation_medicines] = React.useState<Partial<DispensationMedicinesInterface>>({});
    const [dispensations, setDispensations] = React.useState<Partial<DispensationsInterface>>({});
    const [dispensationID, SetDispensationID] = React.useState<string | null>(null);
    const [medicines, setMedicines] = React.useState<MedicinesInterface[]>([]);
    const [patients, setPatients] = React.useState<PatientsInterface[]>([]);
    const getMedicines = async () => {
        const apiUrl = "http://localhost:8080/medicines";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
       
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setMedicines(res.data);
                }
            });
    };

    const getPatients = async () => {
        const apiUrl = "http://localhost:8080/patients";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
       
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setPatients(res.data);
                }
            });
    };

    const getDispensations = async () => {
        const apiUrl = "http://localhost:8080/dispensations";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
       
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    SetDispensationID((res.data.at(-1).ID)+1);
                }else{
                    SetDispensationID("1");
                }
            });
    };

    React.useEffect(() => {
        getMedicines();
        getPatients();
        getDispensations();
    }, []);

    /** END step 4 เตรียมข้อมูลให้หน้าจอ */

    return(
        <Box sx={{ flexGrow: 1 }}>
            <Snackbar // บันทึกสำเร็จ
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="success">              
                    บันทึกข้อมูลสำเร็จ
                </Alert>
            </Snackbar>

            <Snackbar // บันทึกไม่สำเร็จ
                open={error} 
                autoHideDuration={6000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="error">
                    บันทึกข้อมูลไม่สำเร็จ
                </Alert>
            </Snackbar>
            <Container maxWidth="xl">
                <Paper elevation={2} sx={{ marginTop: 2, padding: 1 ,marginY: 5}}>
                    <Grid container spacing={2}>
                        
                        {/* Dispensation header */}
                        <Grid container justifyContent="center">
                            <Grid>
                                <h1> Dispensation </h1>
                            </Grid>
                        </Grid>
                        
                        {/* Dispensation ID */}
                        <Grid container justifyContent="center">
                            <Grid item xs={2}>
                                <h2> Dispensation ID </h2>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    disabled
                                    id="dispensation-id"
                                    label= {"" + dispensationID}
                                    variant="outlined"
                                    />
                            </Grid>
                        </Grid>

                        {/* Patient Personal ID */}
                        <Grid container justifyContent="center">
                            <Grid item xs={2}>
                                <h2> Patient Personal ID </h2>
                            </Grid>
                            <Grid item xs={2}>
                                {/* <Autocomplete
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
                                    size="medium"
                                    renderInput={(params) => (<TextField {...params} />)
                                    }
                                /> */}
                                <FormControl fullWidth variant="outlined">
                                    <Select
                                        native
                                        value={dispensations.Patient_ID}
                                        onChange={handleChangeDispensations}
                                        inputProps={{
                                        name: "Patient_ID",
                                        }}
                                    >
                                        <option aria-label="None" value="">
                                            Select Patient ID
                                        </option >
                                        {patients.map((item: PatientsInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Patient_Personal_ID}
                                        </option >
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Medicine Name */}
                        <Grid container justifyContent="center">
                            <Grid item xs={2}>
                                <h2> Medicine Name </h2>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControl fullWidth variant="outlined">
                                    <Select
                                        native
                                        value={dispensation_medicines.Medicine_ID}
                                        onChange={handleChangeDispensation_Medicines}
                                        inputProps={{
                                        name: "Medicine_ID",
                                        }}
                                    >
                                        <option aria-label="None" value="">
                                            Select Medicine Name
                                        </option>
                                        {medicines.map((item: MedicinesInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Medicine_Name}
                                        </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Medicine Amount */}
                        <Grid container justifyContent="center">
                            <Grid item xs={2}>
                                <h2> Medicine Amount </h2>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    id="medicine-amount"
                                    label="Medicine Amount"
                                    variant="outlined"
                                    onChange={(event) => SetMedicine_Amount(event.target.value)}/>
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="center">
                            <Grid item xs={2}>
                                <h2> Insert Date </h2>
                            </Grid>
                            <Grid item xs={2}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="DateTimePicker"
                                        value={date}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(props) => <TextField {...props} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>

                        {/* Insert Button */}
                        <Grid container justifyContent="center">
                            <Grid item xs={1}>
                                <Button variant="contained" color="success" onClick={submit} endIcon={<SaveIcon />}>
                                    submit
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default Dispensation;