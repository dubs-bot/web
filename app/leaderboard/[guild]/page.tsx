/* eslint-disable @next/next/no-img-element */
import Twemoji from "@/components/twemoji";
import { DigitPatternDto, UserDto, UserScoreMatchDto, getLeaderboard, getPatterns } from "@/lib/api";
import { ReactNode } from "react";

export type GuildLeaderboardParams = {
    readonly guild: string;
};

type HydratedUserScoreMatch = {
    readonly id: string;
    readonly count: number;
    readonly pattern: DigitPatternDto;
};

type GuildLeaderboardEntry = {
    readonly points: number;
    readonly user: UserDto;
    readonly matches: Array<HydratedUserScoreMatch>;
};

const randomColor = (): string => {
    const colors = [
        "text-yellow-500",
        "text-purple-500",
        "text-red-500",
        "text-[#8ac455]",
        "text-[#edb0a2]"
    ];

    return colors.sort(() => 0.5 - Math.random())[0];
};

const displayPoints = (points: number): ReactNode => {
    const templates = [
        <><strong>{points}</strong>{" "} points baby, let&apos;s gooo!</>,
        <>Flexing those <strong>{points}</strong> points</>,
    ];

    return templates.sort(() => 0.5 - Math.random())[0];
};

export const GuildLeaderboard = async ({ params }: { params: GuildLeaderboardParams }) => {
    const { guild } = params;
    const leaderboard = await getLeaderboard(guild);
    const patterns: Record<string, DigitPatternDto> = (await getPatterns()).patterns.reduce((merged, pattern) => {
        return { ...merged, [pattern.key]: pattern };
    }, {});

    const entries: Array<GuildLeaderboardEntry> =
        Object.entries(leaderboard.scores)
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
            });

    return (
        <div className="flex flex-col items-stretch justify-start gap-4 w-full md:w-2/3 xl:w-1/2 mx-auto">
            {entries.map(entry =>
                <div key={entry.user.id} className="flex flex-row items-start justify-start gap-4">
                    <img src={entry.user.avatar} alt={entry.user.name} className="w-8 h-8 rounded-full" />
                    <div className="flex flex-col items-start gap-1">
                        <strong className={`font-bold text-sm ${randomColor()}`}>{entry.user.name}</strong>
                        <p className="text-white text-sm">{displayPoints(entry.points)}</p>
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
            )}
        </div>
    );
};

export default GuildLeaderboard;