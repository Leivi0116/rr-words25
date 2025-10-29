"use client"

import { Button } from "@/components/ui/button"

interface WatchPartyHeroProps {
  onContinue: () => void
}

export default function WatchPartyHero({ onContinue }: WatchPartyHeroProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage: "url('/home.png')",
        }}
      />   

      {/* Content container */}
      <div className="relative z-10 flex min-h-screen w-[90%] items-center justify-center ">
        <div className="w-[90%] flex items-center justify-center">
          <div className="w-full">
            {/* Left side - Text content */}
            <div className="flex flex-col justify-center space-y-6 sm:space-y-8 ">
              <div className="h-[50px] w-[220px]" 
               style={{
          backgroundImage: "url('/Worlds_Logo_White.png')",
          backgroundSize:"cover",
        }}
              />

              <div className="space-y-2">
                <h1 className="font-anton text-[140px] sm:text-[140px] lg:text-[200px] leading-none   text-white">
                  WATCH
                </h1>
                <h1 className="font-anton text-[140px] sm:text-[140px] lg:text-[200px] leading-none text-white">
                  PARTY
                </h1>
              </div>

              <div className="space-y-2 text-white/90 font-montserrat">
                <p className="text-base sm:text-lg leading-none ">Samsung Hall, SM Aura, BGC</p>
                <p className="text-base sm:text-lg font-semibold leading-none " >November 9, 2025 | 2:00 PM</p>
                <p className="text-base sm:text-lg leading-none  ">LIMITED SEATS AVAILABLE</p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={onContinue}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-8 text-lg rounded-none"
                >
                  BUY TICKETS
                </Button>
              </div>
            </div>

            {/* Right side - Trophy image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
