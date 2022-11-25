import { createContext, ReactNode, useState } from "react";
type User = {
  id: string;
  email: string;
};

type AuthContextData = {
  user: User | null;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = { children: ReactNode };

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    try {
      await fetch("http://localhost:3333/account", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));

      alert("Cadastro bem sucedido");
    } catch (error) {
      alert(`Erro ao cadastrar ${error}`);
    }
  }

  async function signOut() {
    setUser(null);
    localStorage.removeItem("@firgun:token");
  }

  async function login(email: string, password: string) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    try {
      await fetch("http://localhost:3333/auth", requestOptions)
        .then((response) => response.json())
        .then((data) => localStorage.setItem("@firgun:token", data.token));

      setUser(user);
    } catch (error) {
      alert(`Erro ao fazer entar ${error}`);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
