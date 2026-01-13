import PasswordReset from "./components/PasswordReset";
import { Suspense } from "react";

export default function Page () {
 <Suspense fallback={<div>Loading...</div>}>
      <PasswordReset />
    </Suspense>
}

