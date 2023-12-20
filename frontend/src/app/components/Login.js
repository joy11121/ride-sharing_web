import { React, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, googleProvide, fbProvide } from "./config/firebase";
import { signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { LoadingButton } from '@mui/lab';
import { Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme, Button } from '@mui/material';
import { Paragraph, H1, H2 } from '../templates/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import dreamer from './illustrations/dreamer.svg';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const IconButton = styled(Button)(() => ({
	height: '35px',
	'&:hover': {
		backgroundColor: 'gray',
	}
}));

const Login = () => {

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user)
                localStorage.setItem("currentUser", JSON.stringify(user));
            else
                localStorage.removeItem("currentUser");
        });

        return () => {
            listen();
        }
    }, []);

    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
		const theme = useTheme();
		const [loading, setLoading] = useState(false);
		const [checked, setChecked] = useState(false);

    const navigate = useNavigate();

		const handleRemember = () => {
				setChecked(prev => !prev);
		}

    const googleLogin = async () => {
				setLoading(true);
        const googleAuth = await signInWithPopup(auth, googleProvide);
        console.log(googleAuth.user);
        navigate('/searchRides');
        
    };
    const facebookLogin = async () => {
				setLoading(true);
        const fbAuth = await signInWithPopup(auth, fbProvide);
        console.log(fbAuth.user);
        navigate('/searchRides');
    };

    const signIn = () => {
				setLoading(true);
        signInWithEmailAndPassword(auth, email, passwd)
        .then((user) => {
            console.log(user);
            alert("登入成功");
        }).catch((error) => {
            alert("登入失敗");
        });
    }

    return (
        	<Grid container style={{ height: '100vh' }}>
          	<Grid item sm={8.8} xs={12}>
            	<JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              	<img src={dreamer} width="100%" alt="" />
            	</JustifyBox>
          	</Grid>

          	<Grid item sm={3.2} xs={12} backgroundColor='#eddbc2'>
            	<ContentBox>
								<H1 marginBottom={3}>Login</H1>
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
                  sx={{ mb: 1.5 }}
                />

                <FlexBox justifyContent="space-between">
                  <FlexBox gap={1}>
                    <Checkbox
                      size="small"
                      name="remember"
                      onChange={handleRemember}
                      checked={checked}
                      sx={{ padding: 0 }}
                    />
                    <Paragraph>Remember Me</Paragraph>
                  </FlexBox>
                </FlexBox>

                <LoadingButton
                  type="submit"
                  color="primary"
                  variant="contained"
									loading={loading}
									onClick={signIn}
                  sx={{ my: 2 }}
                >
                  Login
                </LoadingButton>

                <Paragraph>
                  Don't have an account?
                  <NavLink
                    to="/signup"
                    style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                  >
                    Register
                  </NavLink>
                </Paragraph>
								<JustifyBox gap={1.5} padding={2}>
									<IconButton
                	  variant="contained"
										loading={false}
										onClick={googleLogin}
                	  startIcon={<GoogleIcon />}
										sx={{ backgroundColor: 'orange' }}
                	/>
									<IconButton
                	  variant="contained"
										loading={false}
										onClick={facebookLogin}
                	  startIcon={<FacebookIcon />}
										sx={{ backgroundColor: 'blue' }}
                	/>
								</JustifyBox>
            	</ContentBox>
          	</Grid>
        	</Grid>
    );
};

export default Login;