import { useToast } from "@/hooks/use-toast";
type CustomToastProps = {
    variant: "default" | "destructive" | null | undefined
    title?: string
    description?:string
}

export function CustomToast({ variant, title, description }:CustomToastProps) {
    const { toast } = useToast();

    return toast({
        variant,
       title:title?title:'',
        description: description ? description:'',
    })
}