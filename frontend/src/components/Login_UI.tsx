import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { TextField } from "@material-ui/core";
import { Button } from "@mui/material";

import LoginIcon from '@mui/icons-material/Login';

function Login(){

    // function Users() {
    //     const [users, setUsers] = React.useState<UsersInterface[]>([]);
    //     const getUsers = async () => {
    //       const apiUrl = "http://localhost:8080/users";
    //       const requestOptions = {
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" },
    //       };
       
    //       fetch(apiUrl, requestOptions)
    //         .then((response) => response.json())
    //         .then((res) => {
    //           console.log(res.data);
    //           if (res.data) {
    //             setUsers(res.data);
    //           }
    //         });
    //     };
    // }

    return(
        <Box sx={{ flexGrow: 1 }}>
            <Container maxWidth="xl">
                <Paper elevation={2} sx={{ marginTop: 2, padding: 1 }}>
                    <Grid container spacing={2}>

                        <Grid container justifyContent={"center"}>
                            <Grid>
                                <h1>
                                    Login
                                </h1>
                            </Grid>
                        </Grid>
                        
                        {/* Username */}
                        <Grid container justifyContent={"center"}>
                            <Grid sx = {{paddingY :2}}>
                                <TextField id="outlined-basic" label="Username" variant="outlined" />
                            </Grid>
                        </Grid>
                        
                        {/* Password */}
                        <Grid container justifyContent={"center"}>
                            <Grid>
                                <TextField id="outlined-basic" label="Password" variant="outlined" />
                            </Grid>
                        </Grid>

                        <Grid container justifyContent={"center"}>
                            <Grid sx = {{paddingY :2}}>
                                <Button variant="contained" color="success" endIcon={<LoginIcon />}>
                                    login
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default Login;