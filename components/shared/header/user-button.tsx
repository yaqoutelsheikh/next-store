import {auth} from "@/auth";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {UserIcon} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {signOutUser} from "@/lib/actions/user.actions";

const UserButton = async () => {
    const session = await auth();
    if (!session) {
        return <Button
            className="rounded bg-primary-gradient px-3  transition-all duration-300 hover:scale-105 hover:shadow-primary/20 active:scale-95 border-0"
        >
            <Link href="/sign-in" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4"/>
                <span className="font-semibold">Sign In</span>
            </Link>
        </Button>
    }

    const firstInitial = session.user?.name?.charAt(0).toUpperCase()?? 'U';

    return (<div className={'flex gap-2 items-center'}>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className={'flex items-center'}>
                    <div
                            className={'relative w-8 h-8 rounded-full bg-secondary hover:bg-primary/10 cursor-pointer hover:text-primary ml-2 flex items-center justify-center '} >
                        {firstInitial}
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'w-56'} align={"end"}>
                <DropdownMenuGroup>

                <DropdownMenuLabel className={'font-normal'}>
                    <div className={'flex flex-col space-y-1'}>
                        <div className={'text-sm text-foreground font-medium leading-none'}>
                            {session.user?.name}
                        </div>
                        <div className={'text-sm text-muted-foreground leading-none'}>
                            {session.user?.email}
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={'p-0 mb-0'}>
                    <form action={signOutUser}>
                        <Button type="submit" variant={'ghost'}
                        className={'w-full py-4 px-2 h-4 justify-start'}>
                            Sign Out
                        </Button>
                    </form>
                </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    </div>)
}
export default UserButton;