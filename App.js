
import React, { useState } from 'react';
import { View} from 'react-native';
import { Input, Text } from 'react-native-elements';
import { Button } from '@rneui/themed';
import  Icon  from 'react-native-vector-icons/FontAwesome'; //ao importar da internet lembrar de tirar as chaves
import styles from './style/MainStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import Cadastro from './screens/Cadastro';
import Chat from './screens/Chat';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

export default function App() {
  return(
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  )

}


