

import WorkerAccount from "./worker/WorkerAccount";
import UserAccount from "./user/UserAccount";
import { getServerSession } from 'next-auth';
import { authOptions } from "../../../lib/auth-config";
import { redirect } from "next/navigation";
export default async function ProfilePage({ params }) {
    const session = await getServerSession(authOptions);
    const { lang } = await params;
    const role = session?.user.role;
    if (!session) redirect('/');
    return (
        <>
            {role === "worker" && <WorkerAccount lang={lang} />}
            {role === "user" && <UserAccount lang={lang} />}
        </>
    );
}