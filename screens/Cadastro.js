
import React, { useState } from 'react';
import { View} from 'react-native';
import { Text } from 'react-native-elements';
import { Input, Button } from '@rneui/themed';
import  Icon  from 'react-native-vector-icons/FontAwesome'; //ao importar da internet lembrar de tirar as chaves
import styles from '../style/MainStyle';

export default function Cadastro({navigation}) {

  const[nome, setNome] = useState(null);
  const[email, setEmail] = useState(null); //valor que for inserido no set será atribuído a variável
  const[senha, setSenha] = useState(null);
  const[errorNome,setErrorNome] = useState(null);
  const[errorEmail,setErrorEmail] = useState(null);
  const[errorSenha,setErrorSenha] = useState(null);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validar = () =>{
    let error = false

    setErrorNome(null)
    setErrorEmail(null)
    setErrorSenha(null)

    if(nome == null || nome == '' ){
      setErrorNome("Preencha seu nome de usuário corretamente.")
      error = true
    }
    if(!validateEmail(email)){
      setErrorEmail("Preencha seu e-mail corretamente.")
      error = true
    }
    if(senha == null || senha == ''){
      setErrorSenha("Preencha sua senha corretamente.")
      error = true  
    }
    if(senha)
     if(senha.length < 8 && senha != null && senha !=''){
      setErrorSenha("A senha deve ter pelo menos 8 caracteres.")
      error = true
    }
    
    return !error
  }

  const cadastrar = () =>{
    if(validar()){
      console.log(nome);
      console.log(email);
      console.log(senha);
      console.log("Cadastro salvo");
    }
  }

  const login = () =>{
    navigation.reset({
        index: 0,
        routes: [{name: "Login"}]
    });
  }

  return (
    <View style={styles.container}> 
      <Text h3>Cadastro</Text>
      <Input
        placeholder="Nome"
        leftIcon={{ type: 'font-awesome', name: 'user'}}
        onChangeText={value =>{ 
          setNome(value)
          setErrorNome(null)
        } }
        errorMessage={errorNome}
      />
      <Input
        placeholder="E-mail"
        leftIcon={{ type: 'font-awesome', name: 'envelope'}}
        onChangeText={value =>{ 
          setEmail(value)
          setErrorEmail(null)
        } }
        keyboardType="email-address"
        errorMessage={errorEmail}
      />
      <Input
        placeholder="Senha"
        leftIcon={{ type: 'font-awesome', name: 'lock'}}
        onChangeText={value =>{ 
          setSenha(value)
          setErrorSenha(null)
        } }
        secureTextEntry={true}
        errorMessage={errorSenha}
      /> 
      <Button 
      title="Cadastrar"
      radius={'sm'} 
      type="solid" 
      size='lg' 
      onPress={()=>cadastrar()} 
      buttonStyle = {styles.button}
      icon={<Icon name="check" size={20} color="white"/>}
      />
     
      <Button 
      title="Já possui uma conta? Entrar"
      radius={'sm'} 
      type="clear" 
      size='lg' 
      onPress={()=>login()} 
      buttonStyle = {styles.button}
      />
        
    </View>
  );
}


//<Button radius={'sm'} type="solid" size='lg' onPress={()=>entrar()} title="Entrar" /> teste este botão depois e tente inserir o icon abaixo:
//<Icon name="check" size={20} color="white"/>