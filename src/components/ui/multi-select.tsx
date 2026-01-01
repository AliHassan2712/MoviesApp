"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export type MultiOption = {
  value: string;
  label: string;
  meta?: string;
};

type Props = {
  label: string;
  placeholder?: string;
  options: MultiOption[];
  value: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  maxNamesOnButton?: number;
};

export default function MultiSelect({
  label,
  placeholder = "Search...",
  options,
  value,
  onChange,
  disabled,
  maxNamesOnButton = 2,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const selected = React.useMemo(() => new Set(value ?? []), [value]);

  const selectedOptions = React.useMemo(
    () => options.filter((o) => selected.has(o.value)),
    [options, selected]
  );

  const toggle = (id: string) => {
    const next = new Set(value ?? []);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(Array.from(next));
  };

  const remove = (id: string) => onChange((value ?? []).filter((x) => x !== id));

  const buttonText = React.useMemo(() => {
    if (!selectedOptions.length) return placeholder;

    const names = selectedOptions.map((x) => x.label);
    const shown = names.slice(0, maxNamesOnButton);
    const rest = names.length - shown.length;

    return rest > 0 ? `${shown.join(", ")} +${rest}` : shown.join(", ");
  }, [selectedOptions, placeholder, maxNamesOnButton]);

  return (
    <div className={cn("space-y-2", disabled && "opacity-70 pointer-events-none")}>
      <div className="text-sm font-semibold text-main">{label}</div>

      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedOptions.map((o) => (
            <div
              key={o.value}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
                "bg-soft border border-main text-main"
              )}
            >
              <span className="max-w-[220px] truncate">{o.label}</span>

              <button
                type="button"
                onClick={() => remove(o.value)}
                className="opacity-70 hover:opacity-100 transition"
                aria-label="remove"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "w-full flex items-center justify-between gap-3",
              "rounded-lg px-4 py-2",
              "bg-card border border-main text-main",
              "hover:bg-soft transition",
              "focus:outline-none focus:ring-2 focus:ring-primary"
            )}
          >
            <span className="truncate text-left text-sm">{buttonText}</span>
            <ChevronsUpDown className="h-4 w-4 opacity-70" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className={cn(
            "z-[9999] w-[--radix-popover-trigger-width] p-0",
            "bg-card border border-main rounded-xl shadow-2xl overflow-hidden"
          )}
        >
          <Command className="bg-card text-main">
            <CommandInput
              placeholder={placeholder}
              className={cn(
                "text-main placeholder:text-muted",
                "[&>input]:text-main [&>input]:placeholder:text-muted"
              )}
            />

            <CommandList className="max-h-64 overflow-auto">
              <CommandEmpty className="text-muted py-6 text-center">
                No results.
              </CommandEmpty>

              <CommandGroup className="p-2">
                {options.map((o) => {
                  const isOn = selected.has(o.value);

                  return (
                    <CommandItem
                      key={o.value}
                      value={`${o.label} ${o.meta ?? ""}`}
                      onSelect={() => toggle(o.value)}
                      className={cn(
                        "cursor-pointer rounded-lg px-3 py-2",
                        "hover:bg-soft",
                        "data-[selected=true]:bg-soft"
                      )}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isOn ? "opacity-100 text-primary" : "opacity-0"
                        )}
                      />

                      <div className="min-w-0">
                        <div className="truncate text-sm text-main">{o.label}</div>
                        {o.meta ? (
                          <div className="truncate text-xs text-muted">{o.meta}</div>
                        ) : null}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
