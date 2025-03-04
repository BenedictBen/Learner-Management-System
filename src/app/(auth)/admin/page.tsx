// "use client"
// import { ReactNode } from 'react';
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect } from "react";

// type PageProps = {
//   children?: ReactNode; // Optional children prop
// };

// export default function AdminPage ({ children }: PageProps) {
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     if (pathname === "/admin") {
//       router.replace("/admin/dashboard");
//     }
//   }, [pathname, router]);


//   return (
//     <div> 
//       {children}
//     </div>
//   )
// }

"use client"
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  // const router = useRouter();
  // const pathname = usePathname();

  // useEffect(() => {
  //   if (pathname === "/admin") {
  //     router.replace("/admin/dashboard");
  //   }
  // }, [pathname, router]);

  return <div />; // Empty fragment since we're redirecting
}