import style from './Header.module.css';
import logo from '../../assets/logo_branca.png';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../Hooks/auth';

export function Header() {
    const { signOut } = useAuth()
    const[open, setOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <header className={style.background}>
            <div className={style.img} onClick={() => navigate('/dashboard')}>
                <img src={logo} alt="" />
                <span>Hero HairDressess</span>
            </div>

            <div className={style.profile}>
                <div className={style.dropdown} onClick={() => setOpen(!open)}>
                    <CgProfile size={25} />
                    <span>Perfil</span>
                    {open && (
                        <ul className={style.dropdownMenu}>
                            <li className={style.dropdownMenuItem}>Agendamentos</li>
                            <li className={style.dropdownMenuItem}>Editar Perfil</li>
                            <li className={style.dropdownMenuItem} onClick={signOut}>Sair</li>
                        </ul>
                    )}
                    
                </div>
            </div>
        </header>
    )
}