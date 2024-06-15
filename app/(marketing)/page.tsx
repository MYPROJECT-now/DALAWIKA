import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return(

    <div className="max-w-[1440px] mx-auto flex-1 w-full flex flex-col items-center gap-2 pt-9">

      {/* text part */}
      <div className="w-[500px] h-[116px] sm:w-[600px] lg:w-[830px] flex flex-col items-center -mt-[12px] sm:mt-1 mb-0">
        <p className=" text-[27px] sm:text-5xl lg:text-7xl xl:text-[80px] font-dongle font-bold text-custom -mb-4">
          Learn Dialects from the Philippines
        </p>
        <p className="text-sm sm:text-xl lg:text-3xl font-dongle font-semibold text-muted-foreground">
          There are over 100+ dialects from the Philippines        </p>
      </div>

      {/* button part */}
      <div className="flex flex-col items-center gap-y-3 max-w-[250px] w-full mb-0 -mt-4 sm:mt-0 lg:mt-5">
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
            </ClerkLoading>

            <ClerkLoaded>
              <SignedOut>
                <SignUpButton
                mode="modal"
                //@ts-ignore
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn">
                  <Button variant="getStarted" 
                  className="w-full
                  lg:mt-[-32px] sm:mt-[-50px] mt-[-60px]
                    sm:text-2xl text-xl
                    sm:h-12 sm:px-8 h-8 px-1"
                  size="lg"
                  >
                    Get Started
                  </Button>
                </SignUpButton>

              </SignedOut>

              <SignedIn>
                <Button variant="getStarted" className="w-full
                lg:mt-[-32px] sm:mt-[-50px] mt-[-60px]
                sm:text-2xl text-xl
                sm:h-12 sm:px-8 h-8 px-1" 
                asChild
                size="lg"
                  >                
                  <Link href="/learn">
                    Continue Learning
                  </Link>              
                </Button> 
              </SignedIn>
            </ClerkLoaded>
      </div>

      <div className="relative  w-auto h-auto lg:w-[1150.87px] lg:h-[619.84px] -mt-12">
        <Image src="/Marketing.png" alt="Marketing image" width={1150.87} height={619.84} />
      </div>
      {/* width={1150.87} height={619.84} */}

    </div>

  )
}
