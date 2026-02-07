import Image from "next/image";
import userProfile from "../../../../public/user-profile.png";
import UserProfileUpload from "./components/UserProfileUpload";
import locationIcon from "../../../../public/location-icon.svg";
import NotificationBell from "../../../../public/notification-bell.svg";
import ToggleButton from "../worker/components/ToggleButton";
import FingerPointer from "../../../../public/finger-pointer.svg";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth-config";
import { headers } from 'next/headers';
import fetchUser from "../../../../lib/fetchers/fetch";

export default async function UserSettings({ lang }) {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/user/settings?id=${userId}`, {
        cache: 'no-store',
        headers: {
            'Cookie': headersList.get('cookie') || '',
        }
    });
    const data = await res.json();
    console.log(data);







    return (
        <section className="flex justify-center w-full  px-4">
            <div className="flex flex-col w-full md:max-w-3xl p-4 border border-blue-200 rounded-xl">
                <div className="flex w-22 justify-between text-2xl">{lang === 'en' ? 'Account' : 'Nalog'} <Image src={userProfile} alt="image"
                    className="w-5 h-6 mt-1" />
                </div>
                <div>
                    <UserProfileUpload profileImage={data.profileImage} userId={userId} lang={lang} />

                </div>
                <div className="flex flex-col w-full pt-7 gap-7">
                    <div className="flex justify-between">
                        <span className="text-gray-700">{lang === 'en' ? 'Email Address' : 'Email adresa'}</span>
                        <span className="text-gray-700 w-[180px]">{data.email}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-700">{lang === 'en' ? 'First and Last Name' : 'Ime i Prezime'}</span>
                        <span className="text-gray-700 w-[180px]">{data.name}</span>
                    </div>

                    <div className="flex justify-between cursor-pointer">
                        <span className="text-gray-700 flex w-20 justify-between">{lang === 'en' ? 'Location' : 'Lokacija'} <Image src={locationIcon} alt="icon" className="w-5 h-6" /></span>
                        <div className="w-[140px] mr-12 flex justify-between hover:bg-gray-200 p-2 rounded-3xl transition">{lang === 'en' ? 'Add Location' : 'Dodaj lokaciju'} <Image src={FingerPointer} alt="img" className="w-5 h-6" /></div>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-700 flex w-40 justify-between">{lang === 'en' ? 'Email Notifications' : 'Email obaveštenja'} <Image src={NotificationBell} alt="icon" className="w-5 h-6" /></span>
                        <div className="w-[130px]"><ToggleButton /></div>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-700 flex w-40 justify-between">{lang === 'en' ? 'WhatsApp/Viber Notifications' : 'WhatsApp/Viber obaveštenja'} <Image src={NotificationBell} alt="icon" className="w-5 h-6 mt-3.5" /></span>
                        <div className="w-[130px]"><ToggleButton /></div>
                    </div>



                </div>
            </div>
        </section>

    );
}