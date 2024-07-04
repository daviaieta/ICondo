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
import { UnitProps } from "../types";
import { fetchAdapter } from "@/adapters/fetchAdapter";

export type DeleteUnitProps = {
  id: number;
  unidade: string;
  setUnits: Dispatch<SetStateAction<UnitProps[]>>;
};

export const Delete = ({ id, unidade, setUnits }: DeleteUnitProps) => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const deleteUnit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "units/delete",
        body: {
          id,
        },
      });
      if (response.status === 200) {
        toast({
          title: "Unidade removida com sucesso",
          description: `Unidade: ${unidade}`,
        });
        setUnits((prevUnits) =>
          prevUnits.filter((prevUnit) => prevUnit.id !== id)
        );
      }
    } catch (error) {
      toast({
        title: `Erro`,
        description: `Ocorreu um erro ao deletar a unidade ${unidade}, por favor contatar o suporte`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[470px] h-[130px]">
        <DialogHeader>
          <DialogTitle>
            Tem certeza que deseja remover a unidade {unidade}?
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={deleteUnit}>
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
