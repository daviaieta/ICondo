"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CondoProps } from "../types";
import { fetchAdapter } from "@/adapters/fetchAdapter";

export type Condo = {
  setCondos: Dispatch<SetStateAction<CondoProps[]>>;
};

export const Create = ({ setCondos }: Condo) => {
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
      const response = await fetchAdapter({
        method: "POST",
        path: "condos/create",
        body: {
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
        },
      });
      console.log(response.data);
      if (response.status == 200) {
        toast({
          title: "Condomínio adiconado com sucesso",
          description: `Razão social: ${razaoSocial}`,
        });
        setCondos((prevCondos) => [...prevCondos, response.data]);
      }
    } catch (error) {
      toast({
        title: `Erro`,
        description: `Ocorreu um erro ao criar ${razaoSocial}, por favor contatar o suporte`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Adicionar novo condomínio</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para adicionar um novo condomínio no
            sistema
          </SheetDescription>
        </SheetHeader>
        <form className="space-y-4" onSubmit={createCondo}>
          <div className="grid gap-4 py-6">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="razao_social" className="text-right">
                Razão Social
              </Label>
              <Input
                id="razao_social"
                className="col-span-3"
                value={razaoSocial}
                onChange={(e) => {
                  setRazaoSocial(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="logradouro" className="text-right">
                Logradouro
              </Label>
              <Input
                id="logradouro"
                className="col-span-3"
                value={logradouro}
                onChange={(e) => {
                  setLogradouro(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="numero" className="text-right">
                Número
              </Label>
              <Input
                id="numero"
                className="col-span-3"
                value={numeroEndereco}
                onChange={(e) => {
                  setnumeroEndereco(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="complemento" className="text-right">
                Complemento
              </Label>
              <Input
                id="complemento"
                className="col-span-3"
                value={complemento}
                onChange={(e) => {
                  setComplemento(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="bairro" className="text-right">
                Bairro
              </Label>
              <Input
                id="bairro"
                className="col-span-3"
                value={bairro}
                onChange={(e) => {
                  setBairro(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="localidade" className="text-right">
                Localidade
              </Label>
              <Input
                id="localidade"
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
              <Label htmlFor="cep" className="text-right">
                CEP
              </Label>
              <Input
                id="cep"
                className="col-span-3"
                value={cep}
                onChange={(e) => {
                  setCep(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="telefone" className="text-right">
                Telefone
              </Label>
              <Input
                id="telefone"
                className="col-span-3"
                value={telefone}
                onChange={(e) => {
                  setTelefone(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="cnpj" className="text-right">
                CNPJ
              </Label>
              <Input
                id="cnpj"
                className="col-span-3"
                value={cnpj}
                onChange={(e) => {
                  setCnpj(e.target.value);
                }}
                required
              />
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
