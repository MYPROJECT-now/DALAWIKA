import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
    activeCourse: typeof courses.$inferSelect;
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};


export const UserProgress = ({ 
    activeCourse,
    points,
    hearts,
    hasActiveSubscription 
}: Props) => {
    return  (
        <div className="flex items-center justify-between gap-x-2 w-full">

            <Link href="/shop">
                <Button variant="point" className="text-neutral-100 h-[50px] w-[139px]">
                    <Image src="/points.png" alt="points" height={30} width={30} className="mr-2"
                    />
                    {points}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="heart" className="text-neutral-100 h-[50px] w-[139px]">
                    <Image src="/hearts.png" alt="hearts" height={32} width={32} className="mr-2"
                    />
                    {hasActiveSubscription 
                    ? <InfinityIcon className="h-4 w-4 stroke-[3]" /> 
                    : hearts}
                </Button>
            </Link>
        </div>
    );
};