import { type NotificationItem } from "@/types/models/notification";
import ArtistVerificationRequestNotification from "./artist-verification-request-notification";

type NotificationProps = {
  notification: NotificationItem;
};

export default function Notification({ notification }: NotificationProps) {
  if (
    notification.type === "artist-verification-request" &&
    "user" in notification.data
  ) {
    return (
      <ArtistVerificationRequestNotification
        notificationId={notification.id}
        user={notification.data.user}
        createdAt={notification.createdAt}
        readAt={notification.readAt}
      />
    );
  }

  return <></>;
}
