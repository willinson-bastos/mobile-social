import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, TextInput } from "react-native";
import { Button, Text, Input } from 'react-native-elements';
import styles from '../style/MainStyle';

export default function Chat(){

    const [showUsers, setShowUsers] = useState(true);
    const [showMessages, setShowMessages] = useState(false);

    const [messageInputHeight, setMessageInputHeight] = useState(40);

    const handleMessageInputChange = (text) => {
        setMessageToSend(text);
    };
    
    const handleMessageInputContentSizeChange = (event) => {
        const { height } = event.nativeEvent.contentSize;
        setMessageInputHeight(height);
    };


    const[messageToSend, setMessageToSend] = useState(null);

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        // Atualize seus dados aqui
      
        // Defina o estado de atualização como verdadeiro para mostrar o indicador de carregamento
        setRefreshing(true);
      
        // Execute a lógica de atualização (por exemplo, buscar dados atualizados do servidor)
      
        // Após a conclusão da atualização, defina o estado de atualização como falso para ocultar o indicador de carregamento
        setRefreshing(false);
      };

      const handleSendMessage = () => {
        // Lógica para enviar a mensagem
        setMessageToSend('');
        messageInputRef.current.clear(); // Limpa o campo de entrada de mensagem
      };
      


    const handleUserPress = () => {
        setShowUsers(false);
        setShowMessages(true);
    };
    const handleBackPress = () => {
        setShowUsers(true);
        setShowMessages(false);
    };


    const [users, setUsers] = useState([
        {
            nome: 'Usuário 1',
            email: 'usuario1@example.com',
          },
          {
            nome: 'Usuário 2',
            email: 'usuario2@example.com',
          },
          {
            nome: 'Usuário 3',
            email: 'usuario3@example.com',
          },
          {
            nome: 'Usuário 1',
            email: 'usuario1@example.com',
          },
          {
            nome: 'Usuário 2',
            email: 'usuario2@example.com',
          },
          {
            nome: 'Usuário 3',
            email: 'usuario3@example.com',
          },
         
          {
            nome: 'Usuário 1',
            email: 'usuario1@example.com',
          },
          {
            nome: 'Usuário 2',
            email: 'usuario2@example.com',
          },
          {
            nome: 'Usuário 3',
            email: 'usuario3@example.com',
          },
         
    ]);

    const[newUsers, setNewUsers] = useState([
        {
            nome: 'Usuário new 1',
            email: 'usuario1@example.com',
          },
          {
            nome: 'Usuário new 2',
            email: 'usuario2@example.com',
          },
          {
            nome: 'Usuário new 3',
            email: 'usuario3@example.com',
          },
          {
            nome: 'Usuário new 1',
            email: 'usuario1@example.com',
          },
          {
            nome: 'Usuário new 2',
            email: 'usuario2@example.com',
          },
          {
            nome: 'Usuário new 3',
            email: 'usuario3@example.com',
          },{
            nome: 'Usuário new 1',
            email: 'usuario1@example.com',
          },
          {
            nome: 'Usuário new 2',
            email: 'usuario2@example.com',
          },
          {
            nome: 'Usuário new 3',
            email: 'usuario3@example.com',
          },
    ]);

    const [messages, setMessages] = useState([
        {text: 'olá'},
        {text: 'bom dia'},
        {text: 'olá, bom dia'},
        {text: 'como vai?'},
        {text: 'bem, e você?'},
        {text: 'que bom, estou bem'},
        {text: 'olá'},
        {text: 'bom dia'},
        {text: 'olá, bom dia'},
        {text: 'como vai?'},
        {text: 'bem, e você?'},
        {text: 'que bom, estou bem'},
        {text: 'olá'},
        {text: 'bom dia'},
        {text: 'olá, bom dia'},
        {text: 'como vai?'},
        {text: 'bem, e você?'},
        {text: 'que bom, estou bem'},
        {text: 'olá'},
        {text: 'bom dia'},
        {text: 'olá, bom dia'},
        {text: 'como vai?'},
        {text: 'bem, e você?'},
        {text: 'que bom, estou bem'},
        {text: 'olá'},
        {text: 'bom dia'},
        {text: 'olá, bom dia'},
        {text: 'como vai?'},
        {text: 'bem, e você?'},
        {text: 'que bom, estou bem'},
        {text: 'olá'},
        {text: 'bom dia'},
        {text: 'olá, bom dia'},
        {text: 'como vai?'},
        {text: 'bem, e você?'},
        {text: 'que bom, estou bem'},
    ]);

    return(
        <View style={chatStyle.chatView}>
            {showUsers &&(            
            <ScrollView style={chatStyle.userList} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
                    {users.map((user, index) => (
                        <View key={index} style={chatStyle.userContainer}>

                            
                            <Text onPress={() => handleUserPress()}>
                                <View>
                                    <Text>{user.nome}</Text>
                                    <Text>{user.email}</Text>
                                </View>    
                            </Text>
                            
                        </View>
                    ))}
                    <Text style={chatStyle.newChat}>Inicie uma nova conversa: </Text>
                    {newUsers.map((user, index) => (
                            <View key={index} style={chatStyle.userContainer}>
                                <Text onPress={() => handleUserPress()}>
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
                    />
                    </View>
                    <Button title="Enviar" onPress={()=>handleSendMessage()}/>
                </View>
            </View>
            )}

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