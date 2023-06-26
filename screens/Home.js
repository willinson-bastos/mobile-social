import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { FAB } from '@rneui/themed';
import styles from '../style/MainStyle';
import UserContext from '../contexts/UserContext';

export default function Home({ navigation }) {

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    // Atualize seus dados aqui
  
    // Defina o estado de atualização como verdadeiro para mostrar o indicador de carregamento
    setRefreshing(true);
  
    // Execute a lógica de atualização (por exemplo, buscar dados atualizados do servidor)
  
    // Após a conclusão da atualização, defina o estado de atualização como falso para ocultar o indicador de carregamento
    setRefreshing(false);
  };

    const userData = useContext(UserContext).userData;

    const [posts, setPosts] = useState([
        // Array de exemplo com as postagens existentes
        {
            titulo: 'Título da Postagem 1',
            data: 'Data da Postagem 1',
            nomeUsuario: 'Usuário 1',
            emailUsuario: 'usuario1@example.com',
            texto: 'Conteúdo da Postagem 1',
          },
          {
            titulo: 'Título da Postagem 2',
            data: 'Data da Postagem 2',
            nomeUsuario: 'Usuário 2',
            emailUsuario: 'usuario2@example.com',
            texto: 'Conteúdo da Postagem 2',
          },
          {
              titulo: 'Título da Postagem 2',
              data: 'Data da Postagem 2',
              nomeUsuario: 'Usuário 2',
              emailUsuario: 'usuario2@example.com',
              texto: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            },
            {
                titulo: 'Título da Postagem 2',
                data: 'Data da Postagem 2',
                nomeUsuario: 'Usuário 2',
                emailUsuario: 'usuario2@example.com',
                texto: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
              },{
                titulo: 'Título da Postagem 2',
                data: 'Data da Postagem 2',
                nomeUsuario: 'Usuário 2',
                emailUsuario: 'usuario2@example.com',
                texto: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
              },{
                titulo: 'Título da Postagem 2',
                data: 'Data da Postagem 2',
                nomeUsuario: 'Usuário 2',
                emailUsuario: 'usuario2@example.com',
                texto: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
              },
        // ...
      ]);


  const [newPost, setNewPost] = useState({
    titulo: '',
    conteudo: '',
  });

  const chat = () => {
    navigation.navigate('Chat');
  };

  const logout = () =>{

    //Implementar métodos de logout aqui

    navigation.reset({ 
        index: 0,
        routes: [{name: "Login"}]
      });
  }

  return (

<View style={styles.home}>
  
        <View style={homeStyle.homeBarContainer}>
          <Text style={homeStyle.homeBarText} h4>
            Nome do site
          </Text>
          <View style={homeStyle.homeBox}>
            <View style={homeStyle.userBox}>
                <Text>{userData.nome}</Text>
                <Text>{userData.email}</Text>
            </View>
            <View style={homeStyle.logoutContainer}>
              <Button
                title={<Text style={homeStyle.logoutText}>Logout</Text>}
                type="clear"
                onPress={()=>logout()}
              />
            </View>
          </View>
        </View>
        
        <ScrollView style={homeStyle.postListContainer}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
          <View style={homeStyle.formContainer}>
              <Text h4>Criar Post</Text>
              <Input
              label="Título"
              value={newPost.titulo}
              onChangeText={(text) => setNewPost({ ...newPost, titulo: text })}
              />
              <Input
              label="Conteúdo"
              value={newPost.conteudo}
              onChangeText={(text) => setNewPost({ ...newPost, conteudo: text })}
              multiline
              />
              <Button title="Criar"  />
          </View>

          {posts.map((post, index) => (
            <View key={index} style={homeStyle.postContainer}>
                  <View style={homeStyle.postHeaderActions}>
                    <Button
                      title="Excluir"
                      buttonStyle={homeStyle.deleteButton}
                    />
                  </View>
              <View style={homeStyle.postHeader}>
                <View style={homeStyle.postHeaderInfo}>
                  <Text style={homeStyle.postTitle}>Título: {post.titulo}</Text>
                  <Text>Data: {post.data}</Text>
                </View>
                <View style={homeStyle.postHeaderAuthor}>
                  <Text>Autor: {post.nomeUsuario}</Text>
                  <Text>Email: {post.emailUsuario}</Text>
                </View>
                  
              </View>
              <View style={homeStyle.postBody}>
                <Text>{post.texto}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={homeStyle.fabContainer}>
          <FAB size="large" color="#2089dc" onPress={()=>chat()} />
        </View>
</View>

  );
}


const homeStyle = StyleSheet.create({
    homeBarContainer: {
      position: 'absolute',
      top: 40,
      width: '100%',
      height: 140,
      backgroundColor: '#2089dc',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
    },
    homeBarText: {
      color: 'white',
      position: 'relative',
      top: 10,
    },
    homeBox:{
      marginTop: 8,
      height: 100, 
      flexDirection: 'column',
      alignItems: 'flex-end',
      width: 100,
    },
    userBox:{
      backgroundColor: '#c6dfff',
      elevation: 2,
      alignItems: 'flex-start',
      flexDirection: 'column',
      borderRadius: 5,
      padding:6,
      height: 80,
      width: 190,
      right: 0
    },
    logoutContainer: {
      backgroundColor: '#B71D18',
      zIndex: 1,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 5,
      width: 68
    },
    logoutText: {
      color: 'white',
    }, 
    fabContainer: {
      position: 'absolute',
      bottom: 6,
      right: 6,
      zIndex: 1,
    },
    postListContainer: {
      marginTop: 185,
    },
    postContainer: {
      backgroundColor: '#fff',
      marginHorizontal: 10,
      marginVertical: 10,
      padding: 20,
      width: "95%",
      borderRadius: 5,
      elevation: 2
    },
    postHeader: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    postHeaderInfo: {
    },
    postTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    postHeaderAuthor: {},
    postHeaderActions: {
        alignItems: 'flex-end'
    },
    deleteButton: {
      backgroundColor: '#B71D18',
      height: 30,
      width: 70,
      padding: 0,
    },
    postBody: {},
    formContainer: {
        padding: 20,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 5,
        elevation: 2,
      },
  });

