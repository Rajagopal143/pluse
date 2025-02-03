"use client";
import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiChevronDown, FiChevronUp, FiDollarSign, FiCreditCard, FiUsers, FiBarChart, FiSettings, FiShield, FiBriefcase, FiMenu, FiUser, FiLogOut } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger,TooltipProvider } from "@/components/ui/tooltip";
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const menuItems = [
    {
        title: "Accounts",
        icon: <FiDollarSign />,
        submenus: ["Overview", "Transactions", "Statements", "Beneficiaries"]
    },
    {
        title: "Cards",
        icon: <FiCreditCard />,
        submenus: ["Virtual Cards", "Physical Cards", "Limits", "Pin Management"]
    },
    {
        title: "Investments",
        icon: <FiBarChart />,
        submenus: ["Portfolio", "Stocks", "Bonds", "Mutual Funds"]
    },
    {
        title: "Loans",
        icon: <FiBriefcase />,
        submenus: ["Personal Loans", "Mortgage", "Applications", "Calculator"]
    },
    {
        title: "Clients",
        icon: <FiUsers />,
        submenus: ["Profiles", "Onboarding", "KYC", "Documents"]
    },
    {
        title: "Security",
        icon: <FiShield />,
        submenus: ["2FA", "Biometric", "Activity Log", "Alerts"]
    },
    {
        title: "Settings",
        icon: <FiSettings />,
        submenus: ["Profile", "Notifications", "Preferences", "API Keys"]
    }
];


const SidebarMenu = ({ item, isExpanded, onClick, searchQuery, isCollapsed }: {
    item: any,
    isExpanded: boolean | '',
    onClick: () => void,
    searchQuery: string,
    isCollapsed: boolean
}) => {
    const highlightMatch = (text: string) => {
        if (!searchQuery) return text;
        const regex = new RegExp(`(${searchQuery})`, 'gi');
        return text.split(regex).map((part, i) =>
            regex.test(part) ? <span key={i} className="bg-blue-100 text-blue-800">{part}</span> : part
        );
    };

    return (
        <div className="mb-1">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                            className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer 
                            ${isExpanded ? 'bg-gradient-to-r from-[#00AEEF] to-[#1A237E] text-white' : 'hover:bg-gray-100'}
                            ${isCollapsed ? 'justify-center' : ''}`}
                            onClick={onClick}
                        >
                            <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
                                <span className="text-lg">{item.icon}</span>
                                {!isCollapsed && (
                                    <span className="font-medium">{highlightMatch(item.title)}</span>
                                )}
                            </div>
                            {!isCollapsed && (isExpanded ? <FiChevronUp /> : <FiChevronDown />)}
                        </motion.div>
                    </TooltipTrigger>
                    {/* {isCollapsed && (
                        <TooltipContent side="right">
                            <p>{item.title}</p>
                            {item.submenus.length > 0 && <p className="text-muted-foreground text-xs">Click to expand</p>}
                        </TooltipContent>
                    )} */}
                </Tooltip>
            </TooltipProvider>

            <AnimatePresence>
                {isExpanded && !isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-8 space-y-2"
                    >
                        {item.submenus.map((sub: string, index: number) => (
                            <Link
                                key={index}
                                href={`/${item.title.replace(/\s+/g, '-').toLowerCase()}/${sub.replace(/\s+/g, '-').toLowerCase()}`}
                                className="block"
                            >
                                <motion.div
                                    className="rounded px-2 py-1 hover:bg-blue-50 flex items-center"
                                    whileHover={{ x: 5,fontWeight: 'bold' }}
                                >
                                    <span className="text-blue-500 mr-2">•</span>
                                    {highlightMatch(sub)}
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Header = () => {
    const { data: session } = useSession();

    return (
        <header className="bg-white shadow-lg h-14 w-full fixed top-0 z-20">
            <div className="flex items-center justify-between p-2 h-full">
                <Image
                    src="/logo.png"
                    alt="FinTech Logo"
                    width={100}
                    height={50}
                    className="h-10 ml-4 object-contain"
                />
                <div className="flex items-center space-x-4 mr-4">
                    <Popover>
                        <PopoverTrigger className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src={"/person.jpeg"} />
                                <AvatarFallback className="bg-blue-500 text-white">
                                    {session?.user?.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            {session?.user && (
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium">{session?.user?.name}</p>
                                    <p className="text-xs text-gray-500">{session?.user?.email}</p>
                                </div>
                            )}
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2 mt-2">
                            <div className="space-y-1">
                                <div className="px-2 py-1">
                                    <p className="text-sm font-medium">{session?.user?.name}</p>
                                    <p className="text-xs text-gray-600 truncate">{session?.user?.email}</p>
                                </div>
                                <Button variant="ghost" className="w-full justify-start">
                                    <FiUser className="mr-2 h-4 w-4" />
                                    Profile
                                </Button>
                                <Button variant="ghost" className="w-full justify-start">
                                    <FiSettings className="mr-2 h-4 w-4" />
                                    Settings
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => signOut()}
                                >
                                    <FiLogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </header>
    );
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [expandedMenu, setExpandedMenu] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMenus, setFilteredMenus] = useState(menuItems);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!searchQuery) {
            setFilteredMenus(menuItems);
            return;
        }

        const filtered = menuItems.map(item => ({
            ...item,
            submenus: item.submenus.filter(sub =>
                sub.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(item =>
            item.submenus.length > 0 ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredMenus(filtered);
    }, [searchQuery]);

    return (
        <div className="min-h-screen flex">
            <Header />

            <motion.aside
                className="bg-white shadow-xl fixed left-0 h-full pt-16 z-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false)
                    setSearchQuery('')
                }}
                animate={{
                    width: isHovered ? "256px" : "64px"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <nav className="p-2 space-y-4">
                    {isHovered && (
                        <div className="px-1 ">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search menus..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100
                                        focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {filteredMenus.map((item, index) => {
                        const isExpanded = expandedMenu === index ||
                            (searchQuery && item.submenus.length > 0);

                        return (
                            <SidebarMenu
                                key={index}
                                item={item}
                                isExpanded={isExpanded}
                                onClick={() => setExpandedMenu(isExpanded ? null : index)}
                                searchQuery={searchQuery}
                                isCollapsed={!isHovered}
                            />
                        );
                    })}
                </nav>
            </motion.aside>

            <motion.main
                className="flex-1 p-8 pt-16"
                animate={{
                    marginLeft: isHovered ? "256px" : "44px"
                }}
            >
                <div className="bg-white rounded-xl  shadow-sm">
                    {children}
                </div>
            </motion.main>
        </div>
    );
}
