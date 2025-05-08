import { useMarkNotificationRead } from '@/hooks/mark-notification-as-read'
import { classNames } from '@/lib/utils'
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

type ArtistVerificationRequestNotificationProps = {
  token: string
  notificationId: string
  user: {
    id: string
    username: string
    first_name: string
    last_name: string
  }
  createdAt: string
  readAt: string | undefined
}

export default function ArtistVerificationRequestNotification({
  token,
  notificationId,
  user,
  createdAt,
  readAt,
}: ArtistVerificationRequestNotificationProps) {
  const { markAsRead } = useMarkNotificationRead(token, notificationId, readAt)

  return (
    <div
      onClick={markAsRead}
      className={classNames(
        'relative p-2',
        readAt
          ? ''
          : 'bg-indigo-200 hover:bg-indigo-100 rounded-lg cursor-pointer'
      )}
    >
      <div className="relative flex space-x-3">
        <div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
            <QuestionMarkCircleIcon
              aria-hidden="true"
              className="h-5 w-5 text-white"
            />
          </span>
        </div>
        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
          <div>
            <p className="text-sm text-gray-500">
              {user.last_name} {user.first_name} is requesting a verification.
            </p>
          </div>
          <div className="whitespace-nowrap text-right text-sm text-gray-500">
            <span>{dayjs(createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
