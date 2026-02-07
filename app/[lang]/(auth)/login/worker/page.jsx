'use client'

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { passwordRecover } from "../../../../../lib/fetchers/fetch";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState(null);
  const router = useRouter();
  const { lang } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(lang === 'en' ? 'Wrong email or password' : 'Pogrešan email ili lozinka')
        return
      }

      router.push(`/${lang}`)
      router.refresh()
    } catch (err) {
      setError(lang === 'en' ? 'An error occurred' : 'Došlo je do greške')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setUserEmail(e.target.value);
  }

  const passwordReset = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/forgot-password', {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ email: userEmail }),
    });

    const message = await res.json();
    setRecoveryMessage(message.message);
  }

  return (
    <section className=' flex flex-col items-center justify-center w-full h-screen'>
      <h2 className="text-2xl font-bold mb-6 max-w-3xl mx-auto text-gray-700 px-4">
        {resetPassword ? '' : (lang === 'en' ? 'Ready for a new job? Log in to the site and view the latest job offers. Find an engagement that suits you and connect with employers. Everything in one place.' : 'Spreman za novi posao? Uloguj se na sajt i pogledaj najnovije ponude poslova. Pronađi angažman koji ti odgovara i poveži se sa poslodavcima. Sve je na jednom mestu.')}
      </h2>
      <div className=" flex flex-col items-center  bg-gray-50">
        <div className="w-90 bg-white rounded-lg shadow-md p-8">
          {
            recoveryMessage === 'send' ?
              <div className='h-[231px] w-full flex items-center justify-center font-bold pl-4'>
                <span>{lang === 'en' ? 'We have sent you a password recovery link to your email address.' : 'Poslali smo vam link za oporavak naloga na vašu email adresu.'}</span>
              </div>


              : resetPassword ? (
                <form onSubmit={passwordReset}>
                  <div className='w-90 flex flex-col items-center h-[231px]'>
                    <h2 className='text-3xl pb-8'>{lang === 'en' ? 'Account Recovery' : 'Oporavak naloga'}</h2>
                    <span className='pb-5 text-xl'>{lang === 'en' ? 'Enter email' : 'Unesite email'}</span>
                    <input type="email" required onChange={handleChange} className='w-full px-3 py-2 border rounded-lg focus:outline-blue-400' />
                    <div className='pt-5'>
                      <button type='submit' className='px-3 py-2 bg-blue-500 text-white rounded-2xl cursor-pointer'>{lang === 'en' ? 'Send' : 'Posalji'}</button>
                    </div>
                  </div>
                  <button className='px-2 py-1 bg-blue-500 text-xs text-white rounded-xl cursor-pointer active:bg-blue-400' onClick={(e) => {
                    e.preventDefault();
                    setResetPassword(false)
                  }}>{lang === 'en' ? 'Back' : 'Nazad'}</button>
                </form>

              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                      {error}
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">{lang === 'en' ? 'Password' : 'Lozinka'}</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                  >
                    {loading ? (lang === 'en' ? 'Please wait' : 'Molimo sačekajte') : (lang === 'en' ? 'Log in' : 'Uloguj se')}
                  </button>
                  <div className='pt-3 cursor-pointer underline' onClick={() => setResetPassword(prev => !prev)}>
                    {lang === 'en' ? 'Forgot password?' : 'Zaboravili ste lozinku ?'}
                  </div>
                </form>
              )
          }
        </div>
      </div>
    </section>
  )
}