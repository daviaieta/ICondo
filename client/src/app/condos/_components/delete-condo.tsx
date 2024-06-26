"use client";

import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CondoProps } from "../types";

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
      const response = await axios.post("http://localhost:5000/condos/delete", {
        id,
      });
      if (response.status === 200) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast({
          title: "Condomínio removido com sucesso",
          description: `Razão social: ${razaoSocial}`,
        });
        setCondos((prevCondos) =>
          prevCondos.filter((prevCondo) => prevCondo.id !== id)
        );
      }
    } catch (error) {
      console.log("deu pau");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remover Condomínio</DialogTitle>
          <DialogDescription>Remover {razaoSocial}</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={deleteCondo}>
          <DialogFooter>
            <Button
              className="w-full"
              type="submit"
              variant="destructive"
              disabled={submitting}
            >
              {submitting ? <ReloadIcon className="animate-spin" /> : "Remover"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
};
