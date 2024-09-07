'use client';
import Footer from "@/components/footer/Footer";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import InsCard from "./com/InsCard";
import { Image } from "@nextui-org/react";

export interface IinsData {
  open: number,
  high: number,
  low: number,
  close: number,
  instrumentToken: string,
}

export default function Home() {

  const [aToken, setAToken] = useState();
  const [insData, setInsData] = useState<IinsData[]>();
  const searchParams = useSearchParams()
  const code = searchParams.get('code')


  useEffect(() => {
    if(code){
      getAccessToken();
    }
  }, [code])

  async function getAccessToken(){

    const url = 'https://api.upstox.com/v2/login/authorization/token';
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };  // Correct endpoint for token

    if(!code) return;

    const data = new URLSearchParams({
      'code': code,
      'client_id': process.env.NEXT_PUBLIC_UPSTOX_API_KEY as string,
      'client_secret': process.env.NEXT_PUBLIC_UPSTOX_API_SECRET as string,
      'redirect_uri': 'http://localhost:3000',
      'grant_type': 'authorization_code',
    });
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: data.toString(),  // Send as URL-encoded form data
      });
  
      const result = await response.json();
      console.log(result);  // This will contain the access token and other details
      setAToken(result.access_token);
  
    } catch (error) {
      console.error(error);
    }

  }

  const insKeys = ["NSE_INDEX|Nifty 50", "NSE_INDEX|Nifty Auto", "NSE_INDEX|Nifty Bank", "NSE_INDEX|Nifty Energy", "NSE_INDEX|Nifty 500", "NSE_INDEX|Nifty Pharma"];
  
  async function getMarkets(){
    
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${aToken}`
    };

    const qe = insKeys.join(",")

    const q = {
      instrument_key: qe
    }
    

    const res = await fetch(`https://api.upstox.com/v2/market-quote/quotes?instrument_key=${qe}`, {headers});

    const result = await res.json();

    // console.log(result.data);
    // console.log(result.data[Object.keys(result.data)[0]]);


    for(let i = 0; i < Object.keys(result.data).length; i++){
      const instrumentData = result.data[Object.keys(result.data)[i]];
      const { open, high, low, close } = instrumentData.ohlc;
      const instrumentToken = instrumentData.instrument_token;

      // Now update the state using setInsData
      setInsData((prev: IinsData[] | undefined) => {
        return [
          ...(prev  || []),
          {
            open,
            high,
            low,
            close,
            instrumentToken,
          }
        ];
      });

      console.log("index", i);
      console.log("Open:", open);
      console.log("High:", high);
      console.log("Low:", low);
      console.log("Close:", close);
      console.log("Instrument Token:", instrumentToken);
    }
  }


  return (
    <>
      <main className="flex min-h-[90vh] flex-col items-center justify-start mt-5">
        <div className="w-[50vw] pb-5 text-center">
          <h1 className="pb-5 text-3xl font-bold leading-[120%]">All Your <span className="text-blue-800">Demat Accounts </span> In One Place</h1>
        </div>

        

        <div className="pb-5 grid grid-cols-4 gap-5">
          
          <div className="w-full border p-2 rounded-lg shadow-lg bg-slate-200 text-center flex justify-center">
            <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                width={40}
                src="https://plus.unsplash.com/premium_photo-1670213989516-449ccda46fdb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="opacity-100 inline"
              />
            <button className='ps-3' onClick={getMarkets}>Market</button>
          </div>

          <div className="w-full border p-2 rounded-lg shadow-lg bg-slate-200 text-center flex justify-center">
            <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                width={40}
                src="https://plus.unsplash.com/premium_photo-1670213989516-449ccda46fdb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="opacity-100 inline"
              />
            <button className='ps-3' onClick={() => alert("work in progress")}>Portfolio</button>
          </div>
          
          <div className="w-full border p-2 rounded-lg shadow-lg bg-slate-200 text-center flex justify-center">
            <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                width={40}
                src="https://plus.unsplash.com/premium_photo-1670213989516-449ccda46fdb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="opacity-100 inline"
              />
            <button className='ps-3' onClick={() => alert("work in progress")}>Orders</button>
          </div>
          
          <div className="w-full border p-2 rounded-lg shadow-lg bg-slate-200 text-center flex justify-center">
            <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                width={40}
                src="https://plus.unsplash.com/premium_photo-1670213989516-449ccda46fdb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="opacity-100 inline"
              />
            <button className='ps-3' onClick={() => alert("work in progress")}>Position</button>
          </div>

        </div>

        <div className="grid grid-cols-3 gap-4">

          {
            insData?.map((insD: IinsData, index: number) => {
              return <InsCard key={index} insData={insD} />
            })
          }
          
        </div>
          

      </main>
      <Footer />
    </>
  );

}
