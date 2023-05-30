import { setAuth } from '../context/Auth'
import api from './axiosClient'
export class AuthClient {
    static async login (username: string, password: string) {
        try{
            const result = await api.post('/auth/login', {username, password})
            console.log(result)
            if(result.status === 200){
            setAuth(true)
            localStorage.setItem('auth', JSON.stringify(result.data))
            return true
            }
            return false
        } catch (error) {

        }
    }
    static async registration (username: string, password: string) {
        try{
            const result = await api.post('/auth/login', {username, password})
            console.log(result)
            if(result.status === 201){
            setAuth(false)
            return true
            }
            return false
        } catch (error) {

        }
    }
}