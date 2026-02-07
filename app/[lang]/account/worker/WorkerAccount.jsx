import Image from "next/image";

import Link from "next/link";
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth-config';
import { headers } from 'next/headers';
import WorkerAccountHtml from '../../components/WorkerAccountHtml';

const noImage = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg';
const profileImage = "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"

export default async function WorkerAccount({ lang }) {
    const session = await getServerSession(authOptions);
    const role = session?.user.role;
    const id = session?.user.id;

    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/current-user?role=${role}&id=${id}`, {
        cache: 'no-store',
        headers: {
            'Cookie': headersList.get('cookie') || '',
        }
    });
    const data = await res.json();
    const profileImage = data.data.profileImage;

    return (
        data && lang && < WorkerAccountHtml lang={lang} data={data} />
    );
}