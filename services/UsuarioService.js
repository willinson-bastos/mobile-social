import axios from "axios";

class UsuarioService{

    async cadastrar(data){
        return axios({
            url:"http://192.168.0.100:3000/usuario", //alterar ip (ver vídeo)
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

    async login(data){
        return axios({
            url:"http://192.168.0.100:3000/usuario/login", //alterar ip (ver vídeo)
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

    async lerUsuarios(){
        return axios({
            url:"http://192.168.0.100:3000/usuario/listar", //alterar ip (ver vídeo)
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

    async lerUmUsuario(id){
        return axios({
            url:`http://192.168.0.100:3000/usuario/${id}`, //alterar ip (ver vídeo)
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

}

const usuarioService = new UsuarioService();
export default usuarioService