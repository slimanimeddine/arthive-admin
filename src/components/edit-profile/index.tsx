"use client";
import { useShowAuthenticatedUser } from "@/hooks/endpoints/users";
import { authHeader, matchQueryStatus } from "@/lib/utils";
import ErrorUI from "../error-ui";
import ChangePasswordForm from "./change-password-form";
import PersonalInformationForm from "./personal-information-form";
import LoadingSpinner from "../loading-spinner";
import EmailNotVerifiedAlert from "../email-not-verified-alert";
import { useSession } from "@/hooks/session";

export default function EditProfile() {
  const { token } = useSession();
  const showAuthenticatedUserQuery = useShowAuthenticatedUser(
    authHeader(token),
  );

  return matchQueryStatus(showAuthenticatedUserQuery, {
    Loading: <LoadingSpinner />,
    Errored: <ErrorUI />,
    Empty: <span></span>,
    Success: ({ data }) => {
      return (
        <div className="flex flex-col justify-start gap-y-6">
          <EmailNotVerifiedAlert />
          <PersonalInformationForm
            username={data.data.username}
            first_name={data.data.first_name}
            last_name={data.data.last_name}
            email={data.data.email}
            country={data.data.country}
            bio={data.data.bio}
          />
          <ChangePasswordForm />
        </div>
      );
    },
  });
}
