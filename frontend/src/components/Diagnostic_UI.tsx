import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SaveIcon from "@mui/icons-material/Save";

const OP_PatientID = ["1", "2", "3"];
const OP_DiagnosticType = ["Basic", "Advanced"];
const OP_Disease = ["Disease#1", "Disease#2", "Disease#3"];

function Diagnostic_Entry() {
  // const [value, setValue] = React.useState<string | null>(options[0]);
  //const [inputValue, setInputValue] = React.useState(''); //set inputValue back
  const [symptom, setSymptom] = React.useState<String>("");
  const [diagnosticType, SetDiagnosticType] = React.useState<string | null>(
    null
  );
  const [disease, SetDisease] = React.useState<string | null>(null);
  const [patientId, SetPatientId] = React.useState<string | null>(null);

  const submit = () => {
    console.log(patientId, symptom, diagnosticType, disease);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <Box>
          <Paper elevation={2} sx={{ marginTop: 2, padding: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Grid container justifyContent={"center"}>
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Box>
                  <b>Patient Record</b>
                  <Grid container>
                    <Grid item xs={4}>
                      Firstname [firstName_holder]
                    </Grid>
                    <Grid item xs={4}>
                      Lastname [lastName_holder]
                    </Grid>
                    <Grid item xs={12}>
                      BloodGroup [bloodGroup_holder]
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={2}>
                Patient Personal ID
                <Autocomplete
                  value={patientId}
                  onChange={(event: any, newValue: string | null) => {
                    SetPatientId(newValue);
                    console.log(newValue);
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="controllable-states-demo"
                  options={OP_PatientID}
                  size="small"
                  renderInput={(params) => <TextField {...params} />}
                />
                Doctor Personal ID [id_holder] Diagnostic ID [id_holder]
              </Grid>
              <Grid item xs={10}>
                <Box>
                  <b>Symptom</b>
                  <Grid container>
                    <Grid item xs={7} paddingRight={2}>
                      <TextField
                        id="outlined-basic"
                        placeholder="Insert symptom details"
                        variant="outlined"
                        size="medium"
                        multiline={true}
                        minRows={5}
                        maxRows={5}
                        fullWidth={true}
                        onChange={(event) => setSymptom(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Box>
                        {/* Summary Area */}
                        <Grid container paddingRight={2}>
                          <Grid item xs={5}>
                            Diagnostic Type
                          </Grid>
                          <Grid item xs={7}>
                            <Autocomplete
                              value={diagnosticType}
                              onChange={(
                                event: any,
                                newValue: string | null
                              ) => {
                                SetDiagnosticType(newValue);
                                console.log(newValue);
                              }}
                              // inputValue={inputValue}
                              // onInputChange={(event, newInputValue) => {
                              //   setInputValue(newInputValue);
                              // }}
                              id="controllable-states-demo"
                              options={OP_DiagnosticType}
                              size="small"
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Grid>
                          <Grid item xs={5}>
                            Disease
                          </Grid>
                          <Grid item xs={7}>
                            <Autocomplete
                              value={disease}
                              onChange={(
                                event: any,
                                newValue: string | null
                              ) => {
                                SetDisease(newValue);
                                console.log(newValue);
                              }}
                              // inputValue={inputValue}
                              // onInputChange={(event, newInputValue) => {
                              //   setInputValue(newInputValue);
                              // }}
                              id="controllable-states-demo"
                              options={OP_Disease}
                              size="small"
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid container paddingRight={2} justifyContent="flex-end">
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
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default Diagnostic_Entry;
