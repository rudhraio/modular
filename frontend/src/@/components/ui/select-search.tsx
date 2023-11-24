"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// const frameworks = [
//     {
//         value: "next.js",
//         label: "Next.js",
//     },
//     {
//         value: "sveltekit",
//         label: "SvelteKit",
//     },
//     {
//         value: "nuxt.js",
//         label: "Nuxt.js",
//     },
//     {
//         value: "remix",
//         label: "Remix",
//     },
//     {
//         value: "astro",
//         label: "Astro",
//     },
// ]

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isvalid?: boolean,
    options: any
}


const SelectSearch = React.forwardRef<HTMLInputElement, SelectProps>(
    ({ options, isvalid, placeholder = "Select an item", ...props }, ref,) => {
        const [open, setOpen] = React.useState(false)
        const [value, setValue] = React.useState("")

        const [triggerWidth, setTriggerWidth] = React.useState(0);

        const popoverContentRef: any = React.useRef(null);

        React.useEffect(() => {
            if (open && popoverContentRef.current) {
                const triggerElement = popoverContentRef?.current?.parentElement;
                if (triggerElement) {
                    const { offsetWidth } = triggerElement;
                    setTriggerWidth(offsetWidth);
                }
            }
        }, [open]);

        return (
            <Popover open={open} onOpenChange={setOpen} >
                <PopoverTrigger asChild className="flex justify-between h-12" ref={popoverContentRef}>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={value ? `` : `text-gray-500`}
                        aria-expanded={open}
                    >
                        {value ? options.find((item: any) => item.value.toLowerCase() === value.toLowerCase())?.label : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 scroll-auto"

                    style={{
                        width: triggerWidth + "px",
                    }}>
                    <Command>
                        <CommandInput placeholder="Search..." />
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup className="overflow-scroll max-h-80">
                            {options.map((item: any) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        )
    });

export default SelectSearch;