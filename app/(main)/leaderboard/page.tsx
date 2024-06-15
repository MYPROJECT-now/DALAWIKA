import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";

import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Header } from "./header";

const LeaderboardPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const leaderboardData = getTopTenUsers();

    const [
        userProgress,
        userSubscription,
        leaderboard,
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
        leaderboardData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses")
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-col px-6 top-0 w-full h-full lg:pt-[-24px] ">
            <div className="hidden lg:flex flex-row-reverse lg:gap-[48px] pl-[80px] pr-[270px]  h-20 justify-between fixed w-full py-8 z-50">
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
            <div className="w-full flex flex-col items-center pt-6 lg:px-[100px] sm:px-[40px] px-[30px] lg:pt-[110px] ">
                <Image
                        className="relative"
                        src="/lead (2).png"
                        alt="Leaderboard"
                        height={410}
                        width={410}
                />
            <div className="flex flex-wrap gap-7 -mt-[90px]">
                {[leaderboard[1], leaderboard[0], leaderboard[2]].map((userProgress, index) => {


                    const topMargin = index === 1 ? 'mr-10 ml-10 -mt-4' : index === 0 ? 'mr-2' : index === 2 ? 'ml-2' :  ""
            
                    const avatarsize = index === 0 ? 'w-14 h-14' : index === 1 ? 'w-14 h-14' : 'w-14 h-14';
                    
                    return (
                        <div key={userProgress?.userId} className={`flex flex-col items-center gap-10  ${topMargin}`}>
                            <Avatar className={`border bg-neutral-100 mb-2 ${avatarsize} `}>
                                <AvatarImage
                                    className="object-cover"
                                    src={userProgress?.userImageSrc || "/user.jpg"}
                                />
                            </Avatar>
                            <p className="font-bold text-neutral-100">
                                {userProgress?.userName || "no user yet"}
                            </p>
                            <p className="text-neutral-100 font-bold -mt-10 ">
                                {userProgress?.points} XP
                            </p>
                        </div>
                    );
                })}
            </div>
               
                    <h1 className="text-center font-extrabold text-neutral-100 text-2xl my-6"> LEADERBORD </h1>

                    <Separator className="mb-4 h-0.5 rounded-full" />
                    {leaderboard.map((userProgress, index) => (
                        <div key={userProgress.userId}
                        className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"    
                    >
                            <p className="font-bold text-neutral-100 mr-4"> 
                                {index + 1} 
                            </p>
                            <Avatar className="border bg-neutral-100 h-12 w-12 ml-3 mr-6">
                                <AvatarImage
                                    className="object-cover"
                                    src={userProgress.userImageSrc}
                                />
                            </Avatar>
                            <p className="font-bold text-neutral-100 flex-1">
                                {userProgress.userName}
                            </p>
                            <p className="text-neutral-100 font-bold">
                                {userProgress.points} XP
                            </p>
                        </div>
                    ))}
                </div>
        </div>
    );
};

export default LeaderboardPage;