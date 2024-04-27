import Messages from "@/components/messages";
import { unstable_noStore } from "next/cache";

//x másodpercenként törli a gyorsítótárat és ujból kekéri az adatokat  
//revalidate le foglalt név ezt keresi a nextjs
//export const revalidate = 1000;

//export const dynamic ='force-dynamic' //ugyanaz mint a cache:'no-store'

export default async function MessagesPage() {
  //unstable_noStore();
  const response = await fetch("http://localhost:8080/messages");
  // cache:'no-store' nem menti a gyorsítotárba igy mindig ujra lekéri az adatokat

  //next:{ 5 másodpercenként törli a gyorsítótárat és ujból kekéri az adatokat
  //  revalidate:5
  // }
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
