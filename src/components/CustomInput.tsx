import React, { useState } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Check } from 'lucide-react'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'

export type OptionType = {
    value: string | number
    label: string
}

export type CustomInputProps = {
    label?: string
    type: 'text' | 'number' | 'date' | 'dropdown' | 'radio' | 'search-dropdown' | "checkbox"
    value: string | number
    onChange: (value: string | number) => void
    placeholder?: string
    options?: OptionType[]
    name?: string
    valueToSearch?: string
    className?: string
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    type,
    value,
    onChange,
    placeholder,
    options = [],
    name,
    valueToSearch,
    className
}) => {
    const [query, setQuery] = useState('')

    if (type === 'dropdown') {
        return (
            <div className={className}>
                {label && <label className="text-sm font-medium">{label}</label>}
                <Select onValueChange={onChange} defaultValue={String(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((opt) => (
                            <SelectItem key={opt.value} value={String(opt.value)}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        )
    } else if (type === 'radio') {
        return (
            <div className={className}>
                {label && <span className="text-sm font-medium">{label}</span>}
                <RadioGroup.Root
                    value={String(value)}
                    onValueChange={(val) => onChange(val)}
                    className="flex space-x-4"
                >
                    {options.map((opt) => (
                        <div key={opt.value} className="flex items-center space-x-1">
                            <RadioGroup.Item
                                value={String(opt.value)}
                                id={`radio-${opt.value}`}
                                className="w-4 h-4 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <label htmlFor={`radio-${opt.value}`} className="text-sm">
                                {opt.label}
                            </label>
                        </div>
                    ))}
                </RadioGroup.Root>
            </div>
        )
    } else if (type === 'search-dropdown') {
        const filteredOptions = options.filter((opt) =>
            opt['value']?.toString().toLowerCase().includes(query.toLowerCase())
        );

        return (
            <div className={`${className} relative `}>
                {label && <label className="block text-sm font-medium mb-1">{label}</label>}
                <Popover open={query !== ''} >
                    <PopoverTrigger >
                        <Input
                            placeholder={placeholder}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full"
                        />
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-full p-0 z-10">
                        <div className="max-h-60 overflow-y-auto rounded-lg bg-white shadow-md">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((opt) => (
                                    <Button
                                        key={opt.value}
                                        variant="ghost"
                                        className="w-full justify-start rounded-none"
                                        onClick={() => {
                                            onChange(opt.value);
                                            setQuery("");
                                        }}
                                    >
                                        <span className="mr-2 h-4 w-4">
                                            {value === opt.value && <Check className="h-4 w-4" />}
                                        </span>
                                        {opt.label}
                                    </Button>
                                ))
                            ) : (
                                <div className="py-3 text-center text-sm text-muted-foreground">No results found</div>
                            )}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        )
    }  else {
        return (
            <div className={className}>
                {label && <label className="text-sm font-medium">{label}</label>}
                <Input
                    type={type}
                    name={name}
                    value={String(value)}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            </div>
        )
    }
}

export default CustomInput
