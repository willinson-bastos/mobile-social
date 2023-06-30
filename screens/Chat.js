import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, TextInput } from "react-native";
import { Button, Text } from 'react-native-elements';
import UserContext from '../contexts/UserContext';
import messagesService from '../services/MessagesService';
import usuarioService from '../services/UsuarioService';
import Toast from '../components/ToastComponent';
import { SocketContext } from '../contexts/SocketContext';

export default function Chat(){

    const socket = useContext(SocketContext);

    const toastRef = useRef(null);
  
    const showToast = (message) => {
      toastRef.current.show(message);
    };

    const userData = useContext(UserContext);

    const[showUsers, setShowUsers] = useState(true);
    const[showMessages, setShowMessages] = useState(false);

    const[messageInputHeight, setMessageInputHeight] = useState(40);


    const handleMessageInputChange = (text) => {
        setMessageToSend(text);
    };
    
    const handleMessageInputContentSizeChange = (event) => {
        const { height } = event.nativeEvent.contentSize;
        setMessageInputHeight(height);
    };


    const[messageToSend, setMessageToSend] = useState(null);

    const messageInputRef = useRef(null);

    const[refreshing, setRefreshing] = useState(false);

    const[usuariosComMensagem, setUsuariosComMensagem] = useState([]);
    const[usuariosSemMensagem, setUsuariosSemMensagem] = useState([]);

    const[selectedUserId, setSelectedUserId] = useState([]);

    const[messagesFromServer, setMessagesFromServer] = useState([]);

    const[messages, setMessages] = useState([]);

    const handleReceiveMessage = async (message) => {
      console.log(message);

      if(message && message.idSender && message.idReceiver && message.text){
          //fazer todas as verificações
            if(showMessages === true && (message.idSender === selectedUserId && message.idReceiver === userData.userData.id)){
              setMessages((messages)=>[...messages, message]);
              //filtrarMensagens(selectedUserId);
            }

           /* if(message.idReceiver === userData.userData.id){
              if(showUsers === true || (showUsers === false && selectedUserId !== message.idSender)){
                console.log('entrou na condição de fora do chat');
                //ler o usuário que enviou a msg
                try{
                  const response = usuarioService.lerUmUsuario(message.idSender);
                  const user = response.data;
                  console.log('Usuário que enviou a msg: '+ user);
                  //exibir toast de mensagem recebida se estiver fora da conversa com este usuário
                  if(user){
                    showToast("Nova mensagem ");
                  };
                }catch(error){
                  console.log('Erro lançado: ' + error);
                }
               
                
              }
              
            }*/
        } else{
          console.log("O objeto message ou alguma de suas propriedades não estão definidos corretamente.");
        }
    };

    useEffect(() => {

      const fetchData = async () => {
        await lerMensagensDoServidor();
        await lerUsuariosDoServidor(); 
      };
  
      fetchData();

        // Ouvir o evento 'message' do servidor e adicionar a mensagem recebida ao estado de mensagens
        socket.on('message', (message) => {handleReceiveMessage(message)});
      
    }, []);

    const lerMensagensDoServidor = async () => { 
      try {
        const response = await messagesService.lerMensagensDoServidor();
        const msg = response.data;
        setMessagesFromServer(msg);
      } catch (error) {
        console.error('Erro ao obter os as mensagens do servidor:', error);
      }
    };

    const lerUsuariosDoServidor = async () => { 
      try {
        const response = await usuarioService.lerUsuarios();
        const users = response.data;
        const usersComMensagem = users.filter(
          (user) => user.id !== userData.userData.id && hasMessages(user.id)
        );
        setUsuariosComMensagem(usersComMensagem);
        const usersSemMensagem = users.filter(
          (user) => user.id !== userData.userData.id && !hasMessages(user.id)
        );
        setUsuariosSemMensagem(usersSemMensagem);
      } catch (error) {
        console.error('Erro ao obter os as mensagens do servidor:', error);
      }
    };

    const hasMessages = (id) => {
    const temMensagens = messagesFromServer.some(message =>
      (message.idSender === userData.userData.id && message.idReceiver === id) ||
      (message.idSender === id && message.idReceiver === userData.userData.id)
    );

    //console.log(temMensagens);
    return temMensagens;
    }

    const handleRefresh = () => {
      
        // Definir o estado de atualização como verdadeiro para mostrar o indicador de carregamento
        setRefreshing(true);
        // Executar a lógica de atualização
        const fetchData = async () => {
          await lerMensagensDoServidor();
          await lerUsuariosDoServidor();
    
        };
        fetchData();
        //Filtrar mensagens se estiver na aba de chat
        if(showMessages === true){
          filtrarMensagens(selectedUserId);
        }
        // Após a conclusão da atualização, definir o estado de atualização como falso para ocultar o indicador de carregamento
        setRefreshing(false);
      };


    const handleSendMessage = (message) => {
        // Lógica para enviar a mensagem
        if(showMessages === true && message !== null && message !== ''){
          if(userData.userData && userData.userData.nome){
          //Formatar horário de envio da mensagem
          const date = new Date();
          const horas = ("0" + date.getHours()).slice(-2);  // Obtém as horas com zero à esquerda
          const minutos = ("0" + date.getMinutes()).slice(-2);  // Obtém os minutos com zero à esquerda

          const dataFormatada = `(${horas}:${minutos})`;  // Cria a string no formato 

          let data = {
            idSender: userData.userData.id,
            idReceiver: selectedUserId,
            text: ("["+ userData.userData.nome +"]"+dataFormatada + ": " + message)
          }

          console.log(data);
          setMessages((prevMessages)=>[...prevMessages, data]);
          messagesService.enviarMensagem(data);

          // Após o envio da mensagem
          setMessageToSend('');
          messageInputRef.current.clear(); // Limpa o campo de entrada de mensagem
        }
      } 
    };
      


    const handleUserPress = (id) => {

      setSelectedUserId(id);
      
      setTimeout(()=>{
        lerMensagensDoServidor();
      }, 1000);

      if(!id) return ;

      filtrarMensagens(id);

      setShowUsers(false);
      setShowMessages(true);
    };

    const filtrarMensagens = (id) => {
      console.log('filtrarMensagens');
      const filteredMessages = messagesFromServer.filter((message)=>{
        return (message.idSender === userData.userData.id && message.idReceiver === id) ||
         (message.idSender === id && message.idReceiver === userData.userData.id)
      });
      setMessages(filteredMessages);
    };

    const handleBackPress = () => {
        
        setShowUsers(true);
        setShowMessages(false);
        handleRefresh();
    };


    

    return(
        <View style={chatStyle.chatView}>
                {showUsers &&(            
                <ScrollView style={chatStyle.userList} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
                        {usuariosComMensagem.map((user, index) => (
                            <View key={index} style={chatStyle.userContainer}>

                                
                                <Text onPress={() => handleUserPress(user.id)}>
                                    <View>
                                        <Text>{user.nome}</Text>
                                        <Text>{user.email}</Text>
                                    </View>    
                                </Text>
                                
                            </View>
                        ))}
                        <Text style={chatStyle.newChat}>Inicie uma nova conversa: </Text>
                        {usuariosSemMensagem.map((user, index) => (
                                <View key={index} style={chatStyle.userContainer}>
                                    <Text onPress={() => handleUserPress(user.id)}>
                                        <View>
                                            <Text>{user.nome}</Text>
                                            <Text>{user.email}</Text>
                                        </View>    
                                    </Text>
                                </View>
                            ))}
                    </ScrollView>
                    
                    
                )}

                {showMessages &&(     
                <View style={chatStyle.conversa}>
                    <View style={chatStyle.actions}>
                        <Button onPress={()=>handleBackPress()} buttonStyle={{width: 100, maxHeight: 50, backgroundColor: '#B71D18'}}title="Voltar"/>
                    </View>
                    
                    <ScrollView style={chatStyle.messageList} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
                        {messages.map((message, index) => (
                        <View key={index} style={chatStyle.userContainer}>
                            
                            <View>
                                <Text>{message.text}</Text>
                            </View>
                        </View>
                        ))}
                    </ScrollView>
                    
                    <View style={chatStyle.messageForm}>
                        <View style={chatStyle.messageInputForm}>
                        <TextInput
                            placeholder="Digite sua mensagem"
                            value={messageToSend}
                            onChangeText={handleMessageInputChange}
                            multiline
                            onContentSizeChange={handleMessageInputContentSizeChange}
                            ref={messageInputRef}
                        />
                        </View>
                        <Button title="Enviar" onPress={()=>handleSendMessage(messageToSend)}/>
                    </View>
                </View>
                )}
            {/* Adicione o componente Toast no final da view */}
            <Toast ref={toastRef} />
        </View>
    );
}

const chatStyle = StyleSheet.create({
    chatView:{
        flexDirection: 'column',
        width: "100%",
        height: "100%",
        bottom: 10,
        top: 0
    },
    userList:{
        height:"60%"
    },
    userContainer: {
        position: 'relative',
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 2.5,
        padding: 15,
        width: "95%",
        borderRadius: 5,
        elevation: 2,
      },
      actions:{
        backgroundColor: "#fff",
        flexDirection: 'row',
        position: 'relative',
        top: 0,
        paddingVertical: 1,
        paddingHorizontal: 5,
        height: "6%",
        width: "100%",
      },
      conversa:{
        flexDirection: 'column',
        height: "100%",
        alignItems: 'stretch'
      },
      messageForm: {
        bottom: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 1,
        marginHorizontal: 1,
        padding: 5,
        width: '100%',
        height: 50,
        borderRadius: 5,
        elevation: 2,
      },
      messageInputForm:{
        width: "80%"
      },
      messageList:{
        marginTop: 10,
        marginBottom: 0
      },
      newChat:{
        position: 'relative',
        backgroundColor: '#2089dc',
        color: 'white',
        fontWeight:'bold', 
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 2.5,
        padding: 15,
        width: "95%",
        borderRadius: 5,
        elevation: 2,
      },

})