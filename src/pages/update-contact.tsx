import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
// import { Input } from "../components/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import styles from "../styles/pages/contacts.module.scss";

export interface CustomerPropsRequest {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  phone1: string;
  birthDate: string;
  zipcode: string;
  state: string;
  city: string;
  street: string;
  streetNumber: string;
  neighborhood: string;
  docType: "cpf" | "cnpj";
  docNumber: string;
}

const schema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  birthDate: z.string(),
  phone: z.string(),
  phone1: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  state: z.string(),
  street: z.string(),
  streetNumber: z.string(),
  zipcode: z.string(),
  docNumber: z.string(),
  docType: z.enum(["cpf", "cnpj"]).default("cpf"),
});

export function UpdateContact() {
  const [token, setToken] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CustomerPropsRequest>({
    resolver: zodResolver(schema),
  });

  const handleSubmitForm: SubmitHandler<CustomerPropsRequest> = async (
    values
  ) => {
    // const localToken = localStorage.getItem("@firgun:token");

    // if (localToken !== null) {
    //   setToken(localToken);
    // }

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        phone1: values.phone1,
        birthDate: values.birthDate,
        city: values.city,
        neighborhood: values.neighborhood,
        state: values.state,
        street: values.street,
        streetNumber: values.streetNumber,
        zipcode: values.zipcode,
        docNumber: values.docNumber,
        docType: values.docType,
      }),
    };

    console.log(values.id);

    await fetch(
      `http://localhost:3333/customer/${values.id}/contact`,
      requestOptions
    );
    // .then((response) => response.json())
    // .then((data) => console.log(data));

    console.log(values);

    reset();
    alert("Enviado");
  };

  useEffect(() => {
    async function loadCustomers() {
      const localToken = localStorage.getItem("@firgun:token");

      if (localToken !== null) {
        setToken(localToken);
      }

      alert("Necessita de token de acesso válido");
    }

    loadCustomers();
  }, []);
  return (
    <div className={styles.container}>
      <h1>Contato</h1>

      <div>
        <form
          id="hook-form"
          onSubmit={handleSubmit(handleSubmitForm)}
          className={styles.form}
        >
          <label htmlFor="">
            id do cliente
            <input placeholder="Digite o id do client" {...register("id")} />
          </label>
          <label htmlFor="">
            Nome
            <input placeholder="Digite seu nome" {...register("name")} />
          </label>
          <label htmlFor="">
            Sobrenome
            <input
              placeholder="Digite seu sobrenome"
              {...register("lastName")}
            />
          </label>

          <label htmlFor="">
            E-mail
            <input
              type="email"
              placeholder="Digite seu E-mail"
              {...register("email")}
            />
          </label>
          <label htmlFor="">
            Data de nascimento
            <input type="date" {...register("birthDate")} />
          </label>

          <label htmlFor="">
            Celular
            <input
              type="tel"
              placeholder="(11) 95555-555"
              {...register("phone")}
            />
          </label>
          <label htmlFor="">
            Celular 2
            <input
              type="tel"
              placeholder="(11) 93333-333"
              {...register("phone1")}
            />
          </label>
          <label htmlFor="">
            Endereço
            <input placeholder="Ex: Av. Paulista" {...register("street")} />
          </label>
          <label htmlFor="">
            Número
            <input placeholder="Ex: 01" {...register("streetNumber")} />
          </label>
          <label htmlFor="">
            Cidade
            <input placeholder="Ex: São Paulo" {...register("city")} />
          </label>
          <label htmlFor="">
            Estado
            <input placeholder="Ex: SP" maxLength={2} {...register("state")} />
          </label>
          <label htmlFor="">
            Bairro
            <input placeholder="Bairro" {...register("neighborhood")} />
          </label>
          <label htmlFor="">
            CEP
            <input placeholder="CEP" {...register("zipcode")} />
          </label>

          <label htmlFor="">
            Escolha um tipo do documento
            <select {...register("docType")}>
              <option value="cpf">CPF</option>
              <option value="cnpj">CNPJ</option>
            </select>
          </label>
          <label htmlFor="">
            Número do documento
            <input
              placeholder="Digite o número do documento"
              {...register("docNumber")}
            />
          </label>
        </form>
        <button form="hook-form" type="submit">
          Enviar
        </button>
      </div>
    </div>
  );
}
