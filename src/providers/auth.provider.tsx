import { useState, useEffect, useContext, createContext } from 'react';
import { TEST_USER } from '../common/data';
import { IChildrenProps } from '../common/props';
import { UserType } from '../common/types';
import { usePage } from './page.provider';
import { useSocket } from './socket.provider';

interface IContext {
  isAuth: boolean;
  jwtToken: string | undefined;
  profile: UserType | undefined;
  handleLogin: (login: string, password: string) => void;
  handleLogout: () => void;
}

interface IProvider extends IChildrenProps {}

const AuthContext = createContext<IContext | undefined>(undefined);

const AuthProvider: React.FC<IProvider> = ({ children }) => {
  /**
   * Context
   */
  const { client } = useSocket();
  const { handleSetUrl } = usePage();
  /**
   * States
   */
  const [isAuth, setAuth] = useState<boolean>
  (
    !!window.localStorage.getItem('jwt-token')
    ? true
    : false
  );
  const [jwtToken, setToken] = useState<string | undefined>
  (
    !!window.localStorage.getItem('jwt-token')
    ? window.localStorage.getItem('jwt-token') as string
    : undefined
  );
  const [profile, setProfile] = useState<UserType | undefined>(
    !!window.localStorage.getItem('profile-data') && isAuth
    ? JSON.parse(window.localStorage.getItem('profile-data') as string)
    : undefined
  );
  /**
   * Effects
   */
  /**
   * Test effect to set data
   */
  useEffect(() => {
    
    client?.on('authError', evt => {
      console.log(evt)
    })

  }, [client])
  /**
   * Handlers
   */
  
  const handleLogin = (login: string, password: string) => {
    client?.emit('authorization', { login, password });
    // window.localStorage.setItem('jwt-token', 'test');
    // setAuth(true);
    // setToken('test');
  }

  const handleLogout = () => {

  }
  /**
   * Context provider data
   */
  const options: IContext = {
    isAuth, jwtToken,
    handleLogin,
    handleLogout,
    profile
  }

  return (
    <>
      <AuthContext.Provider value={options}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('Auth context not wrapped!');

  return context;
}

export { AuthContext, AuthProvider, useAuth };