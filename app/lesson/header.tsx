import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

type Props = {
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean;
};

export const Header = ({
    hearts,
    percentage,
    hasActiveSubscription,
}: Props) => {
    const { open } = useExitModal();
    return (
        <header className="lg-pt[20px] pt-[15px] px-3 sm:px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full -mt-2">

            <div>
                <Button 
                onClick={open}
                variant="x"
                size="rounded"
                >
                x
                </Button>
            </div>
            
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-5">
                <div className="w-[120px] sm:w-[199px] h-[43px] bg-lime-500 rounded-2xl flex flex-row justify-center items-center gap-3 sm:gap-3">
                    <div className="w-50 h-50" style={{ width: '29px', height: '29px' }}>
                        <CircularProgressbarWithChildren
                            value={Number.isNaN(percentage) ? 0 : percentage}
                            styles={{
                                path: {
                                    stroke: "#FFFFFF",
                                }, 
                                trail: {
                                    stroke: "#419503",
                                },
                            }}
                            strokeWidth={15}
                        />
                    </div>
                    <p className="font-bold font-dongle text-xl sm:text-3xl text-white">
                        PROGRESS
                    </p>       
                </div>

                <div className="bg-rose-500 text-neutral-100 flex items-center justify-center font-bold w-[70px] sm:w-[120px] h-[43px] rounded-2xl my-3">
                    <Image
                        src="/hearts.png"
                        height={28}
                        width={28}
                        alt="Heart"
                        className="mr-2 lg:block hidden"
                    />
                    <Image
                        src="/hearts.png"
                        height={20}
                        width={20}
                        alt="Heart"
                        className="mr-2 lg:hidden block"
                    />
                    {hasActiveSubscription
                        ? <InfinityIcon className="h-6 w-6 stroke-[3] shrink-0" />
                        : hearts
                    }
                </div>
            </div>
        </header>
    );
};