import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({
    children,
}: Props) => {
    return(
        <>
            <MobileHeader />
            <Sidebar className="hidden lg:block" />
            <main className=" min-h-screen pt-[50px] lg:pt-0 lg:mb-20 relative bg-bg_color ">
                <div className="max-w-[1056] mx-auto h-full bg-bg_color">
                    {children}
                </div>
            </main>
        </>
    );
};

export default MainLayout;