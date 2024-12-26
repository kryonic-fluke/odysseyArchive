// import { NextResponse } from "next/server";
// export  function middleware(){
//     return NextResponse.redirect(new URL("/about", request.url));
// }


import {auth} from "@/app/_lib/auth";
export const middleware = auth;
//auth serves as a middlware function 
export const config={
    matcher:['/account'],   

}
