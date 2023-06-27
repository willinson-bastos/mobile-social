import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { FAB } from '@rneui/themed';
import styles from '../style/MainStyle';
import UserContext from '../contexts/UserContext';
import postService from '../services/PostService';

export default function Home({ navigation }) {

  const [refreshing, setRefreshing] = useState(false);

  const userData = useContext(UserContext);
  const { setUserData } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  const [newPostTitle, setNewPostTitle] = useState(null);
  const [newPostText, setNewPostText] = useState(null);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.lerPosts();
        const posts = response.data;
        setPosts(posts.reverse());
      } catch (error) {
        console.error('Erro ao obter os posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleRefresh = () => {

    setRefreshing(true);
  
    postService
      .lerPosts()
      .then((response) => {
        const posts = response.data;
        setPosts(posts.reverse());
        setRefreshing(false);
      })
      .catch((error) => {
        console.error('Erro ao obter os posts:', error);
        setRefreshing(false);
      });
  };

  const validar = () =>{
    let error = false;

    if( newPostTitle === null || newPostTitle === '' ){
      error = true;
    }
    if( newPostText === null || newPostText === '' ){
      error = true;
    }

    return !error;
  }

  const criarPost = () => {
    if(!validar()){
      Alert.alert(
        'Erro',
        'Há campos não preenchidos para sua publicação.',
        [
          {
            text: 'Ok',
            style:'cancel'
          }
        ]
      );
    }
    if(validar()){

      const date = new Date();
      const ano = date.getFullYear();
      const mes = ("0" + (date.getMonth() + 1)).slice(-2);
      const dia = ("0" + date.getDate()).slice(-2);
      const horas = ("0" + date.getHours()).slice(-2);
      const minutos = ("0" + date.getMinutes()).slice(-2);

      const dataFormatada = `${dia}/${mes}/${ano} - ${horas}:${minutos}`;

      let data = {
        nomeUsuario: userData.userData.nome,
        emailUsuario: userData.userData.email,
        titulo: newPostTitle,
        data: dataFormatada,
        texto: newPostText
      }

      postService.criarPost(data)
      .then(()=>{
        // Atualizar a lista de posts após a criação
        setNewPostTitle(null);
        setNewPostText(null);
        handleRefresh();
      })
      .catch((error)=> {
        console.error('Erro ao criar o post:', error);
        Alert.alert(
          'Erro',
          'Erro ao criar o post.',
          [
            {
              text: 'Ok',
              style:'cancel'
            }
          ]
        );
      });
    }
  };

  const deletarPost = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir a publicação?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            // Chame a função de exclusão do postService aqui
            postService.deletarPost(id)
              .then(() => {
                // Atualizar a lista de posts após a exclusão
                handleRefresh();
              })
              .catch((error) => {
                console.error('Erro ao excluir o post:', error);
              });
          },
        },
      ]
    );
  };

  const chat = () => {
    navigation.navigate('Chat');
  };

  const logout = () =>{

    setUserData(null);

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
              {userData.userData?
              (
                <>
                <Text>ID: {userData.userData.id}</Text>
                <Text>{userData.userData.nome}</Text>
                <Text>{userData.userData.email}</Text>
                </>
              ):(
                <Text>Dados não obtidos</Text>
              )}
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
              value={newPostTitle}
              onChangeText={(text) => setNewPostTitle(text)}
              />
              <Input
              label="Conteúdo"
              value={newPostText}
              onChangeText={(text) => setNewPostText(text)}
              multiline
              />
              <Button title="Criar"  onPress={()=>criarPost()}/>
          </View>

          {posts.map((post, index) => (
            <View key={index} style={homeStyle.postContainer}>
                  <View style={homeStyle.postHeaderActions}>
                    
                      { userData.userData && userData.userData.email === post.emailUsuario && (
                        <Button
                          title="Excluir"
                          buttonStyle={homeStyle.deleteButton}
                          onPress={()=>deletarPost(post.id)}
                        />
                        )
                      }
                     
                  </View>
              <View style={homeStyle.postHeader}>
                <View style={homeStyle.postHeaderInfo}>
                  <Text style={homeStyle.postTitle}>Título: {post.titulo}</Text>
                  <Text>Data: {post.data}</Text>
                  <Text>ID: {post.id}</Text>
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

