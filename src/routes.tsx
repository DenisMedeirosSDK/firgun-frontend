import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { DefaultLayout } from "./layout/default-layout";
import { Contact } from "./pages/contact";

export function RoutesPages(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<DefaultLayout/>} >
      <Route path="/"  element={<App/>} />
      <Route path="/contato"  element={<Contact/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}