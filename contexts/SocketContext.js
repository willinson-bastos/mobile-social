import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Crie o contexto do socket
export const SocketContext = createContext(null);

// Crie o componente SocketProvider para fornecer o contexto do socket
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Inicializar a instância do socket quando o componente for montado
    const newSocket = io('http://192.168.0.100:3000'); // Altere o endereço e a porta conforme necessário

    setSocket(newSocket);

    // Desconectar a instância do socket quando o componente for desmontado
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
