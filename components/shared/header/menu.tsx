import {Button} from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import {EllipsisVertical, ShoppingCartIcon, UserIcon} from "lucide-react";
import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "@/components/shared/header/user-button";

const Menu = () => {
    return (
        <div className="flex justify-end gap-3 ">
            <nav className=" hidden md:flex w-full  max-w-xs gap-1">
                <ModeToggle/>
                <Button
                    variant="ghost"
                    className="rounded  transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                >
                    <Link href={'/cart'} className="flex items-center gap-2">
                        <ShoppingCartIcon className="h-5 w-5"/>
                        <span className="font-medium">Cart</span>
                    </Link>
                </Button>
                <UserButton/>
            </nav>
            <nav className="md:hidden">
                <Sheet>
                    <SheetTrigger className="align-middle">
                        <EllipsisVertical/>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col items-start p-3">
                        <SheetTitle>Menu</SheetTitle>
                        <ModeToggle/>
                        <Button variant={"ghost"} className="rounded">
                            <Link href={"/cart"}>
                                <ShoppingCartIcon/>
                                Cart
                            </Link>
                        </Button>
                        <UserButton/>
                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    );
};

export default Menu;
