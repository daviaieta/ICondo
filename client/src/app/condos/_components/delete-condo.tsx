"use client";

import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CondoProps } from "../types";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { Frown } from "lucide-react";

export type DeleteCondoProps = {
  id: number;
  razaoSocial: string;
  setCondos: Dispatch<SetStateAction<CondoProps[]>>;
};

export const Delete = ({ id, razaoSocial, setCondos }: DeleteCondoProps) => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const deleteCondo = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "condos/delete",
        body: {
          id,
        },
      });
      if (response.status === 200) {
        toast({
          title: "Condomínio removido com sucesso",
          description: `Razão social: ${razaoSocial}`,
        });
        setCondos((prevCondos) =>
          prevCondos.filter((prevCondo) => prevCondo.id !== id)
        );
      }
    } catch (error) {
      toast({
        title: `Erro`,
        description: `Ocorreu um erro ao deletar ${razaoSocial} condomínios, por favor contatar o suporte`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[450px] h-[130px]">
        <DialogHeader>
          <DialogTitle>
            Tem certeza que deseja remover {razaoSocial}?
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={deleteCondo}>
          <DialogFooter>
            <Button className="w-full" type="submit" variant="destructive">
              {submitting ? <ReloadIcon className="animate-spin" /> : "Sim"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
};
