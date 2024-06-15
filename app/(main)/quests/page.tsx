import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Progress } from "@/components/ui/progress";
import { UserProgress } from "@/components/user-progress";
import { quests } from "@/constants";

import {getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Header } from "./header";



const QuestsPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [
        userProgress,
        userSubscription,
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses")
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-col px-6 w-full h-full lg:pt-[-24px]">
        <div className="hidden lg:flex flex-row-reverse lg:gap-[48px] pl-[80px] pr-[270px] h-20 justify-between fixed w-full py-8 z-50  ">
            <StickyWrapper>
                <UserProgress 
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro} 
                />
            </StickyWrapper>

            <FeedWrapper>
                <Header
                    activeCourse={userProgress.activeCourse} 
                    title={userProgress.activeCourse.title}
                />            
            </FeedWrapper>  
        </div>
        <div className=" lg:pt-20 pt-[40px] mb-10">
            <div className=" lg:px-[90px] px-[60px]  w-full flex flex-col items-center">
                <Image
                    src="/quest.png"
                    alt="Quests"
                    height={180}
                    width={180}
                />
                
                <h1 className="text-center font-extrabold text-neutral-100 text-3xl my-3"> Quests </h1>
                <p className="text-neutral-100 text-center text-lg mb-6">
                            Complete quests by earning points.
                </p>

                <ul className="w-full">
                {/* remove li if theres a problem */}
                    <li>
                    {quests.map((quest) => {
                    const progress = (userProgress.points / quest.value) * 100;

                        return (
                        <div
                        className="flex items-center w-full p-4 gap-x-4 bg-bg_pearl mb-5 rounded-lg "
                        key={quest.title}
                        >
                            <Image
                                src="/pearl.png"
                                alt="Points"
                                width={60}
                                height={60}
                            />
                                <div className="flex flex-col gap-y-2 w-full ">
                                    <p className="text-neutral-100 text-xl font-bold">
                                                {quest.title}
                                    </p>
                                    <Progress value={progress} className="h-3"/>
                                </div>
                        </div>
                        )
                    })}
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
       
    );
};

export default QuestsPage;