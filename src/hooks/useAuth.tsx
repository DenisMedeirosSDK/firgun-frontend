import { useContext } from "react";
import { AuthContext } from "../context/auth";

export function useAuth() {
  const useAuth = useContext(AuthContext);

  return useAuth;
}
