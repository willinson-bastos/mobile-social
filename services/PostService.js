import axios from "axios";

class PostService{

    async criarPost(data){
        return axios({
            url:"http://192.168.0.100:3000/home", //alterar ip (ver vídeo)
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

    async lerPosts(){
        return axios({
            url:"http://192.168.0.100:3000/home/posts", //alterar ip (ver vídeo)
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

    async deletarPost(id){
        return axios({
            url:"http://192.168.0.100:3000/home/" + id, //alterar ip (ver vídeo)
            method: "DELETE",
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
}

const postService = new PostService();
export default postService