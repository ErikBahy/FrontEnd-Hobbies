import {  Auth ,Hub} from "aws-amplify";
import {  useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MainPage from "../MainPage/MainPage";
import { Navigate } from "react-router-dom";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider } from "@mui/material";
 function Login(){
  
const initalFormState = {
  username: '' , password: '', email: '',authCode: '', formType: 'signUp'
}
    const [formState,updateFormState] = useState(initalFormState)
    const [user,updateUser] = useState(null)
    useEffect(()=>{
      checkUser()
      setAuthListener()
    }, [])
    async function setAuthListener() {
      Hub.listen('auth', (data) => {
        switch (data.payload.event) {
          case 'signOut':
            console.log("data from event: ", data);
            updateFormState(() => ({...formState, formType: "signUp"}))
            break;
            default:
        }
      });
    }
    async function checkUser() {
      try {
        const user = await Auth.currentAuthenticatedUser()
        updateUser(user)
        updateFormState(() => ({...formState, formType: "signIn"}))
      } catch (error) {
        
      }
    }
    function onChange(e) {
      e.persist()
      updateFormState(()=>({ ...formState, [e.target.name]: e.target.value}))
    }
    
    async function signUp(){
      const { username, email, password }= formState
      await Auth.signUp({username, password, attributes: { email }})
      updateFormState(() => ({...formState, formType: "confirmSignUp"}))
    }
    async function confirmSignUp(){
      const { username, authCode }= formState
      await Auth.confirmSignUp(username, authCode)
      updateFormState(() => ({...formState, formType: "signIn"}))
    }
    async function signIn(){
      const { username, password }= formState
      const user =  await Auth.signIn(username, password)
      console.log(user,"user::::");
      updateFormState(() => ({...formState, formType: "signedIn"}),
      )}
      const { formType } = formState
     
const theme = createTheme();

  return (
    <>
    {
       formType === 'signUp' && (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
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
                  required
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
              <Grid item xs={12}>
                
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signUp}
            >
              Sign Up
            </Button>
            <Divider sx={{ width: 1, marginTop: 3, fontWeight: 200 }}></Divider>
            <Grid container justifyContent="center">
              <Grid item>
                <Button variant="body2" onClick={() => updateFormState(() => ({
                            ...formState ,formType: "signIn" }))}>
                  <Link>
                  I have an account. Sign in
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
       )
 }
 {
   formType === 'signIn' && (
      <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
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
                    autoFocus />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={onChange} 
                    placeholder="password" 
                    autoComplete="current-password" />
                <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  <Button

                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={ signIn }
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Button variant ="body2" onClick={() => updateFormState(() => ({
                            ...formState ,formType: "signUp" }))}>
                      <Link>
                        {"Don't have an account? Sign Up"}
                      </Link>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
   )
              }

               {
          formType === 'signedIn' && (
             <MainPage />
          )
               }
 </>

  );

    

  //         formType === 'signUp' && (
  //             <div> 
  //                     <input name="username" onChange={onChange} placeholder="username" />
  //                     <input name="password" type="password" onChange={onChange} placeholder="password" />
  //                     <input name="email" onChange={onChange} placeholder="email" />
  //                     <button onClick={signUp}>Sign Up</button>
  //                     <button onClick={() => updateFormState(() => ({
  //                           ...formState ,formType: "signIn"
  //                     }))}
  //                     >Sign In</button>
  //             </div>
  //         )
  // }
  
  //         {
  //         formType === 'confirmSignUp' && (
  //             <div> 
  //                     <input name="authCode" onChange={onChange} placeholder="Confirmation code" />
  //                     <button onClick={confirmSignUp}>Confirm Sign Up</button>
  //             </div>
  //         )
  
  // }
  // {
  //         formType === 'signIn' && (
  //             <div> 
  //                     <input name="username" onChange={onChange} placeholder="username" />
  //                     <input name="password" type="password" onChange={onChange} placeholder="password" />
  //                     <button onClick={signIn}>Sign In</button>
  //             </div>
  //         )
  //         }
  //   {
  //         formType === 'signedIn' && (
  //            <MainPage />
  //         )
  //         }
  
  // {
  //         formType === 'signedOut' && (
  //           <Navigate to="/"/>
  //           )
  //         }

  //     </div>
  //   )
 }

export default Login;