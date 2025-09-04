"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: string, pass: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedAuth = sessionStorage.getItem("is-authenticated");
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Could not access session storage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (user: string, pass: string) => {
    const HARDCODED_USER = "bot";
    const HARDCODED_PASS = "web";

    if (user === HARDCODED_USER && pass === HARDCODED_PASS) {
      sessionStorage.setItem("is-authenticated", "true");
      setIsAuthenticated(true);
      toast.success("¡Inicio de sesión exitoso!");
      router.push("/");
    } else {
      toast.error("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("is-authenticated");
    setIsAuthenticated(false);
    toast.info("Has cerrado la sesión.");
    router.push("/login");
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
