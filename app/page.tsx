"use client";

import { GuildDto, getGuilds } from '@/lib/api';
import { useEffect, useState } from 'react'
import { Loading } from '../components/loading';

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
        2000
      )
    }
  }, [guilds, setGuilds]);

  return (
    loading 
    ? <Loading message="Loading guilds..."/> 
    : <>{JSON.stringify(guilds)}</>
  )
}
