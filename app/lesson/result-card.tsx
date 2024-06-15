import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  value: number;
  variant: "points" | "hearts";
};

export const ResultCard = ({ value, variant }: Props) => {
  const imageSrc = variant === "hearts" ? "/hearts.png" : "/points.png";

  return (
      <div className={cn(
        "rounded-2xl border-2 w-full flex flex-row justify-between items-center pl-3 pr-1",
        variant === "points" && "bg-white border-orange-400",
        variant === "hearts" && "bg-white border-rose-500",
      )}>
        <div className={cn(
          "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
          variant === "hearts" && "bg-white text-red-500",
          variant === "points" && "bg-white text-orange-300",
        )}>
          {variant === "hearts" ? "Hearts Left" : "Total Pearls"}
        </div>

        <div className={cn(
          "rounded-2xl bg-white items-center flex justify-center px-5 py-1 my-1",
          variant === "hearts" && "text-white bg-red-500",
          variant === "points" && "text-white bg-orange-300",
        )}>
          <Image
            alt="Icon"
            src={imageSrc}
            height={30}
            width={30}
            className="mr-1.5 "
          />
          {value}
        </div>
      </div>
  );
};