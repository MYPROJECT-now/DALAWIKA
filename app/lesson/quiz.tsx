"use client";

import { toast } from "sonner";
import Image from "next/image";
import Confetti from "react-confetti";
import { useAudio, useWindowSize, useMount  } from "react-use";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { reduceHearts } from "@/actions/user-progress";
import { challengeOptions, challenges, userSubscription } from "@/db/schema";
import { upsertChallengeProgress } from "@/actions/challenge-progress";

import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { ResultCard } from "./result-card";

import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";


type Props ={
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: typeof userSubscription.$inferSelect & {
        isActive: boolean;
    } | null;
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription,
}: Props) =>{
    const { open: openHeartsModal } = useHeartsModal();
    const { open: openPracticeModal } = usePracticeModal();

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal();
        }
    });

    const { width, height } = useWindowSize();

    const router = useRouter();

    const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true});
    const [
        correctAudio,
        _c,
        correctControls,
    ] = useAudio({ src: "/correct.wav"});
    const [
        incorrectAudio,
        _i,
        incorrectControls,
    ] = useAudio({ src: "/incorrect.mp3"});

    const [pending, startTransition] = useTransition();

    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed)
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };

    const onSelect = (id:number) => {
        if (status != "none") return;

        setSelectedOption(id);
    };

    const onContinue = () => {
        if(!selectedOption) return;

        if(status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if(status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct)

        if(!correctOption) {
            return;
        }
        
        if(correctOption && correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                    .then((response) => {
                        if(response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }

                        correctControls.play();
                        setStatus("correct");
                        setPercentage((prev) => prev + 100 / challenges.length);

                        // this is a practice
                        if (initialPercentage === 100) {
                            setHearts((prev) => Math.min(prev + 1, 5));
                        }
                    })
                    .catch(() => toast.error("Something went wrong. Pls try again"))
            });
        } else {
            startTransition(() => {
                reduceHearts(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }

                        incorrectControls.play();
                        setStatus("wrong");

                        // fix na putek
                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev -1, 0));
                        }

                        // from here in case front end hearts does not match in pratice mode
                        // if (initialPercentage !== 100){
                        //     if (!response?.error) {
                        //         setHearts((prev) => Math.max(prev -1, 0));
                        //     }
                        // }
                        // else {
                        //     return hearts;
                        // }
                        // TO HERE

                    })
                    .catch(() => toast.error("Something went wrong. pls try again"))
            });
        }
    };

    if (!challenge) {
        return(
            <>
                {finishAudio}
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-6 max-w-lg mx-auto text-center items-center justify-center h-screen ">
                    <div className="flex flex-row gap-0">
                        <div className=" -mr-[160px] lg:-mr-[120px] mt-0 lg:mt-10 ">
                            <Image
                                src="/fetti.png"
                                alt="finish"
                                className="hidden lg:block"
                                height={220}
                                width={170}
                            />
                            <Image
                                src="/finish.png"
                                alt="finish"
                                 className="block lg:hidden p-0 mr-[130]"
                                height={150}
                                width={150}
                            />
                            
                        </div>
                        <div className="p-0">
                            <Image
                                src="/finish.png"
                                alt="finish"
                                className="hidden lg:block p-0"
                                height={250}
                                width={250}
                            />
                            
                            <Image
                                src="/fetti.png"
                                alt="finish"
                                className="block lg:hidden mt-8 mr-10"
                                height={150}
                                width={90}
                            />
                        </div>
                    
                    </div>
                    
                
                    <h1 className="text-4xl lg:text-7xl font-semibold font-dongle text-neutral-500 p-0 -mb-5 lg:-mb-[50px]">
                        MABUHAY
                    </h1>
                    <h1 className="text-2xl lg:text-3xl font-light font-dongle text-neutral-400 -mb-3 lg:-mb-7">
                        You have completed this level
                    </h1>

                    <div className="flex flex-col items-center gap-y-2 w-full  mt-0 -mb-1 ">
                        <ResultCard 
                            variant="points"
                            value={challenges.length * 10}
                        />

                        <ResultCard 
                            variant="hearts"
                            value={hearts}
                        />
                    </div>
                </div>

                <Footer
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
            </>
        );
    }


    const title = challenge.type === "ASSIST" 
    ? "Select the correct meaning"
    : challenge.question;

    return (
        <>
        {incorrectAudio}
        {correctAudio}
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />

            <div className="flex-1">
                <div className="h-full flex items-center justify-center  ">
                    <div className="lg:min-h-[350px] sm:w-[600px] lg:w-[1000px] w-full  px-1 sm:px-0 lg:px-[70px] xl:px-6  flex flex-col gap-y-12 mt-0 xl:-mt-3 ">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700 -mb-5 ">
                            {title}
                        </h1>
                        <div className="-mt-5 ">
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble question={challenge.question}/>
                            )} 
                            <Challenge 
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={pending}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer 
                disabled={pending || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    );
};