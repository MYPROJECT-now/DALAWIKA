type Props = {
    children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
    return ( 
        <div className="flex flex-col h-full"> {/* h-screen */}
            <div className="flex flex-col h-screen w-full">
                {children}
            </div>
        </div>
    );
};

export default LessonLayout;