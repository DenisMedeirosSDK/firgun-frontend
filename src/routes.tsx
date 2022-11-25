import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/auth";
import { DefaultLayout } from "./layout/default-layout";
import { Contact } from "./pages/contact";
import { LisCustomers } from "./pages/list-customers";
import { Login } from "./pages/login";
import { SignIn } from "./pages/signIn";

export function RoutesPages() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/cadastro" element={<SignIn />} />
            <Route path="/entrar" element={<Login />} />
            <Route path="/dashboard/customer" element={<LisCustomers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
