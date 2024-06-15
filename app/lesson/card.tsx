import { cn } from "@/lib/utils"
import { challenges } from "@/db/schema";
import Image from "next/image";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use"

type Props = {
    id: number;
    imageSrc: string | null;
    audioSrc: string | null;
    text: string;
    shortcut: string;   
    selected?: boolean;
    onClick: () => void;
    disabled?: boolean;
    status?: "correct" | "wrong" | "none",
    type: typeof challenges.$inferSelect["type"];
};

export const Card = ({
    id,
    imageSrc,
    audioSrc,
    text,
    shortcut,
    selected,
    onClick,
    disabled,
    status,
    type
}: Props) => {
    const [audio, _, controls] = useAudio({ src: audioSrc || "" });

    const handleClick = useCallback(() => {
        if (disabled) return;

        controls.play();
        onClick();
    }, [disabled, onClick, controls]);

    useKey(shortcut, handleClick, {}, [handleClick]);

    return (
        <div
            onClick={handleClick}
            className={cn(
                "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 pt-0 pb-7  sm:p-6 cursor-pointer active:border-b-2 " ,
                selected && "border-yellow-400 bg-yellow-200 hover:bg-yellow-200",
                selected && status === "correct" && "border-lime-500 bg-lime-300 hover:bg-lime-500/opacity-50",
                selected && status === "wrong" && "border-rose-300 bg-rose-100 hover:bg-rose-100",
                disabled && "pointer-events-none hover:bg-white",
                type === "ASSIST" && "lg:p-3 p-2 sm:p-4 w-full"
            )}
        >
            {audio}
            {imageSrc && (
                <div className="relative aspect-square -mt-5 mb-0 max-h-[75px] lg:max-h-[90px] w-full flex items-center justify-center   "
                >

                    <Image 
                    src={imageSrc}
                    height={140}
                    width ={140}
                    className="hidden sm:block"
                    alt={text}
                    />

                    <Image 
                    src={imageSrc}
                    height={120}
                    width ={120}
                    className="block sm:hidden mt-7"
                    alt={text}
                    />
                  

                </div>
            )}
            <div className={cn(
                "flex items-center justify-between -mb-6 sm:-mb-3 px-2 ",
                type === "ASSIST" && "flex-row-reverse mb-1",
            )}>
                {type === "ASSIST" && <div />}
                <p className={cn(
                    "text-neutral-600 text-sm lg:text-base text-bold",
                    selected && "text-yellow-500",
                    selected && status === "correct" && "text-green-500",
                    selected && status === "wrong" && "text-rose-500",
                )}>
                    {text}
                </p>
                {/* shortcut */}
                <div className={cn(
                    "lg:w-[35px] lg:h-[35px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold mb-3",
                    selected && "border-yellow-400 bg-yellow-400 text-white",
                    selected && status === "correct" && "border-lime-500 bg-lime-500  text-white",
                    selected && status === "wrong" && "bg-rose-500 border-red-500 text-white",
                )}>
                    {shortcut}
                </div>

            </div>
        </div>
    )
}