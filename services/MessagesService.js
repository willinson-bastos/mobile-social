import axios from "axios";

class MessagesService{

    async lerMensagensDoServidor(){
        return axios({
            url:"http://192.168.0.100:3000/chat", //alterar ip (ver vídeo)
            method: "GET",
            timeout: 5000,
            headers:{
                Accept: 'application/json'
            }
        }).then((response)=>{
            return Promise.resolve(response);
        }).catch((error)=>{
            return Promise.reject(error);
        });
    }

    async enviarMensagem(data){
        return axios({
            url:"http://192.168.0.100:3000/chat", //alterar ip (ver vídeo)
            method: "POST",
            timeout: 5000,
            data: data,
            headers:{
                Accept: 'application/json'
            }
        }).then((response)=>{
            return Promise.resolve(response);
        }).catch((error)=>{
            return Promise.reject(error);
        });
    }



}

const messagesService = new MessagesService();
export default messagesService