"use client";

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
import { Search, PlusCircle, File } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Create as CreateUnit } from "./create-unit";
import { UnitProps } from "../types";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Delete } from "./delete-unit";

export const List = () => {
  const [units, setUnits] = useState<UnitProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  async function fetchUnits() {
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: "units",
      });
      if (response.status == 200) {
        setUnits(response.data);
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: `Erro`,
        description: `Ocorreu um erro ao carregar as unidades, por favor contatar o suporte`,
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUnits();
  }, []);

  const filteredUnit = units.filter((unit) =>
    unit.unidade.toString().includes(search.toLowerCase())
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
              Exportar CSV
            </span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" variant="outline" className="h-7 gap-1.5">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Unidade
                </span>
              </Button>
            </SheetTrigger>
            <CreateUnit setUnits={setUnits} />
          </Sheet>
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
                    <TableCell className="hidden sm:table-cell">
                      {unit.bloco}
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
                          <Separator />
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="ghost">Editar</Button>
                            </SheetTrigger>
                          </Sheet>
                          <br />
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost">Excluir</Button>
                            </DialogTrigger>
                            <Delete
                              id={Number(unit.id)}
                              unidade={unit.unidade}
                              setUnits={setUnits}
                            ></Delete>
                          </Dialog>
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
