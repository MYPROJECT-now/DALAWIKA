"use client";

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};

export const Items2 = ({
    hearts,
    points,
    hasActiveSubscription,
}: Props) => {
    const [pending, startTransition] = useTransition();

    const onRefillHearts = () => {
        if (pending || hearts === 5 || points < POINTS_TO_REFILL){
            return;
        }

        startTransition(() => {
               refillHearts()
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const onUpgrade = () => {
        startTransition(() => {
            createStripeUrl()
            .then((response) => {
                if (response.data) {
                    window.location.href = response.data;
                }
            })
            .catch(() => toast.error("Something went wrong"));
    });
};

    return (
        <ul className="w-full">
            <li className="flex flex-row sm:gap-10 gap-3"> 
                <div className="flex flex-col items-center justify-center lg:w-[544px] lg:h-[311px] sm:w-[334px] sm:h-[270px] min-w-[130px] w-[197px] bg-white rounded-[20px] px-2 gap-10 border-4 border-yellow-400">
                 <Image
                    className="w-auto h-auto"
                     src="/refill.png"
                     alt="Heart"
                     height={90}
                     width={90}
                 />

                <Button
                    className="rounded-[17.11px] w-full h-[50px] lg:h-[70px]"
                    variant="getStarted"
                    onClick={onRefillHearts}
                    disabled={pending
                        ||hearts === 5 
                        || points < POINTS_TO_REFILL}
                >
                    {hearts === 5
                    ? <p className="font-bold text-neutral-100 lg:text-3xl sm:text-2xl text-lg">
                        FULL 
                    </p> 
                    :
                    <p className="font-bold text-neutral-100">
                        REFILL
                    </p>
                    } 
                    
                </Button>
                </div> 

                <div className="flex flex-col items-center justify-center lg:w-[544px] lg:h-[311px] sm:w-[334px] sm:h-[270px] min-w-[130px] w-[197px] bg-white rounded-[20px] gap-10 py-5 px-2 sm:px-3 sm:p-0 border-4 border-indigo-500">
                    <Image
                        className="w-auto h-auto"
                        src="/pro-heart.png"
                        alt="Unlimited"
                        height={70}
                        width={80}
                    />
                    <Button
                    className="rounded-[17.11px] w-full h-[50px] lg:h-[70px]"
                    variant="super"
                    onClick={onUpgrade}
                    disabled={pending}
                    >
                        {hasActiveSubscription 
                        ?<p className="font-bold text-neutral-100 sm:text-4xl text-sm">
                        SETTINGS
                        </p> 
                        : <p className="font-bold text-neutral-100 sm:text-2xl lg:text-3xl text-[13px]">
                        UNLIMITED HEARTS
                        </p>}
                    </Button>
                </div>

            </li>
        </ul>
    );
};
