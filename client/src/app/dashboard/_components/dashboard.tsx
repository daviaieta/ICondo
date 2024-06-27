import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  Package,
  BedDouble,
  Building,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Encomendas Recebidas
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125</div>
              <p className="text-xs text-muted-foreground">
                + 20.1% desde o último mês
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unidades Registradas
              </CardTitle>
              <BedDouble className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+ 3</div>
              <p className="text-xs text-muted-foreground">
                + 5% desde o último mês
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Condomínios Registrados
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+ 12</div>
              <p className="text-xs text-muted-foreground">
                + 13% desde o último mês
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Encomendas</CardTitle>
                <CardDescription>Transações recentes.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Morador</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Data Chegada</TableHead>
                    <TableHead className="text-right">Data Entrega</TableHead>
                    <TableHead className="text-right">Unidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Davi Carvalho</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        B1 709
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="text-xs" variant="outline">
                        Não entregue
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">06/09</TableCell>
                    <TableCell className="text-right">06/12</TableCell>
                    <TableCell className="text-right">Bloco 1 709</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        B2 201
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="text-xs" variant="outline">
                        Entregue
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">06/13</TableCell>
                    <TableCell className="text-right">06/15</TableCell>
                    <TableCell className="text-right">Bloco 2 201</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Rodrigo Carvalho</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        B1 709
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="text-xs" variant="outline">
                        Entregue
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">06/12</TableCell>
                    <TableCell className="text-right">06/15</TableCell>
                    <TableCell className="text-right">Bloco 1 709</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Mariana Aieta</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        B1 709
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="text-xs" variant="outline">
                        Entregue
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">06/12</TableCell>
                    <TableCell className="text-right">06/15</TableCell>
                    <TableCell className="text-right">Bloco 1 709</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Unidades registradas recentemente</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">B4 116</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Jackson Lee
                  </p>
                  <p className="text-sm text-muted-foreground">
                    jackson.lee@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">B2 501</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                  <p className="text-sm text-muted-foreground">
                    isabella.nguyen@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">B1 106</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    William Kim
                  </p>
                  <p className="text-sm text-muted-foreground">
                    will@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">B3 403</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">
                    sofia.davis@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">B1 601</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
