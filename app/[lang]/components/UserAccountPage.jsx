import Image from "next/image";
import Link from "next/link";
import Star from "../../../public/stars.avif";

export default function UserAccountPage({ data, lang }) {
    console.log(data.data.data.name);
    const profileImage = data.data.profileImage;
    return (
        <section className="w-full flex justify-center pb-24 pt-15">
            <div className="mx-auto max-w-[1200px] flex flex-col xl:flex-row gap-7 mt-[30px] w-full px-4">

                <div className="mx-auto w-full max-w-[1000px] p-6 rounded-3xl shadow-xl bg-blue-50  border border-blue-200">
                    <h1 className="text-3xl pb-3">{lang === 'en' ? 'Account' : 'Nalog'}</h1>
                    <Link href={`/${lang}/settings`}>{lang === 'en' ? 'Click' : 'Klikni'} <span className="underline">{lang === 'en' ? 'Here' : 'Ovde'}</span> {lang === 'en' ? 'for account settings' : 'za podešavanje naloga'}</Link>

                    <div className="w-full flex justify-center pt-7">
                        <div className="w-2/3 max-w-48 aspect-square rounded-full relative border-3 border-blue-200">
                            <Image
                                src={profileImage === null ? "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg" : profileImage}
                                fill
                                alt="Profile Image"
                                className="w-full rounded-full object-cover"
                            />
                            <div className="absolute -bottom-6 -right-6 z-30 sm:-bottom-5 sm:-right-5 md:-bottom-1 md:-right-5 lg:bottom-1 lg:right-1">
                                {/*<Image src={Star} alt="star" className="w-[50px] h-[50px]" />*/}
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col gap-4 mx-auto max-w-[600px] text-[18px] pb-10 sm:text-xl pt-10">
                        <div className="flex justify-between items-end border-b pt-10 border-gray-100 pb-1">
                            <span className="italic text text-base">{lang === 'en' ? 'Name:' : 'Ime:'}</span>
                            <span>{data.data.name}</span>
                        </div>



                        <div className="flex justify-between items-end border-b border-gray-100 pb-1">
                            <span className="italic text text-base">{lang === 'en' ? 'Email:' : 'E-mail:'}</span>
                            <span>{data.data.email}</span>
                        </div>

                    </div>



                </div>
            </div>
        </section>
    );
}