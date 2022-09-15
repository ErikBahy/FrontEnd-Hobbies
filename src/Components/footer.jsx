import React from 'react'
import { Container,Grid,Box,Typography } from '@mui/material'

 export default function Footer(){
    return <footer>
        <Box 
        px={{xs:3,sm:10}} py={{xs: 5,sm: 10}} 
        bgcolor='text.secondary' color='white'>
            <Container maxWidth="lg">
                <Grid   container spacing={5}>
                    <Grid   item xs={12} sm={4}>
                        <Box borderBottom={1}>Help</Box>
                        <Box>
                            <Typography color='inherit'>
                                Contact
                            </Typography>
                        </Box>
                        <Box>
                            <Typography color='inherit'>
                                Contact
                            </Typography>
                        </Box>
                        <Box>
                            <Typography color='inherit'>
                                Contact
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid   item xs={12} sm={4}>
                        <Box borderBottom={1}>Help</Box>
                        <Box>
                            <Typography color='inherit'>
                                Contact
                            </Typography>
                        </Box>
                        <Box>
                            <Typography color='inherit'>
                                Contact
                            </Typography>
                        </Box>
                        <Box>
                            <Typography color='inherit'>
                                Contact
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid   item xs={12} sm={4}>
                        <Box borderBottom={1}>Help</Box>
                        <Box>
                            <Typography color='inherit'>
                                Contact
                            </Typography>
                        </Box>
                        <Box>
                            <Typography color='inherit'>
                                Contact
                            </Typography>
                        </Box>
                        <Box>
                            <Typography color='inherit'>
                                Contact
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={{xs: 5,sm:10}}  pb={{xs: 5, sm: 10}}>
                    asdsadsa
                </Box>
            </Container>
        </Box>
    </footer>
 }
