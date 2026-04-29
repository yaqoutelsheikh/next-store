"use client";
import {useEffect, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {MoonIcon, SunIcon, SunMoonIcon} from "lucide-react";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";

const ModeToggle = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="flex cursor-pointer h-9 w-9 items-center justify-center rounded-lg border border-transparent transition-all duration-300 hover:border-border hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            >
                {theme === "system" ? (
                    <SunMoonIcon className="h-[1.2rem] w-[1.2rem]" />
                ) : theme === "dark" ? (
                    <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                    <SunIcon className="h-[1.2rem] w-[1.2rem]" />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 glass-effect border-border/50 shadow-2xl" >
                <DropdownMenuGroup>

                    <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider opacity-60" >Appearance</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuCheckboxItem
                        className="cursor-pointer transition-colors focus:bg-primary focus:text-white"
                        checked={theme === "system"}
                        onClick={() => setTheme("system")}
                    >
                        System
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={theme === "light"}
                        className="cursor-pointer transition-colors focus:bg-primary focus:text-white"
                        onClick={() => setTheme("light")}
                    >
                        Light
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        className="cursor-pointer transition-colors focus:bg-primary focus:text-white"
                        checked={theme === "dark"}
                        onClick={() => setTheme("dark")}
                    >
                        Dark
                    </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ModeToggle;
