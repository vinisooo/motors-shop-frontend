import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"
import ResetPasswordForm from "@/components/forms/ResetPasswordForm"

interface IResetPasswordProps{
    params: {
        token: string
    }
}

const ResetPassword = ({params}: IResetPasswordProps) => {
    const {token} = params
    return (
        <main className="forms page-show-up">
            <ResetPasswordForm token={token}/>
            <Footer/>
        </main>
    )
}

export default ResetPassword
