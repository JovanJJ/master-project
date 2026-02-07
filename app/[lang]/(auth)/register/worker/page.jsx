'use client';

import { createWorker } from "../../../../../lib/actions/worker";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function RegisterWorker() {
    const router = useRouter();
    const { lang } = useParams();
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError('');
    };

    const handleSubmit = async (e) => {
        if (password !== confirmPassword) {
            e.preventDefault();
            setPasswordError(lang === 'en' ? 'Passwords do not match' : 'Lozinke se ne poklapaju');
            return;
        }
        if (password.length < 6) {
            e.preventDefault();
            setPasswordError(lang === 'en' ? 'Password must be at least 6 characters' : 'Lozinka mora imati najmanje 6 karaktera');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            const formData = new FormData(e.currentTarget);
            // Remove confirmPassword as it's not needed on the server
            formData.delete('confirmPassword');

            const result = await createWorker(formData);

            if (result.success) {
                setMessage(result.message);
                setTimeout(() => {
                    router.push(`/${lang}/login/worker`); // Redirect to home or login page
                }, 2000);
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage(lang === 'en' ? 'Registration error. Please try again.' : 'Greška pri registraciji. Pokušajte ponovo.');
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="max-w-xl mx-auto">
                <h1 className="text-center py-4 text-3xl">{lang === 'en' ? 'Worker Registration' : 'Registracija radnika'}</h1>

                <form action={createWorker} onSubmit={handleSubmit} className="space-y-4 px-5 flex flex-col">
                    <div className=" max-w-[650px] font-bold">
                        {lang === 'en'
                            ? 'Looking for more work, better conditions or reliable employers? Master Hub is a platform that connects craftsmen and workers with those who really need their skills. By registering, you get the opportunity to find jobs more easily, expand your network of contacts and work when and where it suits you. No complications, no wasted time - show your knowledge and let the job find you. Join Master Hub today.'
                            : 'Tražiš više posla, bolje uslove ili pouzdane poslodavce? Master Hub je platforma koja povezuje majstore i radnike sa onima kojima su njihove veštine zaista potrebne. Registracijom dobijaš priliku da lakše pronađeš poslove, proširiš mrežu kontakata i radiš kada i gde tebi odgovara. Bez komplikacija, bez gubljenja vremena — pokaži svoje znanje i pusti da posao pronađe tebe. Pridruži se Master Hub-u već danas.'}
                    </div>
                    <div className="flex gap-4">
                        <input name="firstName" placeholder={lang === 'en' ? 'First Name' : 'Ime'} required className="flex-1 border rounded p-2 focus:outline-none focus:border-blue-600 transition" />
                        <input name="lastName" placeholder={lang === 'en' ? 'Last Name' : 'Prezime'} required className="flex-1 border rounded p-2 focus:outline-none focus:border-blue-600 transition" />
                    </div>

                    <div className="flex gap-4">
                        <input name="profession" placeholder={lang === 'en' ? 'Profession' : 'Profesija'} required className="flex-1 border rounded p-2 focus:outline-none focus:border-blue-600 transition" />
                        <input name="city" placeholder={lang === 'en' ? 'City' : 'Grad'} required className="flex-1 border rounded p-2 focus:outline-none focus:border-blue-600 transition" />
                    </div>

                    <div className="flex gap-4">
                        <input type="number" name="birthYear" placeholder={lang === 'en' ? 'Birth Year' : 'Godina rodjenja'} min={1900} max={2007} required className="border rounded p-2 flex-1 focus:outline-none focus:border-blue-600 transition" />
                        <select name="gender" required className="flex-1 border rounded p-2 focus:outline-none focus:border-blue-600 transition">
                            <option value="">{lang === 'en' ? 'Gender?' : 'Pol?'}</option>
                            <option value="Muški">{lang === 'en' ? 'Male' : 'Muški'}</option>
                            <option value="Ženski">{lang === 'en' ? 'Female' : 'Ženski'}</option>
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <input name="email" type="email" placeholder="e-mail" required className="flex-1 p-2 border rounded focus:outline-none focus:border-blue-600 transition" />
                        <input name="phone" type="tel" placeholder={lang === 'en' ? 'Phone' : 'Telefon'} required className="flex-1 p-2 border rounded focus:outline-none focus:border-blue-600 transition" />
                    </div>

                    <div className="flex gap-4">
                        <input type="password" name="password" placeholder={lang === 'en' ? 'Password' : 'Lozinka'} value={password} onChange={handlePasswordChange} required className="flex-1 p-2 border rounded focus:outline-none focus:border-blue-600 transition" />
                        <input type="password" name="confirmPassword" placeholder={lang === 'en' ? 'Repeat Password' : 'Ponovite lozinku'} value={confirmPassword} onChange={handleConfirmPasswordChange} required className="flex-1 p-2 border rounded focus:outline-none focus:border-blue-600 transition" />
                    </div>
                    <input hidden name="role" defaultValue={"worker"}></input>
                    <input hidden name="lang" defaultValue={lang}></input>

                    {passwordError && (
                        <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                            {passwordError}
                        </div>
                    )}

                    {message && (
                        <div className={`text-sm p-2 rounded ${message.toLowerCase().includes('uspešno') || message.toLowerCase().includes('successfully')
                            ? 'bg-green-50 text-green-600'
                            : 'bg-red-50 text-red-600'
                            }`}>
                            {message}
                        </div>
                    )}

                    <button type="submit" disabled={isLoading} className="bg-blue-600 py-2 px-4 cursor-pointer text-white rounded-2xl hover:bg-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLoading ? (lang === 'en' ? 'Registering...' : 'Registrovanje u toku...') : (lang === 'en' ? 'Register' : 'Registruj se')}
                    </button>

                </form>
            </div>
        </div>
    );
}