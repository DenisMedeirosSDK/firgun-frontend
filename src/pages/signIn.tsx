import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/pages/signIn.module.scss";

export function SignIn() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    await signIn(email, password);
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
            placeholder="Digite seu email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleLogin}>Cadastrar</button>
      </form>
    </div>
  );
}
