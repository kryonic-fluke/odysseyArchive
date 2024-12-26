import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";
// to opt out of caching 
// export const revalidate=0;    //this only applies to statically generated pages
// export const revalidate=0;   

async function  CabinList({filter}) {
  // noStore();
  const Cabins = await getCabins();
 
if (!Cabins.length) return null
let displaycabin; 

if(filter ==="all") displaycabin=Cabins;

if(filter ==="small") displaycabin = Cabins.filter((cabins)=>cabins.maxCapacity<=3)
  if(filter ==="medium") displaycabin = Cabins.filter((cabins)=>cabins.maxCapacity>=4 && cabins.maxCapacity<=7)
    if(filter ==="large") displaycabin = Cabins.filter((cabins)=>cabins.maxCapacity>=8)

    return (
             <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {displaycabin.map((cabin) => (
              <CabinCard cabin={cabin} key={cabin.id} />
            ))}
          </div>
    )
}

export default CabinList;