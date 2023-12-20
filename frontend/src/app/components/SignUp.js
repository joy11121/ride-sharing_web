import { createUserWithEmailAndPassword } from "firebase/auth";
import { React, useState } from "react";
import { auth } from "./config/firebase";
import { LoadingButton } from '@mui/lab';
import { Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
import { Paragraph, H1, H2 } from '../templates/Typography';
import { NavLink, useNavigate } from 'react-router-dom';
import posting from './illustrations/posting_photo.svg';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
	position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const SignUp = () => {
		const theme = useTheme();
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
		const [loading, setLoading] = useState(false);
		const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const handleSingup = () => {
				setLoading(true);
        createUserWithEmailAndPassword(auth, email, passwd)
        .then((userCredentials) => {
            console.log(userCredentials);
            alert("註冊成功");
            navigate('/login');
        }).catch((error) => {
            alert("無效的帳密組合")
        });
    };

		const handleRemember = () => {
				setChecked(prev => !prev);
		}


    return (
        <Grid container style={{ height: '100vh' }}>
          <Grid item sm={8.8} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img
              	width="100%" alt="Register" src={posting}
              />
            </JustifyBox>
          </Grid>

          <Grid item sm={3.2} xs={12} backgroundColor='#eddbc2'>
						<ContentBox>
						<H1 marginBottom={3}>SignUp</H1>
              <TextField
                fullWidth
                size="small"
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
							/>
              
              <TextField
                fullWidth
                size="small"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                value={passwd}
                onChange={(e) => setPasswd(e.target.value)}
                sx={{ mb: 2 }}
              />

              <FlexBox gap={1} alignItems="center">
                <Checkbox
                  size="small"
                  name="remember"
                  onChange={handleRemember}
                  checked={checked}
                  sx={{ padding: 0 }}
                />
                <Paragraph fontSize={13}>
                  I have read and agree to the terms of service.
                </Paragraph>
              </FlexBox>

              <LoadingButton
                type="submit"
                color="primary"
                loading={loading}
                variant="contained"
                onClick={handleSingup}
                sx={{ mb: 2, mt: 3 }}
              >
                Register
              </LoadingButton>

              <Paragraph>
                Already have an account?
                <NavLink
                  to="/"
                  style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                >
                  Login
                </NavLink>
              </Paragraph>
						</ContentBox>
          </Grid>
        </Grid>
    );
};

export default SignUp;