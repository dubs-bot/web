export type DigitPatternDto = {
    readonly key: string;
    readonly name: string;
    readonly emoji: string;
    readonly description: string;
    readonly points: number;
};

export type GuildDto = {
    readonly id: string;
    readonly name: string;
    readonly icon: string;
};

export type UserDto = {
    readonly id: string;
    readonly name: string;
    readonly avatar: string;
};

export type UserScoreDto = {
    readonly id: string;
    readonly guild: string;
    readonly points: number;
};

export type UserScoreMatchDto = {
    readonly id: string;
    readonly guild: string;
    readonly count: number;
    readonly pattern: string;
};

export type GuildLeaderboardDto = {
    readonly guild: GuildDto;
    readonly users: Record<string, UserDto>;
    readonly scores: Record<string, UserScoreDto>;
    readonly matches: Record<string, Array<UserScoreMatchDto>>;
};

export type DigitPatternsResponse = {
    readonly patterns: Array<DigitPatternDto>;
};

export type GuildResponse = {
    readonly guilds: Array<GuildDto>;
};

const url = "https://gateway.dubsbot.online/api/v1";

export const getPatterns = async (): Promise<DigitPatternsResponse> => {
    const response = await fetch(`${url}/patterns`);
    const data = await response.json() as DigitPatternsResponse;

    return data;
};

export const getGuilds = async (): Promise<GuildResponse> => {
    const response = await fetch(`${url}/guilds`);
    const data = await response.json() as GuildResponse;

    return data;
};

export const getLeaderboard = async (guild: string): Promise<GuildLeaderboardDto> => {
    const response = await fetch(`${url}/leaderboard/guild/${guild}`);
    const data = await response.json() as GuildLeaderboardDto;

    return data;
};