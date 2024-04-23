//év kiírása

import NewList from "@/components/NewList";
import { getNewsForYear } from "@/lib/news";


export default function FilteredNewspage({params}){
    const newsYear =params.year;
    const news =getNewsForYear(newsYear)
 return <NewList news={news} />
}