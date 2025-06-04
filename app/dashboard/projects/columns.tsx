'use client';

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import DeleteProjectDialog from "@/components/ui/dashboard/projects/delete-project-dialog";
import { Project } from "@/lib/_objects/project";
import { ColumnDef } from "@tanstack/react-table";
import { CheckSquare2Icon, PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

export const projectsIndexColumns: ColumnDef<Project>[] = [
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
        accessorKey: "year",
        header: "Year",
    },
    {
        header: "Mobile",
        cell: ({row}) => {
            const project = row.original;
            return (
                <div>
                    {project.ismobile && <CheckSquare2Icon></CheckSquare2Icon>}
                </div>
            );
        }
    },
    {
        header: "Web",
        cell: ({row}) => {
            const project = row.original;
            return (
                <div>
                    {project.isweb && <CheckSquare2Icon></CheckSquare2Icon>}
                </div>
            );
        }
    },
    {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const project = row.original;
            return (
                <div className="text-right">
                    <Link className="mr-4" href={`/dashboard/projects/${project.id}/edit`}>
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
                        <DeleteProjectDialog id={project.id} name={project.name}/>
                    </AlertDialog>
                </div>
            );
        }
    }
]