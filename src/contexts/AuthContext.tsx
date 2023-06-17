import { ReactNode, createContext, useState } from "react";
import api from "../server";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IAuthProvider {
    children: ReactNode
}

const [user, setUser] = useState(() => {
    const user = localStorage.getItem('user')
    if(user) {
        return JSON.parse(user)
    }

    return {}
})

interface IUserData {
    name: string;
    email: string;
    avatar_url: string
}

interface IAuthContextData {
    signIn: ({ email, password }: ISignIn) => void
    signOut: () => void
    user: IUserData
}

interface ISignIn {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: IAuthProvider) {
    const navigate = useNavigate()
    async function signIn({ email, password }: ISignIn) {
        try {
            const { data } = await api.post('/users/auth', {
                email,
                password
            });

            const { token, refresh_token, user } = data
            const userData = {
                name: user.name,
                email: user.email,
                avatar_url: user.avatar_url,
            }

            localStorage.setItem('token', token)
            localStorage.setItem('refresh_token', refresh_token)
            localStorage.setItem('user', JSON.stringify(userData))
            

            navigate('/dashboard');
            toast.success(`Seja bem vindo ${userData.name}!`)
            return data
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message)
            } else {
                toast.error('Erro ao fazer login. Tente novamente mais tarde.')
            }
        }
    }

    function signOut() {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}