import Image from "next/image";
import { FC, memo } from "react";
import twemoji from "twemoji";

export type TwemojiProps = {
    emoji: string;
    large?: boolean;
};

export const Twemoji: FC<TwemojiProps> = ({ emoji, large = false }) => {
    const size = large ? 32 : 16;
    const code = twemoji.convert.toCodePoint(
        emoji.indexOf(String.fromCharCode(0x200d)) < 0
            ? emoji.replace(/\uFE0F/g, '')
            : emoji
    );

    return (
        <Image
            src={`https://twemoji.maxcdn.com/v/latest/svg/${code}.svg`}
            height={size}
            width={size}
            alt={emoji}
        />
    );
};

export default memo(Twemoji);