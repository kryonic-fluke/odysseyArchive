"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


function Filter() {
    const searchparams=useSearchParams()
    const router=  useRouter()
    const pathname= usePathname()


    const activeFilter= searchparams.get("capacity") ?? "all"

function handleFilter(filter){
         const params= new URLSearchParams(searchparams)
         params.set("capacity", filter)
         router.replace(`${pathname}?${params.toString()}`, {scroll:false})
}
  
    return (
        <div className="border border-primary-800 flex ">


<Button filter="all" handleFilter={handleFilter} activeFilter={activeFilter} >
  All Cabins

</Button>

<Button filter="small" handleFilter={handleFilter} activeFilter={activeFilter} >
2&mdash;3  guest

</Button>

<Button filter="medium" handleFilter={handleFilter} activeFilter={activeFilter} >
4&mdash;8  guest

</Button>

<Button filter="large" handleFilter={handleFilter} activeFilter={activeFilter} >
8&mdash;12  guest

</Button>  
        </div>
    )
}



function Button({filter,activeFilter,handleFilter,children}){
 return   ( <button className={`px-5 py-2 hover:bg-primary-700 ${filter===activeFilter ? "bg-primary-700 text-primary-50":''}`}onClick={()=>handleFilter(filter)}>
    {children}
           </button>)
}
export default Filter;





            {/* <button className="px-5 py-2 hover:bg-primary-700" onClick={()=>handleFilter("all")}>
                All Cabins
            </button>
            <button className="px-5 py-2 hover:bg-primary-700" onClick={()=>handleFilter("small")}>
              1&mdash; 3 guest
            </button>

            <button className="px-5 py-2 hover:bg-primary-700" onClick={()=>handleFilter("medium")}>
              4&mdash;7 guest
            </button>

            <button className="px-5 py-2 hover:bg-primary-700"onClick={()=>handleFilter("large")}>
           
            </button> */}