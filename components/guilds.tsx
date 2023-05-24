/* eslint-disable @next/next/no-img-element */
import { GuildDto } from "@/lib/api";
import { FC } from "react";
import classnames from "classnames";
import Link from "next/link";

type GuildLinkProps = {
    id: string;
    name: string;
    icon: string;
}

const GuildLink: FC<GuildLinkProps> = ({ id, name, icon }) => {
    return (
        <Link href={`/leaderboard/${id}`} className={
            classnames(
                "flex flex-col items-center gap-4 mb-4 py-8 rounded-xl",
                "transition-all transform",
                "bg-discord-light shadow border border-discord-light cursor-pointer",
                "hover:border-discord-text hover:shadow-3xl hover:-translate-y-2"
            )}>
            <img src={icon} alt={name} className="rounded-full h-16 w-16" />
            <span className="text-white font-black">{name}</span>
        </Link>
    )
}

export type GuildsListProps = {
    guilds: Array<GuildDto>;
};

export const GuildsList: FC<GuildsListProps> = ({ guilds }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {guilds.map(guild =>
                <GuildLink key={guild.id} id={guild.id} name={guild.name} icon={guild.icon} />
            )}
        </div>
    );
};

export default GuildsList;