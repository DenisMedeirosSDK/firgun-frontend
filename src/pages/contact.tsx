import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
// import { Input } from "../components/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";

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
  answerQuestion01: string;
  answerQuestion02: string;
}

const schema = z.object({
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
  answerQuestion01: z.string(),
  answerQuestion02: z.string(),
});

export function Contact() {
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
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: values.id,
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
        surveys: [
          {
            question: "Como conheceu a Firgun?",
            answer: values.answerQuestion01,
          },
          {
            question: "Qual o motivo do Contato?",
            answer: values.answerQuestion02,
          },
        ],
      }),
    };
    await fetch("http://localhost:3333/customer/contact", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));

    console.log(values);

    reset();
    alert("Enviado");
  };
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

          <label htmlFor="">
            Como soube da Firgun?
            <input
              type="text"
              placeholder="Google"
              {...register("answerQuestion01")}
            />
          </label>

          <label htmlFor="">
            Qual o motivo do Contato?
            <textarea
              id=""
              {...register("answerQuestion02")}
              placeholder="Como funciona o microcredito?"
            ></textarea>
          </label>
        </form>
        <button form="hook-form" type="submit">
          Enviar
        </button>
      </div>
    </div>
  );
}
