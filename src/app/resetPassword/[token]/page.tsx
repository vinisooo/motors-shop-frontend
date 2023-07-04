import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"
import ResetPasswordForm from "@/components/forms/ResetPasswordForm"

interface iResetPasswordProps{
    params: {
        token: string
    }
}

const ResetPassword = ({params}: iResetPasswordProps) => {
    const {token} = params
    return (
        <main className="forms">
            <ResetPasswordForm token={token}/>
            <Footer/>
        </main>
    )
}

export default ResetPassword
