import { QueryClient } from "@tanstack/react-query";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { prefetchCheckIfUnreadNotificationsExist } from "@/hooks/endpoints/notifications";
import { prefetchShowAuthenticatedUser } from "@/hooks/endpoints/users";
import { verifyAuth } from "@/lib/dal";
import { authHeader } from "@/lib/utils";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  const { token } = await verifyAuth();
  const authConfig = authHeader(token);

  const queryClient = new QueryClient();

  await prefetchCheckIfUnreadNotificationsExist(queryClient, authConfig);

  await prefetchShowAuthenticatedUser(queryClient, authConfig);

  return (
    <div className="min-h-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
