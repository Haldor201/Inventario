import FormLogin from "../Components/FormLogin"
import UserProvider from "../context/UserContext"

export default function Login() {
    return (
        <UserProvider>
            <FormLogin></FormLogin>
        </UserProvider>
    )
}