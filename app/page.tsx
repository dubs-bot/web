"use client";

import { GuildDto, getGuilds } from '@/lib/api';
import { useEffect, useState } from 'react'
import { Loading } from '../components/loading';
import GuildsList from '@/components/guilds';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [guilds, setGuilds] = useState<Array<GuildDto> | null>(null);

  useEffect(() => {
    if (guilds === null) {
      setTimeout(() =>
        void getGuilds().then(response => {
          setGuilds(response.guilds);
          setLoading(false);
        }),
        1000
      )
    }
  }, [guilds, setGuilds]);

  return (
    loading 
    ? <Loading message="Loading guilds..."/> 
    : <GuildsList guilds={guilds!}/>
  )
}
