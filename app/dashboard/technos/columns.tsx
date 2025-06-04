'use client';

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import DeleteTechnoDialog from "@/components/ui/dashboard/techno/delete-techno-dialog";
import { Techno } from "@/lib/_objects/techno";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

export const technoIndexColumns: ColumnDef<Techno>[] = [
    {
        id: "index",
        cell: ({ row }) => {
            return <p>{row.index + 1}</p>
        },
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const techno = row.original;
            return (
                <div className="text-right">
                    <Link className="mr-4" href={`/dashboard/technos/${techno.id}/edit`}>
                        <Button >
                            <PencilIcon/>
                        </Button>
                    </Link>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="bg-destructive">
                                <Trash2Icon/>
                            </Button>
                        </AlertDialogTrigger>
                        <DeleteTechnoDialog id={techno.id} name={techno.name}/>
                    </AlertDialog>
                </div>
            );
        }
    }
]