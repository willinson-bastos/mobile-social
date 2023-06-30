import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const userName = await AsyncStorage.getItem("userName");
      const userEmail = await AsyncStorage.getItem("userEmail");

      if (userId && userName && userEmail) {
        setUserData({
          id: parseInt(userId, 10),
          nome: userName,
          email: userEmail,
        });
        //console.log(userData);
      }
    } catch (error) {
      console.log('Erro ao carregar os dados do usuário:', error);
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("userEmail");
      setUserData(null);
    } catch (error) {
      console.log('Erro ao deletar os dados do usuário:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

