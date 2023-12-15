import { useState } from 'react';
import { TextField, Typography, Button } from "@mui/material"
import { usePage } from "../../providers/page.provider"

export const SignupPage = () => {
  const { handleSetUrl } = usePage();
  const [username, setUsername] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleRegistration = () => {
  }

  return (
    <>
      <div id="sign-up-page" className="app__page">

      <div id="sign-up-form">

        <Typography
          variant='h4'
          color='whitesmoke'
          sx={{
            textAlign: 'center'
          }}
          gutterBottom
        >
          Sign-up
        </Typography>

        <TextField
          label="Username"
          placeholder="Username"
          variant='standard'
          color='info'
          sx={{
            margin: 'auto',
            width: '50%',
            color: 'whitesmoke'
          }}
        />

        <TextField
          label="Login"
          placeholder="Login"
          variant='standard'
          color='info'
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
          sx={{
            margin: 'auto',
            width: '50%',
            color: 'whitesmoke'
          }}
        />

        <TextField
          type='password'
          label="Confirm password"
          placeholder="Confirm password"
          variant='standard'
          color='info'
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
          onClick={handleRegistration}
        >
          Sign-up
        </Button>

        <Button
          variant='text'
          color='secondary'
          sx={{
            margin: 'auto',
            width: '50%'
          }}
          onClick={() => handleSetUrl('/log-in')}
        >
          Log-in
        </Button>

        </div>

      </div>
    </>
  )
}