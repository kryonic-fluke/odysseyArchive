
import Spinner from "@/app/_components/Spinner";

//of the file is still getting downloaded , if js is disabled then we can not use this 
export default function Loading(){
    return (
        <div className="grid items-center justify-center">
        <Spinner/>
        <p className="text-xl text-primary-200">
            Loading cabin data...
        </p>

        </div>
    ); 
}  
