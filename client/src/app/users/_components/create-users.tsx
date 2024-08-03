"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserProps } from "../types";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { toast } from "@/components/ui/use-toast";

export type User = {
  setUsers: Dispatch<SetStateAction<UserProps[]>>;
};

export type Condo = {
  id: number;
  razao_social: string;
};

export const Create = ({ setUsers }: User) => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [condo, setCondo] = useState("");
  const [condos, setCondos] = useState<Condo[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchCondos = async () => {
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: "condos",
      });
      if (response.status == 200) {
        setCondos(response.data);
      }
    } catch (error) {
      toast({
        title: `Erro`,
        description: `Ocorreu um erro ao carregar os condomínios, por favor contatar o suporte`,
      });
    }
  };

  const createUser = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "users/create",
        body: {
          name,
          cpf,
          dataNascimento,
          cargo,
          email,
          password,
          condominioId: Number(condo),
        },
      });
      if (response.status == 200) {
        console.log(response.data);
        toast({
          title: `${name} adiconado(a) com sucesso`,
        });
        setUsers((prevUsers) => [...prevUsers, response.data]);
      }
    } catch (error) {
      toast({
        title: `Erro`,
        description: `Ocorreu um erro ao registrar o(a) ${name}, por favor contatar o suporte`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchCondos();
  }, []);

  return (
    <>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Adicionar novo usuário</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para adicionar um novo usuário no sistema
          </SheetDescription>
        </SheetHeader>
        <form className="space-y-4" onSubmit={createUser}>
          <div className="grid gap-4 py-6">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input
                id="nome"
                className="col-span-3"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="cpf" className="text-right">
                CPF
              </Label>
              <Input
                id="cpf"
                className="col-span-3"
                value={cpf}
                onChange={(e) => {
                  setCpf(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="data_nascimento" className="text-right">
                Nascimento
              </Label>
              <Input
                id="data_nascimento"
                className="col-span-3"
                value={dataNascimento}
                placeholder="mm/dd/yyyy"
                onChange={(e) => {
                  setDataNascimento(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="cargo" className="text-right">
                Cargo
              </Label>
              <Select onValueChange={setCargo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                    <SelectItem value="OPERADOR">Operador</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="email" className="text-right">
                E-mail
              </Label>
              <Input
                id="logradouro"
                className="col-span-3"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="senha" className="text-right">
                Senha
              </Label>
              <Input
                id="password"
                className="col-span-3"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Condomínio
              </Label>
              <Select onValueChange={setCondo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione um condo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {condos.map((condo) => (
                      <SelectItem key={condo.id} value={condo.id.toString()}>
                        {condo.razao_social}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <SheetFooter>
            <Button
              className="w-full"
              type="submit"
              variant="outline"
              disabled={submitting}
            >
              {submitting ? (
                <ReloadIcon className="animate-spin" />
              ) : (
                "Cadastrar"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </>
  );
};
