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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export type Unit = {
  id: number;
  bloco: string;
  unidade: string;
  tipo: string;
  condominioId: number;
};

export const List = () => {
  const [units, setUnit] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function fetch() {
    try {
      const response = await axios.get("http://localhost:5000/units");
      const data = await response.data;

      if (data) {
        setUnit(data);
        console.log(data);
        setLoading(false);
      } else {
        setUnit([]);
      }
    } catch (error) {
      console.error("Error fetch  ing users:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  const filteredUnit = units.filter((unit) =>
    unit.condominioId.toString().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <form className="w-full">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar unidades por condomínio..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-7 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="h-7 gap-1.5">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Unidade
                </span>
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="px-7">
          <CardTitle>Unidades</CardTitle>
          <CardDescription>Unidades adicionadas recentemente.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Carregando...</p>
          ) : filteredUnit.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden sm:table-cell">Bloco</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Unidade
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Tipo</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Condomínio
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnit.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell>
                      <div className="font-medium">{}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {unit.bloco}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {unit.unidade}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {unit.tipo}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
                        {unit.condominioId}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only"></span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
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
            <p>Nenhuma unidade encontrada.</p>
          )}
        </CardContent>
      </Card>
    </>
  );
};
