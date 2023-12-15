import { useState, useEffect, useContext, createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { IChildrenProps } from '../common/props';

interface IContext {
  client?: Socket;
}

interface IProvider extends IChildrenProps {}

const SocketContext = createContext<IContext | undefined>(undefined);

const SocketProvider: React.FC<IProvider> = ({ children }) => {
  const [client, setClient] = useState<Socket | undefined>(undefined);

  useEffect(() => {

    if (!client) {
      const socket = io('localhost:8080', { path: '/api/chat' })

      socket.on('connect', () => {
        setClient(socket);
      })
    }
  }, [client])

  return (
    <>
      <SocketContext.Provider value={{ client }} >
        {children}
      </SocketContext.Provider>
    </>
  )
}

const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context)
    throw new Error('Socket context must be wrapped in provider');
  
  return context;
}

export { SocketContext, SocketProvider, useSocket };