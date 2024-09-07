'use client'
import Footer from '@/components/footer/Footer'
import { Image } from '@nextui-org/react';

function Admin() {

  
  async function connectUpstox() {


    const base_url = "https://api.upstox.com/v2/login/authorization/dialog";
    const data = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_UPSTOX_API_KEY as string,
      redirect_uri: 'http://localhost:3000',
      state: 'RnJpIERlYyAxNiAyKJHLkJHlkjhlEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZChljklhluig',
    })

    const url = `${base_url}?${data.toString()}`;

    window.open(url)

  }

  async function connectZerodha() {
    alert("work in progress");
  }

  return (
    <>
      <main className="flex min-h-[90vh] flex-col items-center justify-start">
        <div className="w-[70vw] py-9 text-center">
          <h1 className="pb-5 text-5xl font-bold leading-[120%]">Connect <span className="text-blue-800">Dmart Accounts</span></h1>
        </div>

        <div className="grid gap-4">
          <div className="w-full border p-2 rounded-lg shadow-lg bg-slate-200 text-center flex justify-center">
            <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                width={40}
                src="https://avatars.githubusercontent.com/u/26001409?s=200&v=4"
                className="opacity-100 inline"
              /> 
            <button className='ps-3' onClick={connectUpstox}>Connect Upstox</button>
          </div>

          <div className="w-full border p-2 rounded-lg shadow-lg bg-slate-200 text-center flex justify-center">
            <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                width={40}
                src="https://avatars.githubusercontent.com/u/34680622?s=200&v=4"
                className="opacity-100 inline"
              />
            <button className='ps-3' onClick={connectZerodha}>Connect Zerodha</button>
          </div>
        </div>
          

      </main>
      <Footer />
    </>
  )
}

export default Admin