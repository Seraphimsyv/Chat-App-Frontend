import { useState } from "react";
import { TextField, Typography, Button } from "@mui/material"
import { useAuth } from "../../providers/auth.provider"
import { usePage } from "../../providers/page.provider";

export const LoginPage = () => {
  const { handleLogin } = useAuth();
  const { handleSetUrl } = usePage();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <>
      <div id="log-in-page" className="app__page">

        <div id="log-in-form">

          <Typography
            variant='h4'
            color='whitesmoke'
            sx={{
              textAlign: 'center'
            }}
            gutterBottom
          >
            Log-in
          </Typography>

          <TextField
            label="Login"
            placeholder="Login"
            variant='standard'
            color='info'
            onChange={(evt) => setLogin(evt.target.value)}
            sx={{
              margin: 'auto',
              width: '50%',
              color: 'whitesmoke'
            }}
          />

          <TextField
            type='password'
            label="Password"
            placeholder="Password"
            variant='standard'
            color='info'
            onChange={(evt) => setPassword(evt.target.value)}
            sx={{
              margin: 'auto',
              width: '50%',
              color: 'whitesmoke'
            }}
          />

          <Button
            variant='contained'
            color='info'
            sx={{
              margin: 'auto',
              width: '50%'
            }}
            onClick={() => handleLogin(login, password)}
          >
            Log-in
          </Button>

          <Button
            variant='text'
            color='secondary'
            sx={{
              margin: 'auto',
              width: '50%'
            }}
            onClick={() => handleSetUrl('/sign-up')}
          >
            Sign-up
          </Button>

        </div>

      </div>
    </>
  )
}