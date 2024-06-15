import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
    className?: string;
};

export const Sidebar = ({ className }: Props) => {
    return (
        <div
            className={cn(
                "flex flex-col h-full lg:h-20 lg:flex-row lg:items-center lg:justify-between lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:border-t-2 border-r-2 lg:border-r-0 px-4 z-[1000] bg-white ",
                className
            )}
        >
            <Link href="/learn">
                <div className="pt-8 lg:pt-0 pl-4 lg:pl-0 pb-7 lg:pb-0 flex items-center gap-x-3 lg:hidden">
                    <Image src="/logo.png" height={40} width={40} alt="Dalawika icon" />
                    <h1 className="font-dongle font-extrabold text-custom text-5xl tracking-wide">
                        DALAWIKA
                    </h1>
                </div>
            </Link>

            <div className="flex flex-col lg:flex-row gap-y-2 lg:gap-y-0 lg:gap-x-4 flex-1 lg:items-center lg:justify-center lg:mt-4 lg:ml-[80px] ">
                <SidebarItem 
                    label="Learn" 
                    href="/learn"
                    iconSrc="/learn.png" 
                />

                <SidebarItem 
                    label="Leaderboard" 
                    href="/leaderboard"
                    iconSrc="/lead.png" 
                />

                <SidebarItem 
                    label="Quests" 
                    href="/quests"
                    iconSrc="/quest.png" 
                />

                <SidebarItem 
                    label="Shop" 
                    href="/shop"
                    iconSrc="/shop.png" 
                />
                
                {/* ClerkLoading and ClerkLoaded components added here for alignment */}
                <div className="lg:flex lg:items-center lg:ml-auto lg:pr-4">
                    <ClerkLoading>
                        <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                    </ClerkLoading>
                    <ClerkLoaded>
                        <UserButton afterSignOutUrl="/" />
                    </ClerkLoaded>
                </div>
            </div>
        </div>
    );
};
