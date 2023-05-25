import Twemoji from "@/components/twemoji";
import Head from "next/head";
import Link from "next/link";
import { ReactNode, type FC } from "react";
import classnames from "classnames";
import { BookOpen, Trophy, ScrollText, ArrowRightSquare } from "lucide-react";

type HomepageLinkProps = {
    text: string;
    href: string;
    icon: ReactNode;
    primary?: boolean;
    external?: boolean;
};

const HomepageLink: FC<HomepageLinkProps> = ({ text, href, icon, primary = false, external = false }) => {
    return (
        <Link href={href} className={classnames(
            "flex flex-row items-center justify-start p-8 rounded-xl gap-8",
            "transition ring-0",
            "hover:ring-4",
            primary ? "bg-discord-primary ring-discord-primary/30 text-white" : "bg-discord-light text-white ring-discord-text/30"
        )} target={external ? "_blank" : "_self"}>
            {icon} {text}
        </Link>
    );
}

export default function Homepage() {
    return (
        <>
            <Head>
                <title>Dubs bot</title>
            </Head>
            <div className="bg-discord-black text-discord-text flex flex-col items-center justify-center min-h-screen p-8 lg:p-10 gap-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Twemoji emoji={"🍀"} large />
                    <Twemoji emoji={"2️⃣"} large />
                    <h1 className="text-5xl font-black text-white">Dubs bot</h1>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-2/3 xl:w-1/3 gap-4">
                    <HomepageLink text="Recognized digit patterns" href="/patterns" icon={<BookOpen size={16}/>} />
                    <HomepageLink text="Guild leaderboards" href="/leaderboards" icon={<Trophy size={16}/>} />
                    <HomepageLink text="Source code on Github" href="https://github.com/dubs-bot" icon={<ScrollText size={16}/>} external />
                    <HomepageLink text="Add bot to your server" href="https://discord.com/api/oauth2/authorize?client_id=1104170330014093422&permissions=137439333440&scope=bot%20applications.commands" icon={<ArrowRightSquare size={16}/>} primary external />
                </div>
            </div>
        </>
    )
}
