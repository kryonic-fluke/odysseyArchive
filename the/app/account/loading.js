//global loader
//this loading file is immediately loaded on the serverr while content 

import Spinner from "@/app/_components/Spinner";

//of the file is still getting downloaded , if js is disabled then we can not use this 
export default function Loading(){
    return (
        <Spinner/>
    ); 
}  



 