import React from 'react';
import Container from "@material-ui/core/Container/Container";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import TextField from "@material-ui/core/TextField/TextField";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from "@material-ui/core/Button/Button";

type MyState = {
    count: number; // like this
};

export default class App extends React.Component<MyState> {
    state: MyState = {
        // optional second annotation for better type inference
        count: 5
    };
    render() {
        return (
            <div>
                <Container maxWidth="xs">
                    <Box display="flex" flexDirection="column" justifyContent="center" style={{minHeight: '100vh'}} pt={3} pb={3}>
                        <Box>
                            <Typography variant="h3" component="span" color="primary" style={{fontWeight: 900}}>
                                Mint
                            </Typography>
                            &nbsp; &nbsp;
                            <Typography variant="h5" component="span" color="primary">
                                by HMIF Tech
                            </Typography>
                        </Box>
                        <Box>
                            <p>
                                Sebuah alat bantu untuk melaksanakan <i>mock interview</i> dengan teman-teman.
                            </p>
                        </Box>
                        <Box mt={3}>
                            <b>Apa NIM kamu?</b>
                            <TextField variant="outlined" margin="dense" fullWidth />
                        </Box>
                        <Box mt={3}>
                            <b>Apa NIM teman kamu yang diwawancara?</b>
                            <TextField variant="outlined" margin="dense" fullWidth />
                        </Box>
                        <Box mt={3}>
                            <b>Tipe interview</b>
                            <Box mt={1}>
                                <Select variant="outlined" margin="dense" fullWidth>
                                    <MenuItem value="engineeringRoles">
                                        Technical/Software Engineering
                                    </MenuItem>
                                    <MenuItem value="productRoles">
                                        Product-related roles
                                    </MenuItem>
                                </Select>
                            </Box>
                        </Box>
                        <Box mt={3}>
                            <Button variant="contained" color="primary" style={{width: '100%', textTransform: 'none'}}>
                                Lanjut
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </div>
        );
    }
}
