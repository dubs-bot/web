import { getGuilds } from '@/lib/api';
import GuildsList from '@/components/guilds';

export const Guilds = async () => {
  const { guilds } = await getGuilds();

  return (
    <GuildsList guilds={guilds!} />
  )
};

export default Guilds;