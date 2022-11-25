import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/pages/signIn.module.scss";

export function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    await login(email, password);
  }
  return (
    <div className={styles.container}>
      <form action="">
        <label htmlFor="">
          E-mail
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="">
          password
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleLogin}>Entrar</button>
      </form>
    </div>
  );
}
