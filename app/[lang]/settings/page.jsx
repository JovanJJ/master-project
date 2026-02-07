import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth-config";
import WorkerSettings from "./worker/WorkerSettings";
import { redirect } from "next/navigation";
import UserSettings from "./user/UserSettings";



export default async function Settings({ params }) {
  const session = await getServerSession(authOptions);
  const { lang } = await params;

  if (!session) {
    redirect(`/${lang}/login/user`);
  }


  return (
    <section className="w-full h-full py-10 md:py-17">
      {session?.user?.role === "user" && <UserSettings lang={lang} />}
      {session?.user?.role === "worker" && <WorkerSettings lang={lang} />}
    </section>
  );

}