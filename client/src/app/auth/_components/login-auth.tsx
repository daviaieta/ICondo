"use client";

import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { fetchAdapter } from "@/adapters/fetchAdapter";

export function Login() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "login",
        body: {
          cpf,
          password,
        },
      });
      if (response.status === 200) {
        const data = await response.data();
        const token = data.token;

        Cookies.set("auth_token", token, { expires: 30 });

        router.push("/condos");
        toast({
          title: "Login successfully",
          description: `Enjoy iCondo!`,
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="mx-auto max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Entrar</h1>
            <p className="text-muted-foreground">
              Entre com seu CPF e senha para acessar sua conta
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>CPF</Label>
              </div>
              <Input
                id="cpf"
                type="text"
                placeholder="Digite seu CPF"
                maxLength={14}
                value={cpf}
                onChange={(e) => {
                  setCpf(e.target.value);
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email ">Senha</Label>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground underline"
                  prefetch={false}
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={submitting}>
              {submitting ? "Loading..." : "Entrar"}
            </Button>
            <Button variant="outline" className="w-full">
              Entrar com Google
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
