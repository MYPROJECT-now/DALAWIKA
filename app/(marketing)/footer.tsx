import Image from "next/image";

export const Footer = () =>{
    return(
       <footer className="max-w-[1440px] mx-auto flex-1 w-full items-center">
           <div className="relative w-full h-auto m-0 p-0">
                    <Image src="/footer.jpg" alt="footer" width={1440} height={735} />
           </div>
       </footer>
    );
   };