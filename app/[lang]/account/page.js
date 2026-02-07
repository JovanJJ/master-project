import WorkerAccount from "./worker/WorkerAccount";
import UserAccount from "./user/UserAccount";
import { getServerSession } from 'next-auth';
import { authOptions } from "../../../lib/auth-config";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "../../../app/[lang]/components/ui/Loading";
export default async function ProfilePage({ params }) {
    const session = await getServerSession(authOptions);
    const { lang } = await params;
    const role = session?.user.role;
    if (!session) redirect('/');
    return (
        <>
            <Suspense fallback={<Loading />}>
                {role === "worker" && <WorkerAccount lang={lang} />}
            </Suspense>
            <Suspense fallback={<Loading />}>
                {role === "user" && <UserAccount lang={lang} />}
            </Suspense>
        </>
    );
}