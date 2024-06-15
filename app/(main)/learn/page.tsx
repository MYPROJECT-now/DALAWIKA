import { 
    getCourseProgress, 
    getLessonPercentage, 
    getUnits, 
    getUserProgress, 
    getUserSubscription
} from "@/db/queries";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";

import { Header } from "./header";
import { Unit } from "./unit";
import { lessons, units as unitSchema} from "@/db/schema";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import Image from "next/image";

// LearnPage component
const LearnPage = async () => {
    const [
        userProgress, 
        units, 
        courseProgress, 
        lessonPercentage, 
        userSubscription
    ] = await Promise.all([
        getUserProgress(),
        getUnits(),
        getCourseProgress(),
        getLessonPercentage(),
        getUserSubscription(),
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        return redirect("/courses");
    }

    if (!courseProgress) {
        return redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-col px-6 w-full h-auto lg:pt-[-24px]">
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
            <div className=" lg:pt-20">
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit 
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                                unit: typeof unitSchema.$inferSelect;
                            } | undefined}
                            activeLessonPercentage={lessonPercentage}
                        />
                    </div>
                ))} 
            </div>
            <div className="hidden sm:flex sm:flex-row justify-between -mx-6 mt-[-650px]  ">
                <div className="flex flex-col gap-[150px] mt-[70px]">
                    <Image
                        src="/l-t.png"
                        alt="background"
                        height={60}
                        width={150}
                    />
                    <Image
                        src="/l-b.png"
                        alt="background"
                        height={30}
                        width={250}
                    />
                </div>
                <div className="flex flex-row">
                    <div className="-mr-10">
                    <Image
                        src="/r-1.png"
                        alt="background"
                        height={40}
                        width={90}
                        />
                    </div>
                    <div className="ml-0">
                    <Image
                        src="/r-2.png"
                        alt="background"
                        height={32}
                        width={150}
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default LearnPage;
