import axios from "axios";

class UsuarioService{

    async cadastrar(data){
        return axios({
            url:"http://192.168.0.110:3000/usuario",
            method: "POST",
            timeout: 8000,
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

const usuarioService = new UsuarioService();
export default usuarioService