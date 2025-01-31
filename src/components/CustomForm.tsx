// components/inputs/TextInput.tsx
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, FieldValues, UseFormRegister } from "react-hook-form";

type TextInputProps = {
    label: string;
    placeholder: string;
    name: string;
    control:any
};

export function CustomFromField({ control, name, label, placeholder }: TextInputProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
