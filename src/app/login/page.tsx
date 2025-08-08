import LoginForm from "@/app/login/LoginForm";
import "@/style/pages/login/login.scss";

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <LoginForm />
      </div>
    </main>
  );
}
