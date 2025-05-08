import { NotificationItem } from '@/types/models/notification'
import ArtistVerificationRequestNotification from './artist-verification-request-notification'

type NotificationProps = {
  token: string
  notification: NotificationItem
}

export default function Notification({
  token,
  notification,
}: NotificationProps) {
  if (
    notification.type === 'artist-verification-request' &&
    'user' in notification.data
  ) {
    return (
      <ArtistVerificationRequestNotification
        token={token}
        notificationId={notification.id}
        user={notification.data.user}
        createdAt={notification.createdAt}
        readAt={notification.readAt}
      />
    )
  }

  return <></>
}
