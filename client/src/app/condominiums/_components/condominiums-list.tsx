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

export type Condo = {
  id: number;
  razao_social: string;
  logradouro: string;
  numend: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
  telefone: string;
  cnpj: string;
};

export const Condominium = () => {
  const [condos, setCondos] = useState<Condo[]>([]);
  const [loading, setLoading] = useState(true);

  async function list() {
    try {
      const response = await axios.get("http://localhost:5000/condos");
      const data = await response.data;

      if (data) {
        setCondos(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetch  ing users:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    list();
  }, []);

  return (
    <>
      <form>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Condomínios</CardTitle>
          <CardDescription>
            Condomínios adicionados recentemente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">
                  Razão Social
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Logradouro
                </TableHead>
                <TableHead className="hidden md:table-cell">Bairro</TableHead>
                <TableHead className="hidden md:table-cell">
                  Número de Endereço
                </TableHead>
                <TableHead className="hidden md:table-cell">CEP</TableHead>
                <TableHead className="hidden md:table-cell">Telefone</TableHead>
                <TableHead className="hidden md:table-cell">CNPJ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {condos.map((condo) => (
                <TableRow key={condo.id}>
                  <TableCell>
                    <div className="font-medium">{condo.razao_social}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {condo.localidade}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {condo.logradouro}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {condo.bairro}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {condo.numend}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {condo.cep}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {condo.telefone}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {condo.cnpj}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
