"use client";

import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CondoProps } from "../types";

export type Condo = {
  condo: CondoProps;
  setCondos: Dispatch<SetStateAction<CondoProps[]>>;
};

export const Update: React.FC<Condo> = ({ condo, setCondos }) => {
  const [id, setId] = useState(condo.id);
  const [razaoSocial, setRazaoSocial] = useState(condo.razao_social);
  const [logradouro, setLogradouro] = useState(condo.logradouro);
  const [numeroEndereco, setnumeroEndereco] = useState(condo.numero_endereco);
  const [complemento, setComplemento] = useState(condo.complemento);
  const [bairro, setBairro] = useState(condo.bairro);
  const [localidade, setLocalidade] = useState(condo.localidade);
  const [uf, setUf] = useState(condo.uf.toUpperCase());
  const [cep, setCep] = useState(condo.cep);
  const [telefone, setTelefone] = useState(condo.telefone);
  const [cnpj, setCnpj] = useState(condo.cnpj);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const updateCondo = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/condos/update", {
        id,
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
      if (response.status == 200) {
        toast({
          title: "Condomínio editado com sucesso",
          description: `Razão social: ${razaoSocial}`,
        });
        setCondos((prevCondos) =>
          prevCondos.map((prevCondo) => {
            if (condo.id == prevCondo.id) return response.data;
            return prevCondo;
          })
        );
      }
    } catch (error) {
      console.log("deu pau");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Editar {condo.razao_social}</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para editar o {condo.razao_social} sistema
          </SheetDescription>
        </SheetHeader>
        <form className="space-y-4" onSubmit={updateCondo}>
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
              <Select onValueChange={setUf} value={uf}>
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
              {submitting ? <ReloadIcon className="animate-spin" /> : "Editar"}
            </Button>
          </DialogFooter>
        </form>
      </SheetContent>
    </>
  );
};
