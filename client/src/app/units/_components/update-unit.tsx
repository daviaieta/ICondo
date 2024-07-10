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
import { UnitProps } from "../types";
import { CondoProps } from "@/app/condos/types";
import { fetchAdapter } from "@/adapters/fetchAdapter";

export type Unit = {
  unit: UnitProps;
  setUnits: Dispatch<SetStateAction<UnitProps[]>>;
};

export const Update: React.FC<Unit> = ({ unit, setUnits }) => {
  const [id, setId] = useState(unit.id);
  const [bloco, setBloco] = useState(unit.bloco);
  const [unidade, setUnidade] = useState(unit.unidade);
  const [tipo, setTipo] = useState(unit.tipo);
  const [condo, setCondo] = useState<string>(unit.condominioId.toString());
  const [condos, setCondos] = useState<CondoProps[]>([]);
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

  const updateUnit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "units/update",
        body: {
          id,
          bloco,
          unidade,
          tipo,
          condominioId: Number(condo),
        },
      });
      if (response.status == 200) {
        toast({
          title: "Unidade editada com sucesso",
          description: `Unidade: ${unidade}`,
        });
        setUnits((prevUnits) =>
          prevUnits.map((prevUnit) => {
            if (unit.id == prevUnit.id) return response.data;
            return prevUnit;
          })
        );
      }
    } catch (error) {
      toast({
        title: `Erro`,
        description: `Ocorreu um erro ao editar a unidade ${unidade}, por favor contatar o suporte`,
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
          <SheetTitle>Editar {unit.unidade}</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para editar {unit.unidade}
          </SheetDescription>
        </SheetHeader>
        <form className="space-y-4" onSubmit={updateUnit}>
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
              <Label htmlFor="uf" className="text-right">
                Tipo
              </Label>
              <Select onValueChange={setTipo} value={tipo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleciona a UF" />
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
              <Label htmlFor="uf" className="text-right">
                Condomínio
              </Label>
              <Select onValueChange={setCondo} value={condo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleciona a UF" />
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
          <DialogFooter>
            <Button
              className="w-full"
              type="submit"
              variant="outline"
              disabled={submitting}
            >
              {submitting ? <ReloadIcon className="animate-spin" /> : "Editar"}
            </Button>
          </DialogFooter>
        </form>
      </SheetContent>
    </>
  );
};
