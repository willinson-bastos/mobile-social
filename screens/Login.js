
import React, { useState, useRef, useContext  } from 'react';
import { View} from 'react-native';
import { Text } from 'react-native-elements';
import { Input, Button } from '@rneui/themed';
import  Icon  from 'react-native-vector-icons/FontAwesome'; //ao importar da internet lembrar de tirar as chaves
import styles from '../style/MainStyle';
import usuarioService from '../services/UsuarioService';
import Toast from '../components/ToastComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';//comentar depois
import UserContext from '../contexts/UserContext';
import { SocketContext } from '../contexts/SocketContext';

export default function Login({navigation}) {

  const socket = useContext(SocketContext);

  const[email, setEmail] = useState(null); //valor que for inserido no setEmail será atribuído a variável email
  const[senha, setSenha] = useState(null);

  const[errorEmail,setErrorEmail] = useState(null);
  const[errorSenha,setErrorSenha] = useState(null);

  const[isLoading, setLoading] = useState(false);

  const toastRef = useRef(null);

  const { setUserData } = useContext(UserContext);

  const showToast = (message) => {
    toastRef.current.show(message);
  };

  const entrar = () =>{
    
    if(validar()){

      setLoading(true);

      let data = {
        email: email,
        password: senha,
      }

      usuarioService.login(data) 
      .then( (response)=>{

        console.log(response.data);

        AsyncStorage.setItem("userId", JSON.stringify(response.data.user.id));
        AsyncStorage.setItem("userName", JSON.stringify(response.data.user.nome));
        AsyncStorage.setItem("userEmail", JSON.stringify(response.data.user.email));

        setUserData({
          id: response.data.user.id,
          nome: response.data.user.nome,
          email: response.data.user.email,
        });

        setTimeout(() => {
          socket.emit('loginChat', response.data.user.id);
        }, 1000);
          
        
        setLoading(false);

        navigation.reset({
          index: 0,
          routes: [{name: "Home"}]
        });
      })
      .catch((error) => {
        console.log(error);

        if (error.response && error.response.status === 401) {
          showToast('Verifique seu e-mail e senha.');
        }
      
        setLoading(false);
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

      {isLoading&&
        <Text>Carregando...</Text>
      }

      { !isLoading &&
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
      }

      <Button 
      title="Não possui uma conta? Cadastre-se"
      radius={'sm'} 
      type="clear" 
      size='lg' 
      onPress={()=>cadastrar()} 
      buttonStyle = {styles.button}  
      />

      {/* Adicione o componente Toast no final da view */}
      <Toast ref={toastRef} />
    </View>
  );
}


