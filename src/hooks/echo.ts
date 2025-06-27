/* eslint-disable @typescript-eslint/no-unused-vars */
import Echo, { Broadcaster } from 'laravel-echo'
import { useEffect, useState } from 'react'

import { AXIOS_INSTANCE } from '@/lib/axios'
import Pusher from 'pusher-js'

interface Authorizer {
  authorize: (socketId: string, callback: CallableFunction) => void
}

interface AuthorizationOptions {
  headers?: Record<string, string>
  params?: Record<string, string>
}

export function useEcho(token: string) {
  const [echoInstance, setEchoInstance] = useState<Echo<keyof Broadcaster>>()

  useEffect(() => {
    if (!token) {
      return
    }
    const echo = new Echo({
      broadcaster: 'reverb',
      Pusher,
      encrypted: true,
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
      authorizer: (channel: { name: string }): Authorizer => {
        return {
          authorize: (socketId: string, callback: CallableFunction) => {
            AXIOS_INSTANCE.post(
              '/api/broadcasting/auth',
              {
                socket_id: socketId,
                channel_name: channel.name,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )

              .then((response) => {
                callback(false, response.data)
              })

              .catch((error) => {
                callback(true, error)
              })
          },
        }
      },
      wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
      wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT) ?? 8080,
      wssPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT) ?? 8080,
      forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
    })

    setEchoInstance(echo)
  }, [token])

  return echoInstance
}
