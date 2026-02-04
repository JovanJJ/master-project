import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth-config';
import { headers } from 'next/headers';
import UserAccountPage from '../../components/UserAccountPage';

const noImage = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg';
const profileImage = "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"

export default async function UserAccount() {
    const session = await getServerSession(authOptions);
    const role = session?.user.role;
    const id = session?.user.id;

    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    let data = null;
    if (role && id) {
        const res = await fetch(`${baseUrl}/api/current-user?role=${role}&id=${id}`, {
            cache: 'no-store',
            headers: {
                'Cookie': headersList.get('cookie') || '',
            }
        });
        data = await res.json();
    }



    return (
        <UserAccountPage data={data} />
    );
}