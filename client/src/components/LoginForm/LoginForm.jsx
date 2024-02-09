import style from './loginForm.module.css'
export const LoginForm = () => {
    return (
    <div className={style.container}>
        <form className={style.form} onSubmit={(items) => console.log(items)}>
            <input name='username' placeholder='Username'/>
            <input name='password' type='password' placeholder='Password'/>
            <button type='submit'>Login</button>
            <button type='button'>Sign up</button>
        </form>
    </div>
    )
}