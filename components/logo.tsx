import Image from "next/image"

export default function Logo({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  // Define sizes based on the size prop
  const dimensions = {
    small: { width: 32, height: 32 },
    medium: { width: 48, height: 48 },
    large: { width: 64, height: 64 },
  }

  const { width, height } = dimensions[size]

  return (
    <div className="relative" style={{ width, height }}>
      {/* Logo image with border radius */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-teal-500">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-teal-500/5 z-10" />
        <Image
          src="/images/logo.png"
          alt="NexsoQurity Logo"
          width={width}
          height={height}
          className="object-contain rounded-full"
          priority
        />
      </div>
    </div>
  )
}
