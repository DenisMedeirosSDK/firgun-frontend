import { useEffect, useState } from "react";
import styles from "../styles/pages/list-customer.module.scss";
export interface CustomerProps {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  phone1: string;
  birthDate: string;

  address: {
    zipcode: string;
    state: string;
    city: string;
    street: string;
    streetNumber: string;
    neighborhood: string;
  };

  document: {
    docType: "cpf" | "cnpj";
    docNumber: string;
  };
}

export function LisCustomers() {
  const [customers, setCustomer] = useState<CustomerProps[]>([]);

  useEffect(() => {
    async function loadCustomers() {
      const localToken = localStorage.getItem("@firgun:token");

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localToken}`,
        },
      };

      const response = await fetch(
        "http://localhost:3333/customer/contacts",
        requestOptions
      );

      const jsonResponse = await response.json();

      setCustomer(jsonResponse.customers);
    }

    loadCustomers();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Lista de Clientes</h1>

      {customers.map((customer) => {
        return (
          <ul key={customer.id}>
            <h2>{customer.id}</h2>
            <li>{customer.name}</li>
            <li>{customer.email}</li>
            <li>
              {new Intl.DateTimeFormat("pt-BR").format(
                new Date(customer.birthDate)
              )}
            </li>
            <li>{customer.document.docType}</li>
            <li>{customer.document.docNumber}</li>
            <li>{customer.phone}</li>
            <li>{customer.phone1}</li>

            <li>{customer.address.street}</li>
            <li>{customer.address.streetNumber}</li>
            <li>{customer.address.city}</li>
            <li>{customer.address.state}</li>
            <li>{customer.address.neighborhood}</li>
            <li>{customer.address.zipcode}</li>
          </ul>
        );
      })}
    </div>
  );
}
