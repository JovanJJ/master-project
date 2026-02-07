import PasswordReset from "./components/PasswordReset";
import { Suspense } from "react";

export default async function Page({ params }) {
  const { lang } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PasswordReset lang={lang} />
    </Suspense>
  )
}

