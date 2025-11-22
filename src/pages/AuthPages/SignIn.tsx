import AuthLayout from "./AuthPageLayout"
import SignInForm from "../../components/main-page/auth/SignInForm"

export default function SignIn() {
  return (
    <>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  )
}
