/* eslint-disable @next/next/no-img-element */
import Loading from "@/components/loading";
import Twemoji from "@/components/twemoji";
import { type DigitPatternDto, type GuildLeaderboardDto, type UserDto, getLeaderboard, getPatterns } from "@/lib/api";
import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { type ReactNode, useMemo, useState, useEffect } from "react";
import seedrandom from "seedrandom";

type GuildLeaderboardProps = {
    leaderboard: GuildLeaderboardDto;
    patterns: Record<string, DigitPatternDto>;
}

type HydratedUserScoreMatch = {
    id: string;
    count: number;
    pattern: DigitPatternDto;
};

type GuildLeaderboardEntry = {
    points: number;
    user: UserDto;
    matches: Array<HydratedUserScoreMatch>;
};

const randomColor = (seed: string): string => {
    const random = seedrandom(seed);
    const colors = [
        "text-yellow-500",
        "text-purple-500",
        "text-red-500",
        "text-[#8ac455]",
        "text-[#edb0a2]"
    ];

    return colors.sort(() => 0.5 - random())[0];
};

const displayPoints = (points: number, seed: string): ReactNode => {
    const random = seedrandom(seed);
    const templates = [
        <><strong>{points}</strong>{" "} points baby, let&apos;s gooo!</>,
        <>Flexing those <strong>{points}</strong> points</>,
    ];

    return templates.sort(() => 0.5 - random())[0];
};

const GuildLeaderboard: NextPage<GuildLeaderboardProps> = ({ leaderboard, patterns }) => {
    const [seed, setSeed] = useState<string | null>(null);
    const entries: Array<GuildLeaderboardEntry> = useMemo(
        () => Object.entries(leaderboard.scores)
            .sort(([, a], [, b]) => b.points - a.points)
            .map(([key, value]) => {
                const user = leaderboard.users[key]!;
                const matches = leaderboard.matches[key]!;
                const hydrated = matches.sort((a, b) => a.count - b.count).map(match => {
                    return {
                        id: match.id,
                        count: match.count,
                        pattern: patterns[match.pattern]
                    }
                });

                return {
                    points: value.points,
                    user,
                    matches: hydrated,
                };
            }),
        [leaderboard, patterns]
    );

    useEffect(() => { setSeed(Math.random().toString(16).substring(2)) }, [setSeed]);

    return (
        <>
            <Head>
                <title>Dubs bot | {leaderboard.guild.name}</title>
                <link rel="icon" href={leaderboard.guild.icon} sizes="any" />
            </Head>
            <div className="bg-discord-black text-discord-text flex flex-col items-center justify-center min-h-screen p-8 lg:p-10 gap-8">
                <Link href="/" className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Twemoji emoji={"🍀"} large />
                    <Twemoji emoji={"2️⃣"} large />
                    <h1 className="text-5xl font-black text-white">Dubs bot</h1>
                </Link>


                <div className="grid grid-cols-1 w-full md:w-2/3 xl:w-1/2 gap-4 flex-grow content-start bg-discord-light p-8 rounded-lg">
                    {seed === null
                        ? <Loading message="Loading leaderboard..." />
                        : entries.map(entry =>
                            <div key={entry.user.id} className="flex flex-row items-start justify-start gap-4">
                                <img src={entry.user.avatar} alt={entry.user.name} className="w-8 h-8 rounded-full" />
                                <div className="flex flex-col items-start gap-1">
                                    <strong className={`font-bold text-sm ${randomColor(seed + entry.user.name)}`}>{entry.user.name}</strong>
                                    <p className="text-white text-sm">{displayPoints(entry.points, seed + entry.user.name)}</p>
                                    <div className="flex flex-row items-center flex-wrap gap-1">
                                        {entry.matches.map(match =>
                                            <div key={match.id} className="flex flex-row items-center py-1 px-2 bg-discord-black rounded-lg gap-2">
                                                <Twemoji emoji={match.pattern.emoji} />
                                                <div className="text-xs font-bold">{match.count}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
};

export const getServerSideProps: GetServerSideProps<GuildLeaderboardProps> = async (context) => {
    const id = context.params?.guild;

    if (!id) {
        return {
            redirect: "/",
            props: null!
        };
    }

    const leaderboard = await getLeaderboard(id as string);

    if (!leaderboard) {
        return {
            redirect: "/leaderboards",
            props: null!
        };
    }

    const { patterns } = await getPatterns();
    const mappedPatterns: Record<string, DigitPatternDto> = patterns.reduce((mapped, pattern) => {
        return { ...mapped, [pattern.key]: pattern };
    }, {});

    return {
        props: {
            leaderboard,
            patterns: mappedPatterns,
        }
    }
};

export default GuildLeaderboard;