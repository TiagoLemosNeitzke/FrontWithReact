import style from './Login.module.css'
import logo from '../../assets/logo.webp'
import { Input } from '../../components/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../components/Button'
import { Link} from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { BsKey } from 'react-icons/bs'
import api from '../../server'
import { useAuth } from '../../Hooks/auth'

interface IFormValues {
    email: string;
    password: string;
}

export function Login() {
    const {signIn} = useAuth()
    

    const schema = yup.object().shape({
        email: yup.string().required('Email obrigatório.').email('Email inválido.'),
        password: yup.string().required('Senha obrigatória.').min(6, 'Senha deve ter no mínimo 6 caracteres.').max(8, 'Senha deve ter no máximo 8 caracteres.')
    })

    const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>({ resolver: yupResolver(schema) })

    const submit = handleSubmit(({email, password}) => {
        try {
            signIn({ email, password })   
            
        } catch (error) {
            
        }
        
        
    })
    return (
        <div className={style.background}>
            <div className={`container ${style.container}`}>
                <div className={style.wrapper}>
                    <div>
                        <img src={logo} alt="Logo marca" />
                    </div>

                    <div className={style.card}>
                        <h2>Olá! seja bem vindo!</h2>

                        <form onSubmit={submit}>
                            <Input
                                placeholder='Email'
                                type='email'
                                {...register('email', { required: true })}
                                error={errors.email && errors.email.message}
                                icon={<AiOutlineMail />}
                            />

                            <Input
                                placeholder='Senha'
                                type='password'
                                {...register('password', { required: true })}
                                error={errors.password && errors.password.message}
                                icon={<BsKey />}
                            />
                            <Button label='Entrar' />
                        </form>
                        <div className={style.register}>
                            <span>Ainda Não tem conta? <Link to={'/register'}>Cadastre-se</Link></span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}