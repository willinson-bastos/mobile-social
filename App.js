
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import Cadastro from './screens/Cadastro';
import Chat from './screens/Chat';
import { UserProvider } from './contexts/UserContext';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <UserProvider>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </UserProvider>
  );
}

export default function App() {
  return(
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  )

}


