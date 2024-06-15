import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";

import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items2 } from "./items copy";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { Header } from "./header";

const ShopPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [
        userProgress,
        userSubscription,
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses")
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-col px-6 top-0 w-full h- lg:pt-[-24px] ">
            <div className="hidden lg:flex flex-row-reverse lg:gap-[48px] pl-[80px] pr-[270px] h-20 justify-between fixed w-full py-8 z-50 -mb-20">
                <StickyWrapper>
                    <UserProgress 
                        activeCourse={userProgress.activeCourse}
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                        hasActiveSubscription={!!userSubscription?.isActive} 
                    />
                
                </StickyWrapper>

                <FeedWrapper>
                    <Header
                    activeCourse={userProgress.activeCourse} 
                    title={userProgress.activeCourse.title}
                    />            
                </FeedWrapper>  
            </div>
            <div className="w-full flex flex-col items-center pt-2 lg:px-[100px] sm:px-[30px] px-[0px] lg:pt-[80px] mb-10 gap-10  ">
                    <Image
                        className="w-auto h-auto"
                        src="/shop (2).png"
                        alt="Shop"
                        height={110}
                        width={110}
                    />

                    <Items2
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                        hasActiveSubscription={isPro} 
                    />
            </div>
        </div>
        
    );
};

export default ShopPage;