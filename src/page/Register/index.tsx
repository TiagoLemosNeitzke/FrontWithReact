import style from './Register.module.css'
import logo from '../../assets/logo.webp'
import { Input } from '../../components/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineMail } from 'react-icons/ai';
import { BsKey } from 'react-icons/bs';
import api from '../../server'

interface IFormValues {
    name: string;
    email: string;
    password: string;
}

export function Register() {
    const schema = yup.object().shape({
        name: yup.string().required('Nome obrigatório.'),
        email: yup.string().required('Email obrigatório.').email('Email inválido.'),
        password: yup.string().required('Senha obrigatória.').min(6, 'Senha deve ter no mínimo 6 caracteres.').max(8, 'Senha deve ter no máximo 8 caracteres.')
    })

    const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>({ resolver: yupResolver(schema) })


    const submit = handleSubmit(async (data) => {
        const result = await api.post('/users', {
            name: data.name,
            email: data.email,
            password: data.password
        })
        console.log('dados do form =>', result)
    })
    return (
        <div className={style.background}>
            <div className="container">
                <p className={style.navigate}>
                    <Link to={'/'}>Home</Link> {'>'} Área de Cadastro
                </p>
                <div className={style.wrapper}>
                    <div className={style.imageContainer}>
                        <img src={logo} alt="Logo marca" />
                    </div>

                    <div className={style.card}>
                        <h2>Área de Cadastro</h2>

                        <form onSubmit={submit}>
                            <Input
                                placeholder='Insira seu nome'
                                type='text'
                                {...register('name', { required: true })}
                                error={errors.name && errors.name.message}
                                icon={<AiOutlineUser />}
                            />

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
                            <Button label='Cadastrar' />
                        </form>
                        <div className={style.register}>
                            <span>Já tem cadastro? <Link to={'/'}>Voltar à Pagina Inicial</Link></span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}