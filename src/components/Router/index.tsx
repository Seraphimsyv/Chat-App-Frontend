import { useAuth } from '../../providers/auth.provider';
import { usePage } from '../../providers/page.provider';
import { useSocket } from '../../providers/socket.provider';
import { AuthLayout, UnAuthLayout } from '../layouts'
import {
  LoginPage,
  SignupPage
} from '../pages';
import { ChatPage } from '../pages/Chat.page';

const authRoutes = [
  {
    path: '/app',
    element: <ChatPage />
  },
  {
    path: '*',
    element: <ChatPage />
  }
]

const unAuthRoutes = [
  {
    path: '/log-in',
    element: <LoginPage />
  },
  {
    path: '/sign-up',
    element: <SignupPage />
  },
  {
    path: '*',
    element: <LoginPage />
  }
];

export const Router = () => {
  const { isAuth } = useAuth();
  const { client } = useSocket();
  const { url } = usePage();

  const displayPage = isAuth
    ? authRoutes.find((item) => item.path === url)
    : unAuthRoutes.find((item) => item.path === url);
  const notFoundPage = isAuth
    ? authRoutes.find((item) => item.path === '*')?.element
    : unAuthRoutes.find((item) => item.path === '*')?.element;

  return (
    <>
        
        {client ? (
          <>
            {/* Authorization */}
            {isAuth && (
              <AuthLayout>
                {displayPage ? displayPage.element : notFoundPage}
              </AuthLayout>
            )}

            {/* UnAuthorization */}
            {!isAuth && (
              <UnAuthLayout>
                {displayPage ? displayPage.element : notFoundPage}
              </UnAuthLayout>
            )} 
          </>
        ) : (
          <>
            <UnAuthLayout>
              <div style={
                {
                  width: '100%', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'center', textAlign: 'center'
                }
              }>
                <span id="loader">
                  <h1>Connection</h1>
                </span>
              </div>
            </UnAuthLayout>
          </>
        )}
      
    </>
  )
}