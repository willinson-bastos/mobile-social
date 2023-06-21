
import React, { useState } from 'react';
import { View} from 'react-native';
import { Input, Text } from 'react-native-elements';
import { Button } from '@rneui/themed';
import  Icon  from 'react-native-vector-icons/FontAwesome'; //ao importar da internet lembrar de tirar as chaves
import styles from '../style/MainStyle';

export default function Login({navigation}) {

  const[email, setEmail] = useState(null); //valor que for inserido no setEmail será atribuído a variável email
  const[password, setPassword] = useState(null);

  const entrar = () =>{
    console.log(email);
    console.log(password);
    //navigation.reset({ //navegação definitiva
  //      index: 0,
   //     routes: [{name: "Home"}]
  //  });
  navigation.navigate("Home");//navegação com botão voltar para testes
  }

  return (
    <View style={styles.container}> 
      <Text h3>Bem vindo(a)!</Text>
      <Input
        placeholder="E-mail"
        leftIcon={{ type: 'font-awesome', name: 'envelope'}}
        onChangeText={value => setEmail(value)}
        keyboardType="email-address"
      />
      <Input
        placeholder="Senha"
        leftIcon={{ type: 'font-awesome', name: 'lock'}}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      /> 
      <Button radius={'sm'} type="solid" size='lg' onPress={()=>entrar()}>
        <Icon name="check" size={20} color="white"/>
         Entrar
      </Button>
      

    </View>
  );
}


