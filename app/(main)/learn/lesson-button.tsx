"use client";

import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import "react-circular-progressbar/dist/styles.css";
import Image from "next/image";

type Props = {
    id: number;
    index: number;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
};

export const LessonButton = ({
    id,
    index,
    totalCount,
    locked,
    current,
    percentage
}: Props) => {
    const cycleLength = 8;
    const cycleIndex = index % cycleLength;

    let indentationLevel;

    if(cycleIndex <= 2){
        indentationLevel = cycleIndex;
    } else if (cycleIndex <= 4) { 
        indentationLevel = 4 - cycleIndex;
    } else if (cycleIndex <= 6 ){
        indentationLevel = 6 - cycleIndex;
    } else {
        indentationLevel = cycleIndex -6;
    }


    const rightPosition = indentationLevel * 60;

    const isFirst = index === 0;
    const isLast = index === totalCount;
    const isCompleted = !current && !locked;

    const Icon = isCompleted ? Check : isLast ? Crown : Star;

    const href = isCompleted ? `/lesson/${id}` : "/lesson";

    return (
        <Link 
        href={href} 
        aria-disabled={locked}
         style={{ pointerEvents: locked ? "none" : "auto" }}>
            <div
            className="relative"
            style={{
                right: `${rightPosition}px`,
                marginTop: isFirst ? 70: !isFirst && !isCompleted ? 30 : 80, 
            }}
            >

            {current ? (
                <div className="h-[102px] w-[102px] relative">
                    <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-SidebarBorder bg-white rounded-xl animate-bounce tracking-wide z-10">
                        Start

                        <div
                            className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2"
                        />
                    </div>
                    
                        
                        <Button
                        size="rounded"
                        variant={locked ? "Locked" : "lesson"}
                        className="h-[70px] w-[70px] border-b-8 z-10"
                        >
                            <Icon
                                className={cn(
                                    "h-10 w-10",
                                    locked
                                    ? "fill-neutral-100 text-neutral-100 stroke-neutral-100"
                                    : "fill-primary-foreground text-primary-foreground",
                                    isCompleted && "fill-none stroke-[4]"
                                )}
                            />
                        </Button>
                    
                </div>
            ) : (
                <div className="relative">
                <Button
                        size="rounded"
                        variant={locked ? "Locked" : "lesson"}
                        className="h-[70px] w-[70px] border-b-8 relative"
                        >
                            <Icon
                                className={cn(
                                    "h-10 w-10",
                                    locked
                                    ? "fill-neutral-100 text-natural-100 stroke-neutral-100"
                                    : "fill-primary-foreground text-primary-foreground ",
                                    isCompleted && "fill-none stroke-[4]"
                                )}
                            />
                </Button>
                {!current && isCompleted && (
                    <div className="-top-[34px] -left-[34px] absolute w-[138px] h-[138px] z-[5]">
                        <Image
                            src="/bg-button.png"
                            alt="bg"
                            fill
                        />
                    </div>
                )}
                </div>
            )}
            </div>
        </Link>
    );
};