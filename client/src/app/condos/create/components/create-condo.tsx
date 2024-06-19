"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

export const Create = () => {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numeroEndereco, setnumeroEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const { toast } = useToast();

  const createCondo = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/condos/create", {
        razao_social: razaoSocial,
        logradouro,
        numero_endereco: numeroEndereco,
        complemento,
        bairro,
        localidade,
        uf,
        cep,
        telefone,
        cnpj,
      });

      if (response.data.status === 200) {
        toast({
          title: "Condomínio adiconado com sucesso",
          description: `Razão social: ${razaoSocial}`,
        });
      }
    } catch (error) {
      console.log("deu pau");
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar novo condomínio</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar adicionar um novo condomínio no
            sistema
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={createCondo}>
          <div className="grid gap-4 py-6">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Razão Social
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={razaoSocial}
                onChange={(e) => {
                  setRazaoSocial(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Logradouro
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={logradouro}
                onChange={(e) => {
                  setLogradouro(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Número
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={numeroEndereco}
                onChange={(e) => {
                  setnumeroEndereco(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Complemento
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={complemento}
                onChange={(e) => {
                  setComplemento(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Bairro
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={bairro}
                onChange={(e) => {
                  setBairro(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Localidade
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={localidade}
                onChange={(e) => {
                  setLocalidade(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="uf" className="text-right">
                UF
              </Label>
              <Select onValueChange={setUf}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleciona a UF" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="AC">Acre</SelectItem>
                    <SelectItem value="AL">Alagoas</SelectItem>
                    <SelectItem value="AP">Amapá</SelectItem>
                    <SelectItem value="AM">Amazonas</SelectItem>
                    <SelectItem value="BA">Bahia</SelectItem>
                    <SelectItem value="CE">Ceará</SelectItem>
                    <SelectItem value="DF">Distrito Federal</SelectItem>
                    <SelectItem value="ES">Espírito Santo</SelectItem>
                    <SelectItem value="GO">Goiás</SelectItem>
                    <SelectItem value="MA">Maranhão</SelectItem>
                    <SelectItem value="MT">Mato Grosso</SelectItem>
                    <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="PA">Pará</SelectItem>
                    <SelectItem value="PB">Paraíba</SelectItem>
                    <SelectItem value="PR">Paraná</SelectItem>
                    <SelectItem value="PE">Pernambuco</SelectItem>
                    <SelectItem value="PI">Piauí</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    <SelectItem value="RO">Rondônia</SelectItem>
                    <SelectItem value="RR">Roraima</SelectItem>
                    <SelectItem value="SC">Santa Catarina</SelectItem>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="SE">Sergipe</SelectItem>
                    <SelectItem value="TO">Tocantins</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                CEP
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={cep}
                onChange={(e) => {
                  setCep(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Telefone
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={telefone}
                onChange={(e) => {
                  setTelefone(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                CNPJ
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={cnpj}
                onChange={(e) => {
                  setCnpj(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" type="submit" disabled={submitting}>
              {submitting ? <ReloadIcon className="animate-spin" /> : "Enviar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
};
