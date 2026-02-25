import Login from "../components/login/Login";

export const metadata = {
  title: "Login - Tributos Lagoa dos Patos",
  description: "Faça login para acessar o sistema de tributos",
};

export default function LoginPage() {
  return (
    <div>
      <div className={`lagoa0 h-screen font-sans bg-cover`}>
        <Login />
      </div>
    </div>
  );
}
