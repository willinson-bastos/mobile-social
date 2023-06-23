
import React, { useState } from 'react';
import { View} from 'react-native';
import { Text } from 'react-native-elements';
import { Input, Button } from '@rneui/themed';
import  Icon  from 'react-native-vector-icons/FontAwesome'; //ao importar da internet lembrar de tirar as chaves
import styles from '../style/MainStyle';

export default function Login({navigation}) {

  const[email, setEmail] = useState(null); //valor que for inserido no setEmail será atribuído a variável email
  const[senha, setSenha] = useState(null);

  const[errorEmail,setErrorEmail] = useState(null);
  const[errorSenha,setErrorSenha] = useState(null);

  const entrar = () =>{
    
    if(validar()){
      console.log(email);
      console.log(senha);

      navigation.reset({
        index: 0,
        routes: [{name: "Home"}]
      });
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validar = () =>{
    let error = false;
    setErrorEmail(null)
    setErrorSenha(null)

    if(!validateEmail(email)){
      setErrorEmail("Preencha seu e-mail corretamente.")
      error = true
    }
    if(senha == null || senha == ''){
      setErrorSenha("Preencha sua senha corretamente.")
      error = true  
    }

    return !error;
  }

  const cadastrar = () =>{
    navigation.reset({ //navegação definitiva sem botão 'voltar'
        index: 0,
       routes: [{name: "Cadastro"}]
    });
  //navigation.navigate("Cadastro");//navegação com botão voltar para testes
  }

  return (
    <View style={styles.container}> 
      <Text h3>Bem vindo(a)!</Text>
      <Input
        placeholder="E-mail"
        leftIcon={{ type: 'font-awesome', name: 'envelope'}}
        onChangeText={value => {
          setEmail(value);
          setErrorEmail(null);
        }}
        keyboardType="email-address"
        errorMessage={errorEmail}
      />
      <Input
        placeholder="Senha"
        leftIcon={{ type: 'font-awesome', name: 'lock'}}
        onChangeText={value => {
          setSenha(value);
          setErrorSenha(null);
        }}
        secureTextEntry={true}
        errorMessage={errorSenha}
      /> 
      <Button 
      radius={'sm'} 
      type="solid" 
      size='lg' 
      onPress={()=>entrar()} 
      title="Entrar" 
      icon={<Icon name="check" size={20} 
      color="white"/>} 
      buttonStyle = {styles.button}
      />
      <Button 
      title="Não possui uma conta? Cadastre-se"
      radius={'sm'} 
      type="clear" 
      size='lg' 
      onPress={()=>cadastrar()} 
      buttonStyle = {styles.button}  
      />

    </View>
  );
}


