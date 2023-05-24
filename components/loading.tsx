import Image from "next/image";
import { FC } from "react";

export type LoadingProps = {
    message: string;
};

export const Loading: FC<LoadingProps> = ({ message }) => {
    return (
        <div className="flex flex-col flex-grow items-center justify-center gap-4">
            <Image src="/loading.gif" alt="Loading animation" width={128} height={128} quality={100}/>
            <div className="text-white">{message}</div>
        </div>
    );
};

export default Loading;