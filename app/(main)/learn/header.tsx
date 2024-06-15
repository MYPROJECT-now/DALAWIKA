import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { courses } from "@/db/schema";
import Image from "next/image";

type Props = {
    title: string;
    activeCourse: typeof courses.$inferSelect;
};

export const Header = ({ 
    activeCourse,
    title 
}: Props) =>{
    return(
        <div className=" flex flex-row">
            <div>
                <Link href="/courses">
                    <Button variant="ghost">
                        <Image 
                            src={activeCourse.imageSrc}
                            alt={activeCourse.title}
                            // className="rounded-md border"
                            height={35}
                            width={35}
                        />
                    </Button>
                </Link>
            </div>
            <div className="sticky top-0 bg-white pb-3 lg:pt[28px] lg:pt[-28px] flex items-center pt-2 text-neutral-400 lg:z-50 px-3 gap-3 h-[50px] w-[200px] rounded-xl ">
                <Link href="/courses">
                    <Button 
                    className="bg-bg_arrow mt-2 " 
                    size="rounded">
                        <ArrowRight className="h-8 w-8 stroke-1 text-arrow"/>
                    </Button>
                </Link>

                <h1 className="font-bold text-xl">
                    {title}
                </h1>       
            </div>
        </div>

    );
};