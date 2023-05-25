import Twemoji from "@/components/twemoji";
import { DigitPatternDto, getPatterns } from "@/lib/api";
import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

type PatternsProps = {
    patterns: Array<DigitPatternDto>;
};

const Patterns: NextPage<PatternsProps> = ({ patterns }) => {
    return (
        <>
            <Head>
                <title>Dubs bot | Patterns</title>
                <link rel="icon" href="/favicon.png" sizes="any" />
            </Head>
            <div className="bg-discord-black text-discord-text flex flex-col items-center justify-center min-h-screen p-8 lg:p-10 gap-8">
                <Link href="/" className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Twemoji emoji={"🍀"} large />
                    <Twemoji emoji={"2️⃣"} large />
                    <h1 className="text-5xl font-black text-white">Dubs bot</h1>
                </Link>


                <div className="grid grid-cols-1 xl:grid-cols-2 w-full md:w-2/3 xl:w-1/2 gap-4 flex-grow content-start">
                    {patterns.map(pattern =>
                        <div key={pattern.key} className="flex flex-row items-start justify-start gap-4 bg-discord-dark p-4 rounded-xl">
                            <Twemoji emoji={pattern.emoji} large />
                            <div className="flex flex-col items-start gap-1">
                                <div className="flex flex-row items-center justify-center">
                                    <strong className="font-bold text-sm text-dubs">{pattern.name}</strong>
                                    <span className="ml-2 text-xs">&bull; {pattern.points} points</span>
                                </div>
                                <p className="text-white text-sm">{pattern.description}</p>
                                <div className="flex flex-row items-center flex-wrap gap-1">
                                    <div className="flex flex-row items-center py-1 px-2 bg-discord-black rounded-lg gap-2">
                                        <Twemoji emoji="🍀" />
                                        <div className="text-xs font-bold">1</div>
                                    </div>
                                    <div className="flex flex-row items-center py-1 px-2 bg-discord-black rounded-lg gap-2">
                                        <Twemoji emoji={pattern.emoji} />
                                        <div className="text-xs font-bold">1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
};

export const getStaticProps: GetStaticProps<PatternsProps> = async () => {
    const { patterns } = await getPatterns();

    return {
        props: {
            patterns
        }
    }
};

export default Patterns;