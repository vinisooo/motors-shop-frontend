import Footer from "@/components/footer/footer"
import RegisterForm from "@/components/forms/RegisterForm"
import Header from "@/components/header/header"
import "../../styles/pages/formsPages/forms.sass"

const RegisterPage = () => {
  return (
    <main className="forms">
      <Header/>
      <RegisterForm/>
      <Footer/>
    </main>
  )
}

export default RegisterPage