"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () => {
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = usePracticeModal();

    useEffect(() => setIsClient(true), []);


    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image 
                            src="/practice.png"
                            alt="Practice"
                            height={180}
                            width={180}
                        />
                    </div>
                    <DialogTitle className="text-center font-dongle text-5xl text-neutral-600">
                        PRACTICE LESSON
                    </DialogTitle>
                    <DialogDescription className="text-center text-base font-dongle text-neutral-400 mt-0 ">
                        <p className=" p-0 -mb-10">
                            Regain hearts by studying this lesson again
                        </p>
                        <p className=" p-0">
                            You cannot loose hearts or points in practice lesson
                        </p> 
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button 
                            variant="getStarted" 
                            className="w-full" 
                            size="lg" 
                            onClick={close}
                        >
                            RELEARN
                        </Button>
                    </div>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};