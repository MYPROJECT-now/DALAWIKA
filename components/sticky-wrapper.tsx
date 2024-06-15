type Props = {
    children: React.ReactNode;
};

export const StickyWrapper = ({ children }: Props) =>{
    return(
        <div className=" w-[150px] self-center px-3  bottom-6 pt-6">
            <div className="h-20 flex flex-col gap-y-4  ">
                {children}
            </div>
        </div>
    );
};