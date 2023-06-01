import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const handler: NextApiHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    const key = request.headers["api-key"];

    if (!key || key !== process.env.API_KEY) {
        return response.status(401).send("Unauthorized");
    }

    await response.revalidate("/patterns");
    return response.status(200).send("Patterns ISR cache invalidated");
};

export default handler;