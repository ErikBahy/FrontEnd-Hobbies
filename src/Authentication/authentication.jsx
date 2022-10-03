import { Auth, Hub } from "aws-amplify";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MainPage from "../MainPage/MainPage";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { myTheme } from "../theme";

import Football from "../logos/Football.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../authenticationStyle.css";
import { useNavigate } from "react-router-dom";
import logosign from "../logos/logosign.png";
function Login() {
  const initalFormState = {
    username: "",
    password: "",
    email: "",
    authCode: "",
    formType: "signIn",
  };

  const [formState, updateFormState] = useState(initalFormState);
  const [user, updateUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    setAuthListener();
  }, []);

  async function setAuthListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          console.log("data from event: ", data);
          updateFormState(() => ({ ...formState, formType: "signUp" }));
          break;
        default:
      }
    });
  }

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      updateUser(user);

      updateFormState(() => ({ ...formState, formType: "signIn" }));
    } catch (error) {}
  }
  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }
  async function forgotPassword() {
    try {
      const { username } = formState;
      await Auth.forgotPassword(username);
      updateFormState(() => ({ ...formState, formType: "forgotPasswordd" }));
      console.log(username, "data");
    }  catch (d){
      console.log(d.message);
      toast.error(d.message);
    }
  }
  async function forgotPasswordd() {
    try {
    const { username, authCode, new_password } = formState;
    Auth.forgotPasswordSubmit(username, authCode, new_password);
    updateFormState(() => ({ ...formState, formType: "signedIn" }));
    }
    catch (c){
      console.log(c.message);
      toast.error(c.message);
      updateFormState(()=>({...formState, formType: "forgotPasswordd"}))
    }
  }
  async function signUp() { 
    try {
    const { username, email, password } = formState;
    await Auth.signUp({ username, password, attributes: { email } });
    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
    }
    catch (b){
      console.log(b.message);
      toast.error(b.message);
      updateFormState(()=>({...formState, formType: "signUp"}))
    }
  }
  async function confirmSignUp() {
    try {
    const { username, authCode } = formState;
    await Auth.confirmSignUp(username, authCode);
    updateFormState(() => ({ ...formState, formType: "signIn" }));
    }
    catch (a){
      console.log(a.message);
      toast.error(a.message);
      updateFormState(()=>({...formState, formType: "confirmSignUp"}))
    }
  }

  async function signIn() {
    try {
      const { username, password } = formState;
      const user = await Auth.signIn(username, password);
      navigate("/mainPage");
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
      localStorage.setItem("isLogged", true);
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  }

  const { formType } = formState;

  return (
    <>
      <div className="backgroundasd">
        {formType === "signUp" && (
          <ThemeProvider theme={myTheme}>
            <Container
              component="main"
              maxWidth="xs"
              className="main-container"
            >
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box marginBottom={4}>
                  <img className="top" src={Football} height={75} width={75} />
                </Box>
                <Box marginBottom={2}>
                  <img src={logosign} height={25} width={75} />
                </Box>

                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box component="form" sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        validate
                        fullWidth
                        label="Username"
                        autoFocus
                        name="username"
                        onChange={onChange}
                        placeholder="username"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        validate
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={onChange}
                        placeholder="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        validate
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={onChange}
                        placeholder="password"
                      />
                    </Grid>
                    <Grid item xs={12}></Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                     onClick={() => {
                      signUp();
                      updateFormState(() => ({
                        ...formState,
                        formType: "confirmSignUp",
                      }));
                    }}
                  >
                    Sign Up
                  </Button>
                  <Divider
                    sx={{ width: 1, marginTop: 3, fontWeight: 200 }}
                  ></Divider>
                  <Grid
                    container
                    alignItems={"right"}
                    justifyContent={"center"}
                  >
                    <Grid item>
                      <Button
                        variant="body2"
                        onClick={() =>
                          updateFormState(() => ({
                            ...formState,
                            formType: "signIn",
                          }))
                        }
                      >
                        <Typography variant="body2">
                          I have an account.
                        </Typography>
                        <Link>Sign in</Link>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        )}

        {formType === "confirmSignUp" && (
          <ThemeProvider theme={myTheme}>
            <Container
              component="main"
              maxWidth="xs"
              className="main-container"
            >
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box marginBottom={4}>
                  <img className="top" src={Football} height={75} width={75} />
                </Box>
                <Box marginBottom={2}>
                  <img src={logosign} height={25} width={75} />
                </Box>

                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box component="form" sx={{ mt: 3 }}>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      label="Authentication Code"
                      name="authCode"
                      onChange={onChange}
                      autoFocus
                      placeholder="Confirmation Code"
                    />
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      confirmSignUp();
                      updateFormState(() => ({
                        ...formState,
                        formType: "signIn",
                      }));
                    }}
                  >
                    {" "}
                    Confirm Sign up{" "}
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        )}
        {formType === "forgotPassword" && (
          <ThemeProvider theme={myTheme}>
            <Container
              component="main"
              maxWidth="xs"
              className="main-container"
            >
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box marginBottom={4}>
                  <img className="top" src={Football} height={75} width={75} />
                </Box>
                <Box marginBottom={2}>
                  <img src={logosign} height={25} width={75} />
                </Box>

                <Typography component="h1" variant="h5"></Typography>
                <Box component="form" sx={{ mt: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Username"
                        autoFocus
                        name="username"
                        onChange={onChange}
                        placeholder="username"
                      />
                    </Grid>
                    <Grid item xs={12}></Grid>

                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      forgotPassword();
                      updateFormState(() => ({
                        ...formState,
                        formType: "forgotPasswordd",
                      }));
                    }}
                  >
                    Get authentication code
                  </Button>
                  <Divider
                    sx={{ width: 1, marginTop: 3, fontWeight: 200 }}
                  ></Divider>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Button
                        variant="body2"
                        onClick={() =>
                          updateFormState(() => ({
                            ...formState,
                            formType: "signIn",
                          }))
                        }
                      >
                        <Typography variant="body2">
                          {" "}
                          I have an account.{" "}
                        </Typography>
                        <Link>Sign in</Link>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        )}
        {formType === "forgotPasswordd" && (
          <ThemeProvider theme={myTheme}>
            <Container
              component="main"
              maxWidth="xs"
              className="main-container"
            >
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box marginBottom={4}>
                  <img className="top" src={Football} height={75} width={75} />
                </Box>
                <Box marginBottom={2}>
                  <img src={logosign} height={25} width={75} />
                </Box>

                <Typography component="h1" variant="h5"></Typography>
                <Box component="form" sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Username"
                        autoFocus
                        name="username"
                        onChange={onChange}
                        placeholder="username"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        fullWidth
                        required
                        label="Authentication Code"
                        name="authCode"
                        onChange={onChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="new_password"
                        label="New Password"
                        type="password"
                        id="password"
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12}></Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      forgotPasswordd();
                      updateFormState(() => ({
                        ...formState,
                        formType: "signIn",
                      }));
                    }}
                  >
                    Sign In
                  </Button>
                  <Divider
                    sx={{ width: 1, marginTop: 3, fontWeight: 200 }}
                  ></Divider>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Button
                        variant="body2"
                        onClick={() =>
                          updateFormState(() => ({
                            ...formState,
                            formType: "signIn",
                          }))
                        }
                      >
                        {" "}
                        <Typography variant="body2">
                          I have an account.{" "}
                        </Typography>
                        <Link>Sign in</Link>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        )}
        {formType === "signIn" && (
          <ThemeProvider theme={myTheme}>
            <Container
              component="main"
              maxWidth="xs"
              className="main-container"
            >
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box marginBottom={4}>
                  <img className="topi" src={Football} height={75} width={75} />
                </Box>
                <Box marginBottom={2}>
                  <img src={logosign} height={25} width={75} />
                </Box>

                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    name="username"
                    onChange={onChange}
                    placeholder="username"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={onChange}
                    placeholder="password"
                    autoComplete="current-password"
                  />
                  <Grid item xs>
                    <Link
                      variant="body2"
                      onClick={() =>
                        updateFormState(() => ({
                          ...formState,
                          formType: "forgotPassword",
                        }))
                      }
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={signIn}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Button
                        variant="body2"
                        onClick={() =>
                          updateFormState(() => ({
                            ...formState,
                            formType: "signUp",
                          }))
                        }
                      >
                        <Typography variant="body2" paddingRight={1}>
                          Don't have an account?{" "}
                        </Typography>
                        <Link>{"Create Account"}</Link>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        )}

        {formType === "signedIn" && (
          <MainPage component={Link} to={"/mainpage"} />
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
