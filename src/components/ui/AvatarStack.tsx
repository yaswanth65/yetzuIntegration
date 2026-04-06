"use client";
import Image from "next/image";

interface AvatarStackProps {
    count: number;      // total number of enrolled users
    size?: number;      // px size, default 40
    style?: string;     // dicebear sprite style
}

export default function AvatarStack({
    count,
    size = 40,
    style = "adventurer", // you can use: bottts, thumbs, identicon, shapes, etc.
}: AvatarStackProps) {
    count = count > 0 ? count : 5;
    const maxVisible = 4;
    const visible = Math.min(count, maxVisible);
    const remaining = count - visible;
    const secondSeed = Math.floor(Date.now() / 1000);

    const avatars = Array.from({ length: visible }).map((_, i) => {
        const seed = `s-${secondSeed}-${i}`;
        return `https://api.dicebear.com/8.x/${style}/svg?seed=${seed}`;
    });


    return (
        <div className="flex -space-x-2 items-center">
            {avatars.map((src, idx) => (
                <div
                    key={idx}
                    className="rounded-full border-2 border-white overflow-hidden bg-gray-200"
                    style={{ width: size, height: size }}
                >
                    <Image
                        src={src}
                        alt="User Avatar"
                        width={size}
                        height={size}
                    />
                </div>
            ))}

            {remaining > 0 && (
                <div
                    className="
            rounded-full border-2 border-white 
            bg-gray-100 
            flex items-center justify-center 
            text-xs font-bold text-gray-700
          "
                    style={{ width: size, height: size }}
                >
                    +{remaining}
                </div>
            )}
        </div>
    );
}
