import { getBookedDatesByCabinId } from "@/app/_lib/data-service";

export  async function GET(request,{params}){

   const {cabinid} = params;

    try{
    const [cabin,bookedDates] =await Promise.all([getCabin(cabinid), getBookedDatesByCabinId(cabinid)])


    return NextResponse.json({cabin,bookedDates})
    }
 
    catch (error) {
        return NextResponse.json({ message: "Failed to fetch cabin data" }, { status: 500 });
      }

} 

// we can send json like this
// export async function  POST(){

// } 