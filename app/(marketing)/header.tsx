import Image from "next/image";
import { Loader } from "lucide-react";
import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";


export const Header = () =>{
 return(
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
        <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">

            <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                <Image src="/dalawika-login-logo.png " height={50} width={49.773} alt="Dalawika icon" />
                <div>
                        <h1 className="text-2xl lg:text-[35px] font-extrabold font-hobo text-custom tracking-wide mb-0">
                        DALAWIKA    
                        </h1>
                    <p className="text-[9px] sm:text-[15px] lg:text-[20px] text-muted-foreground lg:tracking-wide w-5px -mt-1 font-dongle font-bold">
                    An Interactive Learning System for Filipino Dialects
                    </p>
                </div>
            </div> 
            
            <ClerkLoading>
                <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>

            <ClerkLoaded>
                <SignedIn>
                    <UserButton afterSignOutUrl="/"/> 
                </SignedIn>

                <SignedOut>
                    <SignInButton 
                        mode="modal" 
                        //@ts-ignore
                        afterSignInUrl="/learn"
                        afterSignOutUrl="/learn">
                        
                        <Button
                        className="
                        lg:h-12 lg:px-8
                        sm:h-12 sm:px-6
                        h-9 px-2
                        sm:text-2xl text-xl"
                        variant="SignIn">
                            Login
                        </Button>
                    </SignInButton>
                </SignedOut>
            </ClerkLoaded>

        </div>
    </header>
 );
};
