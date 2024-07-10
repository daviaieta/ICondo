/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9HOOw6Pj3Ay
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Login() {
  return (
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
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
          <Button variant="outline" className="w-full">
            Entrar com Google
          </Button>
        </div>
      </div>
    </div>
  );
}
