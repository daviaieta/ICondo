"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { fetchAdapter } from "@/adapters/fetchAdapter";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UnitProps } from "../types";

export type Condo = {
  id: number;
  razao_social: string;
};

export type Units = {
  setUnits: Dispatch<SetStateAction<UnitProps[]>>;
};

export const Create = ({ setUnits }: Units) => {
  const [bloco, setBloco] = useState("");
  const [unidade, setUnidade] = useState("");
  const [tipo, setTipo] = useState("");
  const [condo, setCondo] = useState("");
  const [condos, setCondos] = useState<Condo[]>([]);

  const [submitting, setSubmitting] = useState(false);

  const { toast } = useToast();

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

  const createUnit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "units/create",
        body: {
          bloco,
          unidade,
          tipo,
          condominioId: Number(condo),
        },
      });
      if (response.status == 200) {
        toast({
          title: "Unidade adiconada com sucesso",
        });
        setUnits((prevUnits) => [...prevUnits, response.data]);
      }
    } catch (error) {
      toast({
        title: `Erro`,
        description: `Ocorreu um erro ao cadastrar a unidade, por favor contatar o suporte`,
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
          <SheetTitle>Adicionar nova unidade</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para criar adicionar uma nova unidade no
            sistema
          </SheetDescription>
        </SheetHeader>
        <form className="space-y-4" onSubmit={createUnit}>
          <div className="grid gap-4 py-6">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Bloco
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={bloco}
                onChange={(e) => {
                  setBloco(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Unidade
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={unidade}
                onChange={(e) => {
                  setUnidade(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Tipo
              </Label>
              <Select onValueChange={setTipo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="cobertura">Cobertura</SelectItem>
                    <SelectItem value="quarto">Quarto</SelectItem>
                    <SelectItem value="sala">Sala</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
              {submitting ? "Loading..." : "Cadastrar"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </>
  );
};
