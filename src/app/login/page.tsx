"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginFromValidation } from "@/lib/zodValidation";
import { CustomFromField } from "@/components/CustomForm";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence, useTransform } from 'framer-motion';
import { useEffect, useState } from "react";

const floatingImages = [
    { src: "/digital-wallet.png", className: "top-20 left-32 w-24 h-24" },
    { src: "/currency-exchange.png", className: "top-1/2 right-40 w-32 h-32" },
    { src: "/investment-growth.png", className: "bottom-20 left-48 w-28 h-28" },
    { src: "/mobile-banking.png", className: "top-32 right-28 w-20 h-20" },
];

export default function LoginPage() {
    const session = useSession();
    useEffect(() => {
        if (session.status == "authenticated"){
            redirect("/dashboard");
        }   
    }, [session])
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof LoginFromValidation>>({
        resolver: zodResolver(LoginFromValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof LoginFromValidation>) {
        setLoading(true)
        console.log(values)
        const result = await signIn("login", {
            redirect: false,
            email: values.email,
            password: values.password,
        });

        if (result?.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: result?.error,
            });
        } else {
            toast({
                variant: "default",
                title: "Success",
                description: "Login Successful",
            });
            router.push("/dashboard");
        }
        setLoading(false)
    }

    return (
        <div className="flex h-screen bg-gradient-to-r from-[#00AEEF] to-[#1A237E] relative overflow-hidden">

            {/* Animated Background Elements */}
            <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                    background: [
                        'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)',
                        'radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 40%)',
                    ],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
            />

            {/* Logo Animation */}
            

            {/* Login Form */}
            <div className="w-full md:w-1/3 flex items-center justify-center bg-white p-8 shadow-lg rounded-xl z-10">

                <Image
                    src="/logo.png"
                    width={150}
                    height={50}
                    alt="Pulse Infotech Logo"
                    className="mb-4 absolute top-8 left-8"
                />
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Card className="min-w-[32vw] max-md:w-[90vw] shadow-2xl rounded-3xl">
                        <CardContent className="p-8">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back</h2>
                                <p className="text-gray-500 mb-6 text-lg">Secure Access to Your Financial Hub</p>
                            </motion.div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <CustomFromField
                                            control={form.control}
                                            label="Email"
                                            name="email"
                                            placeholder="jondoe@gmail.com"
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <CustomFromField
                                            control={form.control}
                                            label="Password"
                                            name="password"
                                            placeholder="**********"
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <motion.button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-[#00AEEF] to-[#1A237E] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl relative overflow-hidden"
                                            whileHover={{
                                                scale: 1.02,
                                                background: [
                                                    'linear-gradient(45deg, #00AEEF 0%, #1A237E 100%)',
                                                    'linear-gradient(45deg, #1A237E 0%, #00AEEF 100%)',
                                                ],
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{
                                                hover: {
                                                    duration: 0.5,
                                                    repeat: Infinity,
                                                    repeatType: 'mirror',
                                                },
                                                tap: { duration: 0.2 }
                                            }}>
                                            {
                                                loading ? "Loading..." : <span className="relative z-10">Login</span>
                                            }
                                            <motion.div
                                                className="absolute inset-0 bg-white opacity-0"
                                                animate={{ opacity: [0, 0.1, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                        </motion.button>
                                    </motion.div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Animated Financial Graphics */}
            <div className="w-2/3 hidden md:flex items-center justify-center relative">
                {/* <AnimatePresence>
                    {floatingImages.map((img, index) => (
                        <motion.div
                            key={index}
                            className={`absolute ${img.className}`}
                            initial={{ y: -20, scale: 0.8}}
                            animate={{
                                y: [0, -30, 0],
                                rotate: [0, -5, 5, 0],
                                scale: 1,
                                opacity: 1
                            }}
                            transition={{
                                duration: 4 + index,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.3
                            }}
                        >
                            <Image
                                src={img.src}
                                width={200}
                                height={200}
                                alt="Fintech Concept"
                                className="drop-shadow-2xl z-10"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence> */}

                {/* Main Graphic */}
                <motion.div
                    className="relative z-20"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 50 }}
                >
                    <Image
                        src="/financial-dashboard.jpg"
                        width={1000}
                        height={1000}
                        alt="Financial Analytics"
                        className="rounded-lg shadow-2xl -z-1 zoom-in-90 object-contain opacity-10"
                    />
                </motion.div>
            </div>

            {/* Floating Particles */}
            {[...Array(400)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    initial={{
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        opacity: 0,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                />
            ))}
        </div>
    );
}