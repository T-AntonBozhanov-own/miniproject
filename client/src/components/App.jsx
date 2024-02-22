import {LoginForm} from "./LoginForm";
import {CurrencyConverter} from "./CurrencyConverter";
import {CurrencyAddForm} from "./CurrencyAddForm";
import {CurrencyDeleteForm} from "./CurrencyDeleteForm";
import {CurrencyUpdateForm} from "./CurrencyUpdateForm";
import style from './app.module.css'

const App = () => {
  return (
    <div className={style.main_container}>
        <div>
            <span>Login/Sign up</span>
            <LoginForm />
        </div>
        <div className={style.divider} />
        <div>
            <span>Convert</span>
            <CurrencyConverter />
        </div>
        <div className={style.divider} />
        <div>
            <span>Add</span>
            <CurrencyAddForm />
        </div>
        <div className={style.divider} />
        <div>
            <span>Update</span>
            <CurrencyUpdateForm />
        </div>
        <div className={style.divider} />
        <div>
            <span>Delete</span>
            <CurrencyDeleteForm />
        </div>
    </div>
  )
}

export default App
