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

export type Condo = {
  id: number;
  razao_social: string;
};

export const Create = () => {
  const [bloco, setBloco] = useState("");
  const [unidade, setUnidade] = useState("");
  const [tipo, setTipo] = useState("");
  const [condominio, setCondominio] = useState("");
  const [condominios, setCondominios] = useState<Condo[]>([]);

  const [submitting, setSubmitting] = useState(false);

  const { toast } = useToast();

  async function fetch() {
    try {
      const response = await axios.get("http://localhost:5000/condos");
      const data = await response.data;

      if (data) {
        setCondominios(data);
      } else {
        setCondominios([]);
      }
    } catch (error) {
      console.error("Error fetch users:", error);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  const createUnit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/units/create", {
        bloco,
        unidade,
        tipo,
        condominio: Number(condominio),
      });

      if (response.status == 200) {
        toast({
          title: "Unidade adiconada com sucesso",
        });
      }
    } catch (error) {
      console.log("deu pau");
    }
  };
  console.log(Number(condominio));

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar nova unidade</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar adicionar uma nova unidade no
            sistema
          </DialogDescription>
        </DialogHeader>
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
              <Input
                id="name"
                className="col-span-3"
                value={tipo}
                onChange={(e) => {
                  setTipo(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Condominio
              </Label>
              <Select onValueChange={setCondominio}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione um condo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {condominios.map((condominio) => (
                      <SelectItem
                        key={condominio.id}
                        value={condominio.id.toString()}
                      >
                        {condominio.razao_social}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" type="submit" disabled={submitting}>
              {submitting ? "Loading..." : "Enviar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
};
