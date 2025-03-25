
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// This will be replaced with real data from Supabase
const clients = [
  { id: "1", companyName: "Acme Corp" },
  { id: "2", companyName: "TechGiant Inc." },
  { id: "3", companyName: "Startup Labs" },
  { id: "4", companyName: "Innovate Solutions" },
  { id: "5", companyName: "Global Industries" },
];

export function ClientSelector() {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedClient
            ? clients.find((client) => client.id === selectedClient)?.companyName
            : "Select client..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search client..." />
          <CommandList>
            <CommandEmpty>No client found.</CommandEmpty>
            <CommandGroup>
              {clients.map((client) => (
                <CommandItem
                  key={client.id}
                  value={client.id}
                  onSelect={(currentValue) => {
                    setSelectedClient(currentValue === selectedClient ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedClient === client.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {client.companyName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
