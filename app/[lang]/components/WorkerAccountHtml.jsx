import Image from "next/image";
import Link from "next/link";
import Star from "../../../public/stars.avif";
import noImage from "../../../public/noImage.svg";
export default function WorkerAccountHtml({ lang, data }) {

    return (
        <section className="w-full flex justify-center pb-15 pt-7">
            <div className="mx-auto max-w-[1200px] flex flex-col xl:flex-row gap-7 mt-[30px] w-full px-4">

                <div className="mx-auto w-full max-w-[1000px] p-6 rounded-3xl shadow-2xl bg-blue-50">
                    <h1 className="text-3xl pb-3">{lang === 'en' ? 'Account' : 'Nalog'}</h1>
                    <Link href={`/${lang}/settings`}>{lang === 'en' ? 'Click' : 'Klikni'} <span className="underline">{lang === 'en' ? 'Here' : 'Ovde'}</span> {lang === 'en' ? 'for account settings' : 'za podešavanje naloga'}</Link>

                    <div className="w-full flex justify-center pt-7">
                        <div className="w-2/3 max-w-48 aspect-square relative">

                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                <Image
                                    src={data.data.profileImage?.startsWith("https") ? data.data.profileImage : noImage}
                                    fill
                                    alt="Profile Image"
                                    className="w-full rounded-full object-cover"
                                />

                                <div className="absolute inset-0 rounded-full border-3 border-blue-200 pointer-events-none"></div>
                            </div>

                            <div className="absolute z-50 w-[50px] h-[50px] bottom-0 right-0 sm:-bottom-5 sm:-right-5 md:-bottom-1 md:-right-5 lg:bottom-1 lg:right-1">
                                <Image src={Star} fill alt="star" className="w-full h-full" />
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col gap-4 mx-auto max-w-[600px] text-[18px] sm:text-xl pt-10">
                        <div className="flex justify-between items-end border-b border-gray-300 pb-1">
                            <span className="italic text text-base">{lang === 'en' ? 'First Name:' : 'Ime:'}</span>
                            <span>{data.data.firstName}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-300 pb-1">
                            <span className="italic text text-base">{lang === 'en' ? 'Last Name:' : 'Prezime:'}</span>
                            <span>{data.data.lastName}</span>
                        </div>
                        <div className="flex justify-between gap-6  w-full   border-b border-gray-300 pb-1">
                            <span className="italic text text-base">{lang === 'en' ? 'Profession:' : 'Profesija:'}</span>
                            <span className="max-w-[600px]">{data.data.profession}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-300 pb-1">
                            <span className="italic text text-base">{lang === 'en' ? 'Location:' : 'Lokacija:'}</span>
                            <span>{data.data.location}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-300 pb-1">
                            <span className="italic text text-base">{lang === 'en' ? 'Birth Year:' : 'Godina rodjenja:'}</span>
                            <span>{data.data.birthYear}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-300 pb-1">
                            <span className="italic text text-base">{lang === 'en' ? 'Email:' : 'E-mail:'}</span>
                            <span>{data.data.email}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-300 pb-1">
                            <span className="italic text text-base">{lang === 'en' ? 'Phone:' : 'Telefon:'}</span>
                            <span>{data.data.phone}</span>
                        </div>
                    </div>


                    <div className="border border-blue-200 mt-8 p-3 rounded-2xl mx-auto max-w-[600px] min-h-[150px] shadow-xl">
                        <span>
                            <span className="font-bold">{lang === 'en' ? 'Description:' : 'Opis:'}</span> {data.data.description}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}