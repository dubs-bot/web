import Image from "next/image";
import { FC, memo } from "react";
import twemoji from "twemoji";

export type TwemojiProps = {
    emoji: string;
};

const U200D = String.fromCharCode(0x200d);
const UFE0Fg = /\uFE0F/g;

export const Twemoji: FC<TwemojiProps> = ({ emoji }) => {
    const code = twemoji.convert.toCodePoint(emoji.indexOf(U200D) < 0 ? emoji.replace(UFE0Fg, '') : emoji);

    return (
        <Image
            src={`https://twemoji.maxcdn.com/v/latest/svg/${code}.svg`}
            height="16"
            width="16"
            alt={emoji}
        />
    );
};

export default memo(Twemoji);