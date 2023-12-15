import { SocketProvider } from "./providers/socket.provider";
import { AuthProvider } from "./providers/auth.provider";
import { PageProvider } from "./providers/page.provider";
import { Router } from "./components/Router";
import './App.css';

const App = () => {
  return (
    <>
      <SocketProvider>
        <PageProvider>
          <AuthProvider>
            
            <div id="app">
              <Router />
            </div>

          </AuthProvider>
        </PageProvider>
      </SocketProvider>
    </>
  )
}

export default App;