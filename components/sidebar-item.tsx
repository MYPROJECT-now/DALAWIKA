"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    label: string;
    iconSrc: string;
    href: string;
};

export const SidebarItem = ({
label,
iconSrc,
href,
}: Props) => {
    const pathname = usePathname();
    const active = pathname === href;

    return(
        <Button 
        variant={active ? "sidebarOutline1" : "sidebar1"}
        className="flex flex-row items-center justify-center h-[60px] lg:h-auto w-[250px]"
        asChild
        >
            <Link href={href}>
                <Image 
                    src={iconSrc}    
                    alt={label}
                    className="mr-5"
                    height={32}
                    width={32}
                />
                {label}
            </Link>
        </Button>
    );
};