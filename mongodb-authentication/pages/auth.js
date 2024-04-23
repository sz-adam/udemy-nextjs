import AuthForm from "../components/auth/auth-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function AuthPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    router.replace("/profile");
  }

  if (status === "loading") {
    return <p className="center">Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
