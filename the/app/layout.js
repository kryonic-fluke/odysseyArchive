import      "@/app/_styles/globals.css";
import Header from "./_components/Header";
import {Josefin_Sans} from "next/font/google"
import { ReservationProvider } from "./_components/reservationContext";


const josefin = Josefin_Sans({
  // weight: ['400', '700'], // Specify the weights you need
  subsets: ['latin'],      // Ensure subsets are specified correctly
  display: 'swap',         // Use swap for better loading performance
  // preload: true            // Enable preloading if desired
});

  
export const metadata = {
  // title: "The Wild oasis",
  title:{
    template:"%s The Wild Oasis",
    default:"Welcome / The Wild Oasis",
  },
  description:
  `Luxurious cabin hotel located in the heart of the Italian
  Dolomities, surrounded by beautiful mountains and dark forests`,
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased  bg-primary-950 text-primary-100 min-h-screen flex flex-col relative` }>
      <Header/>

      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full"> <ReservationProvider>
    {children}
   </ReservationProvider>
   </main>
      </div>
  
      </body> 
    </html>
  );
} 

//children prop will be replaed by corresponding page that is rendered
//only things that are returned here will be visible in root layout
