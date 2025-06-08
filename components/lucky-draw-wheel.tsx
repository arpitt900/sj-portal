"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, RotateCw } from "lucide-react"

interface LuckyDrawWheelProps {
  participants: number[]
  onWinnerSelected: (winner: number) => void
}

export function LuckyDrawWheel({ participants, onWinnerSelected }: LuckyDrawWheelProps) {
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef<HTMLDivElement>(null)

  // Generate all numbers from 1 to 75
  const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
  const segmentAngle = 360 / 75

  const spinWheel = () => {
    if (spinning) return

    setSpinning(true)
    setWinner(null)

    // Random number between 1-75
    const randomWinner = Math.floor(Math.random() * 75) + 1
    const winnerIndex = randomWinner - 1

    // Calculate the final rotation angle with more spins
    // Position winner at the top (12 o'clock position)
    const spinAngle = 7200 + (360 - winnerIndex * segmentAngle)

    setRotation(spinAngle)

    // After animation completes, set the winner
    setTimeout(() => {
      setSpinning(false)
      setWinner(randomWinner)
      onWinnerSelected(randomWinner)
    }, 8000)
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6">Lucky Draw Wheel (1-75)</h3>

      <div className="relative w-80 h-80 md:w-96 md:h-96 mb-8">
        {/* Pointer/Indicator */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-red-500 drop-shadow-lg"></div>
        </div>

        {/* Winner Highlight Box */}
        {winner && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-xl shadow-lg animate-pulse">
            WINNER: #{winner}
          </div>
        )}

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full relative overflow-hidden shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 8s cubic-bezier(0.1, 0.7, 0.1, 1)" : "none",
            background: "radial-gradient(circle, #374151 0%, #1f2937 100%)",
            border: "8px solid #fbbf24",
            boxShadow: "0 0 40px rgba(251, 191, 36, 0.6), inset 0 0 30px rgba(0,0,0,0.4)",
          }}
        >
          {allNumbers.map((number, index) => {
            const angle = index * segmentAngle
            const isRed = index % 2 === 0
            const radius = 140 // Distance from center for number placement

            return (
              <div
                key={number}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "center",
                }}
              >
                {/* Segment background */}
                <div
                  className="absolute top-0 left-1/2 origin-bottom"
                  style={{
                    width: "2px",
                    height: "50%",
                    background: isRed ? "#dc2626" : "#1f2937",
                    transform: `translateX(-50%) rotate(${segmentAngle / 2}deg) scaleY(1)`,
                    clipPath: `polygon(0 0, 100% 0, ${100 + Math.tan((segmentAngle * Math.PI) / 360) * 100}% 100%, ${-Math.tan((segmentAngle * Math.PI) / 360) * 100}% 100%)`,
                  }}
                />

                {/* Gold separator lines */}
                <div
                  className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-yellow-400"
                  style={{
                    transformOrigin: "bottom",
                    transform: "translateX(-50%)",
                  }}
                />

                {/* Number text */}
                <div
                  className="absolute text-white font-bold text-xs drop-shadow-lg"
                  style={{
                    left: "50%",
                    top: "10%",
                    transform: `translateX(-50%) rotate(${segmentAngle / 2}deg)`,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.9)",
                    fontSize: "10px",
                  }}
                >
                  {number}
                </div>
              </div>
            )
          })}

          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-4 border-yellow-300 shadow-lg z-10">
            <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        {winner !== null ? (
          <div className="flex flex-col items-center bg-green-800 p-4 rounded-lg border-2 border-green-400">
            <Trophy className="h-12 w-12 text-yellow-400 mb-2 animate-bounce" />
            <p className="text-2xl font-bold text-white mb-2">🎉 CONGRATULATIONS! 🎉</p>
            <p className="text-xl font-bold text-yellow-400">Winner: Registration #{winner}</p>
            <p className="text-sm text-gray-300 mt-2">
              {participants.includes(winner)
                ? "Active participant wins!"
                : "Number selected - check if participant exists"}
            </p>
          </div>
        ) : (
          <p className="text-gray-400">Spin the wheel to select a winner from 1-75</p>
        )}
      </div>

      <Button
        onClick={spinWheel}
        disabled={spinning}
        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 flex items-center gap-2 px-8 py-3 text-lg font-bold shadow-lg"
      >
        <RotateCw className={`h-5 w-5 ${spinning ? "animate-spin" : ""}`} />
        {spinning ? "Spinning..." : "🎰 SPIN THE WHEEL"}
      </Button>

      {/* Participants info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">Active Participants: {participants.length} | Total Numbers: 1-75</p>
      </div>
    </div>
  )
}
