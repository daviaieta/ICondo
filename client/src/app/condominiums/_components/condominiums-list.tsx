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
import { Search, PlusCircle, ListFilter, File } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { CreateCondo } from "./condominiums-create";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export type Condo = {
  id: number;
  razao_social: string;
  logradouro: string;
  numero_endereco: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
  telefone: string;
  cnpj: string;
};

export const Condo = () => {
  const [condos, setCondos] = useState<Condo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function list() {
    try {
      const response = await axios.get("http://localhost:5000/condos");
      const data = await response.data;

      if (data) {
        setCondos(data);
        setLoading(false);
      } else {
        setCondos([]);
      }
    } catch (error) {
      console.error("Error fetch  ing users:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    list();
  }, []);

  const filteredCondo = condos.filter((condo) =>
    condo.razao_social.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <form className="w-full">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar condomínios..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          {/* Aqui vai abrir um modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="h-7 gap-1.5">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Condomínio
                </span>
              </Button>
            </DialogTrigger>
            <CreateCondo />
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="px-7">
          <CardTitle>Condomínios</CardTitle>
          <CardDescription>
            Condomínios adicionados recentemente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Carregando...</p>
          ) : filteredCondo.length > 0 ? (
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
                  <TableHead className="hidden md:table-cell">
                    Telefone
                  </TableHead>
                  <TableHead className="hidden md:table-cell">CNPJ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCondo.map((condo) => (
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
                        {condo.numero_endereco}
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
                    <TableCell className="hidden sm:table-cell">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Nenhum condomínio encontrado.</p>
          )}
        </CardContent>
      </Card>
    </>
  );
};
