"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useCourseModal } from "@/store/use-course-modal";

import CoursePages from "@/app/(main)/courses/page";


export const CourseModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useCourseModal();


    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }




    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex bg-white h-full w-[1170px] ml-[90px] z-50 mt-[70px] rounded-2xl">
                    <div>
                        <Button 
                        onClick={() => {
                            close();
                            router.push("/learn");
                            }}>
                                Close
                        </Button>
                    </div>
                    <div>
                   
                    </div>
                    
                    
                </div>
            )}
        </>
    );
};

export default CourseModal;

