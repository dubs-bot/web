/* eslint-disable @next/next/no-img-element */
import Twemoji from "@/components/twemoji";
import Head from "next/head";
import Link from "next/link";
import { type FC } from "react";
import classnames from "classnames";
import { getGuilds, type GuildDto } from "@/lib/api";
import { type GetServerSideProps, type NextPage } from "next";

type GuildLinkProps = {
    id: string;
    name: string;
    icon: string;
};

const GuildLink: FC<GuildLinkProps> = ({ id, name, icon }) => {
    return (
        <Link href={`/leaderboards/${id}`} className={classnames(
            "flex flex-row items-center justify-start p-8 rounded-xl gap-8",
            "transition ring-0",
            "hover:ring-4",
            "bg-discord-light text-white ring-discord-text/30",
        )}>
            <img src={icon} alt={name} className="transition rounded-full w-16 h-16"/>
            <div className="text-xl font-black">{name}</div>
        </Link>
    );
}

export const getServerSideProps: GetServerSideProps<GuildLeaderboardsProps> = async () => {
    const { guilds } = await getGuilds();
    return {
        props: {
            guilds
        }
    }
};

type GuildLeaderboardsProps = {
    guilds: Array<GuildDto>;
};

const GuildLeaderboards: NextPage<GuildLeaderboardsProps> = ({ guilds }) => {
    return (
        <>
            <Head>
                <title>Dubs bot | Leaderboards</title>
                <link rel="icon" href="/favicon.png" sizes="any" />
            </Head>
            <div className="bg-discord-black text-discord-text flex flex-col items-center justify-center min-h-screen p-8 lg:p-10 gap-8">
                <Link href="/" className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Twemoji emoji={"🍀"} large />
                    <Twemoji emoji={"2️⃣"} large />
                    <h1 className="text-5xl font-black text-white">Dubs bot</h1>
                </Link>


                <div className="grid grid-cols-1 w-full md:w-2/3 xl:w-1/4 gap-4 flex-grow content-start">
                    {guilds.map(guild => 
                        <GuildLink key={guild.id} id={guild.id} icon={guild.icon} name={guild.name} />
                    )}
                </div>
            </div>
        </>
    )
}

export default GuildLeaderboards;
