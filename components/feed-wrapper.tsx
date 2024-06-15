type Props = {
    children: React.ReactNode;
};

export const FeedWrapper = ({
     children 
    }: Props) =>{
    return(
        <div className=" top-0 pb-0  self-center">
            {children}
        </div>
    );
};