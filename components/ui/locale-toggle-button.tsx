"use client"

import * as React from "react"
import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { setUserLocale } from "@/lib/locale"

export function LocaleToggle() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setUserLocale("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUserLocale("fr")}>
          French
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
