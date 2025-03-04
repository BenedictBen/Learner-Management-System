// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import LoginModal from "./LoginModal";
// import {
//   Avatar,
//   Button,
//   Flex,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
// } from "@chakra-ui/react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector, shallowEqual  } from "react-redux";
// import { RootState } from "@/lib/store";
// import { learnerLogout } from "@/features/learnerAuthSlice";
// import { usePathname } from "next/navigation";
// import { handleGoogleSignOut } from "@/actions/auth-actions";
// import { clearCourseState } from "@/features/courseSlice";
// import { learnerLoadSession } from "@/features/learnerAuthSlice";
// import { useLogout } from "@/hooks/learner/useAuth";

// const HomeNavbar = () => {
//   const [isOpen, setIsOpen] = React.useState<boolean>(false);
//   const { isAuthenticated, user } = useSelector(
//     (state: RootState) => state.learnerAuth,
//     shallowEqual
//   );

//   const { mutate: learnerLogout } = useLogout();
//   const dispatch = useDispatch();
 
//   const pathname = usePathname();

//   const handleLogout = async () => {
//     try {
//       learnerLogout(); 
//       // Uncomment if Google sign-out is implemented
//       // await handleGoogleSignOut();
//     } catch (error) {
//       console.error("Google sign-out error:", error);
//     }

//     // Triggers API logout and handles Redux/routing via onSuccess
//   };

//   const getDisplayName = (email?: string | null) => {
//     if (!email) return "Guest";
//     return email.split("@")[0];
//   };

//   // Type-safe initials function
//   const getInitials = (name: string) => {
//     return name
//       .split(/[._]/)
//       .slice(0, 2)
//       .map((part) => part[0]?.toUpperCase() || "")
//       .join("");
//   };

//   const router = useRouter();

//   const actualDisplayName = user ? (user.name ? user.name : getDisplayName(user.email)) : "Guest";

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeMenu = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full z-30 bg-white">
//       {/* Top Nav */}
//       <div className="bg-white flex items-center justify-between px-2 py-4 md:justify-around md:px-[0]">
//         <div className="flex items-center gap-5 cursor-pointer">
//           <div>
//             <Image alt="logo" src="/logo-L.png" width={80} height={20} />
//           </div>
//           <div className="hidden md:flex">
//             <Link href="/learner">
//               <h3
//                 className={`${
//                   pathname === "/learner"
//                     ? "text-casbBluePrimary"
//                     : "text-black"
//                 } hover:text-casbHover`}
//               >
//                 Home
//               </h3>
//             </Link>
//           </div>
//           <div className="hidden md:flex">
//             <Link href="/">
//               <h3
//                 className={`${
//                   pathname === "/" ? "text-casbBluePrimary" : "text-black"
//                 } hover:text-casbHover`}
//               >
//                 Courses
//               </h3>
//             </Link>
//           </div>
//         </div>

//         <div className="hidden md:block">
//           {isAuthenticated ? (
//             <Menu variant="unstyled">
//               <MenuButton
//                 _hover={{
//                   bg: "none",
//                   textDecoration: "none",
//                   boxShadow: "none",
//                   transform: "none",
//                 }}
//                 _active={{
//                   bg: "none",
//                 }}
//                 as={Button}
//                 variant="ghost"
//                 rounded="full"
//                 p={0}
//                 rightIcon={
//                   <Image
//                     src="/arrow-b.png"
//                     alt="Dropdown arrow"
//                     width={10}
//                     height={10}
//                   />
//                 }
//               >
//                 <Flex alignItems="center" gap={2}>
//                 <Avatar
//                     src={user && user.image ? user.image : undefined}
//                     name={actualDisplayName}
//                     bg="teal.500"
//                     color="white"
//                     size="sm"
//                     getInitials={(name) => getInitials(name)}
//                   />
//                    <span>{actualDisplayName}</span>
//                 </Flex>
//               </MenuButton>
//               <MenuList>
//                 <MenuItem
//                   minH="48px"
//                   onClick={() => router.push("/learner/dashboard")}
//                 >
//                   <div className="flex items-center  ">
//                     <div className="flex items-center gap-2 group cursor-pointer">
//                       <Image
//                         src="/hat.png"
//                         alt="hat"
//                         width={20}
//                         height={15}
//                         className="transition-all duration-300"
//                       />
//                       <span className="transition-colors duration-300 group-hover:text-casbSeaBlueSecondary">
//                         Portal
//                       </span>
//                     </div>
//                   </div>
//                 </MenuItem>
//                 <MenuItem
//                   minH="40px"
//                   onClick={handleLogout}
//                 >
//                   <div className="flex items-center">
//                     <div className="flex items-center gap-2 group cursor-pointer">
//                       <Image
//                         src="/log-in.png"
//                         width={20}
//                         height={15}
//                         alt="hat"
//                         className="transition-all duration-300"
//                       />
//                       <span className="transition-colors duration-300 group-hover:text-casbSeaBlueSecondary">
//                         logout
//                       </span>
//                     </div>
//                   </div>
//                 </MenuItem>
//               </MenuList>
//             </Menu>
//           ) : (
// <div className="hidden md:flex relative border-casbSeaBlueSecondary border rounded-sm hover:bg-casbBlueHover group transition-all duration-300">
//   <div className="flex gap-2 py-2 px-5 items-center">
//     <LoginModal />
//     <div className="relative m-0 w-[20px] h-[15px]">
//       {/* SVG Image with Color Transformation */}
//       <Image
//         src="/log-in.png"
//         alt="log-in"
//         width={20}
//         height={15}
//         className="absolute inset-0 transition-all duration-300 
//           [filter:invert(24%)_sepia(76%)_saturate(4157%)_hue-rotate(189deg)_brightness(95%)_contrast(102%)] 
//           group-hover:[filter:contrast(0)_brightness(1000%)]"
//       />
//     </div>
//   </div>
// </div>
//           )}
//         </div>

//         {/* Use Modal Component */}

//         {/* Hamburger icon for mobile */}
//         <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
//           <Image
//             src={isOpen ? "/x.svg" : "/menu.png"} // Toggle between hamburger and close icon
//             alt={isOpen ? "x" : "menu"}
//             width={20}
//             height={15}
//           />
//         </div>
//       </div>

//       {isOpen && (
//         <div className="fixed inset-0 z-10">
//           {/* Overlay Background */}
//           <div
//             className="fixed inset-0  opacity-10 z-10 cursor-pointer bg-white"
//             onClick={closeMenu}
//           ></div>

//           {/* Mobile Menu */}
//           <div className="fixed top-12 right-0 w-1/2 h-3/4 bg-white z-20 p-4 flex flex-col space-y-4 overflow-y-auto">
//             <Link href="/">
//               <h3 className="hover:text-casbHover">Home</h3>
//             </Link>
//             <Link href="/">
//               <h3 className="hover:text-casbHover">Courses</h3>
//             </Link>
//             {isAuthenticated ? (
//               <Menu variant="unstyled">
//                 <MenuButton
//                   _hover={{
//                     bg: "none",
//                     textDecoration: "none",
//                     boxShadow: "none",
//                     transform: "none",
//                   }}
//                   _active={{
//                     bg: "none",
//                   }}
//                   as={Button}
//                   variant="ghost"
//                   rounded="full"
//                   p={0}
//                   rightIcon={
//                     <Image
//                       src="/arrow-b.png"
//                       alt="Dropdown arrow"
//                       width={10}
//                       height={10}
//                     />
//                   }
//                 >
//                   <Flex alignItems="center" gap={2}>
//                     {/* <Avatar
//                       name={user ? getDisplayName(user.email) : ""}
//                       bg="teal.500"
//                       color="white"
//                       size="sm"
//                       getInitials={(name) => getInitials(name)}
//                     />
//                     <span>{user ? getDisplayName(user.email) : "Guest"}</span> */}
//                     <Avatar
//                     src={user && user.image ? user.image : undefined}
//                     name={actualDisplayName}
//                     bg="teal.500"
//                     color="white"
//                     size="sm"
//                     getInitials={(name) => getInitials(name)}
//                   />
//                    <span>{actualDisplayName}</span>
//                   </Flex>
//                 </MenuButton>
//                 <MenuList>
//                   <MenuItem
//                     minH="48px"
//                     onClick={() => router.push("/learner/dashboard")}
//                     // _hover={{ color: '#014273' }}
//                   >
//                     <div className="flex items-center  ">
//                       <div className="flex items-center gap-2 group cursor-pointer">
//                         <Image
//                           src="/hat.png"
//                           alt="hat"
//                           width={20}
//                           height={15}
//                           className="transition-all duration-300"
//                         />
//                         <span className="transition-colors duration-300 group-hover:text-casbSeaBlueSecondary">
//                           Portal
//                         </span>
//                       </div>
//                     </div>
//                   </MenuItem>
//                   <MenuItem
//                     minH="40px"
//                     onClick={handleLogout}
//                   >
//                     <div className="flex items-center">
//                       <div className="flex items-center gap-2 group cursor-pointer">
//                         <Image
//                           src="/log-in.png"
//                           width={20}
//                           height={15}
//                           alt="hat"
//                           className="transition-all duration-300"
//                         />
//                         <span className="transition-colors duration-300 group-hover:text-casbSeaBlueSecondary">
//                           logout
//                         </span>
//                       </div>
//                     </div>
//                   </MenuItem>
//                 </MenuList>
//               </Menu>
//             ) : (
//               <Link href="/">
//                 <div className="flex gap-2 w-28 py-2 px-5 items-center border-casbSeaBlueSecondary border rounded-sm active:bg-casbHover hover:bg-casbHover hover:text-white group">
//                   <LoginModal />
//                   <div className="relative group overflow-hidden m-0">
//                     <Image
//                       src="/log-in-blue.svg"
//                       alt="log-in-blue"
//                       width={20}
//                       height={15}
//                       className="object-fill transition-opacity duration-300 group-hover:opacity-0"
//                     />
//                     <Image
//                       src="/log-in.svg"
//                       alt="log-in-white"
//                       width={20}
//                       height={15}
//                       className="absolute inset-0 object-fill transition-opacity duration-300 opacity-0 group-hover:opacity-100"
//                     />
//                   </div>
//                 </div>
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomeNavbar;

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import LoginModal from "./LoginModal";
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "@/lib/store";
import { usePathname } from "next/navigation";
import { clearCourseState } from "@/features/courseSlice";
import { learnerLoadSession } from "@/features/learnerAuthSlice";
import { useLogout } from "@/hooks/learner/useAuth";

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.learnerAuth,
    shallowEqual
  );

  const logoutMutation = useLogout();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      logoutMutation.mutate();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getDisplayName = (email?: string | null) => {
    if (!email) return "Guest";
    return email.split("@")[0];
  };

  const getInitials = (name: string) => {
    return name
      .split(/[._]/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");
  };

  const actualDisplayName = user ? 
    (user.name ? user.name : getDisplayName(user.email)) : "Guest";

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="fixed top-0 left-0 w-full z-30 bg-white">
      <div className="bg-white flex items-center justify-between px-2 py-4 md:justify-around md:px-[0]">
        <div className="flex items-center gap-5 cursor-pointer">
          <Image alt="logo" src="/logo-L.png" width={80} height={20} />
          <div className="hidden md:flex">
            <Link href="/learner">
              <h3 className={`${
                pathname === "/learner" ? "text-casbBluePrimary" : "text-black"
              } hover:text-casbHover`}>
                Home
              </h3>
            </Link>
          </div>
          <div className="hidden md:flex">
            <Link href="/">
              <h3 className={`${
                pathname === "/" ? "text-casbBluePrimary" : "text-black"
              } hover:text-casbHover`}>
                Courses
              </h3>
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          {isAuthenticated ? (
            <Menu variant="unstyled">
              <MenuButton
                as={Button}
                variant="ghost"
                rounded="full"
                p={0}
                rightIcon={
                  <Image
                    src="/arrow-b.png"
                    alt="Dropdown arrow"
                    width={10}
                    height={10}
                  />
                }
              >
                <Flex alignItems="center" gap={2}>
                  <Avatar
                    src={user?.image}
                    name={actualDisplayName}
                    bg="teal.500"
                    color="white"
                    size="sm"
                    getInitials={getInitials}
                  />
                  <span>{actualDisplayName}</span>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => router.push("/learner/dashboard")}>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <Image src="/hat.png" alt="hat" width={20} height={15} />
                    <span className="group-hover:text-casbSeaBlueSecondary">
                      Portal
                    </span>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleLogout} isDisabled={logoutMutation.isPending}>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <Image src="/log-in.png" alt="logout" width={20} height={15} />
                    <span className="group-hover:text-casbSeaBlueSecondary">
                      {logoutMutation.isPending ? "Logging out..." : "Logout"}
                    </span>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <div className="hidden md:flex relative border-casbSeaBlueSecondary border rounded-sm hover:bg-casbBlueHover group transition-all duration-300">
              <div className="flex gap-2 py-2 px-5 items-center">
                <LoginModal />
                <div className="relative m-0 w-[20px] h-[15px]">
                  <Image
                    src="/log-in.png"
                    alt="log-in"
                    width={20}
                    height={15}
                    className="absolute inset-0 transition-all duration-300 
                      [filter:invert(24%)_sepia(76%)_saturate(4157%)_hue-rotate(189deg)_brightness(95%)_contrast(102%)] 
                      group-hover:[filter:contrast(0)_brightness(1000%)]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <Image
            src={isOpen ? "/x.svg" : "/menu.png"}
            alt={isOpen ? "Close menu" : "Open menu"}
            width={20}
            height={15}
          />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-10">
          <div className="fixed inset-0 bg-white opacity-10 z-10 cursor-pointer" onClick={closeMenu} />
          <div className="fixed top-12 right-0 w-1/2 h-3/4 bg-white z-20 p-4 flex flex-col space-y-4">
            <Link href="/learner" onClick={closeMenu}>
              <h3 className="hover:text-casbHover">Home</h3>
            </Link>
            <Link href="/" onClick={closeMenu}>
              <h3 className="hover:text-casbHover">Courses</h3>
            </Link>
            {isAuthenticated ? (
              <Menu variant="unstyled">
                <MenuButton
                  as={Button}
                  variant="ghost"
                  rounded="full"
                  p={0}
                  rightIcon={
                    <Image
                      src="/arrow-b.png"
                      alt="Dropdown arrow"
                      width={10}
                      height={10}
                    />
                  }
                >
                  <Flex alignItems="center" gap={2}>
                    <Avatar
                      src={user?.image}
                      name={actualDisplayName}
                      bg="teal.500"
                      color="white"
                      size="sm"
                      getInitials={getInitials}
                    />
                    <span>{actualDisplayName}</span>
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => { router.push("/learner/dashboard"); closeMenu(); }}>
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <Image src="/hat.png" alt="hat" width={20} height={15} />
                      <span className="group-hover:text-casbSeaBlueSecondary">Portal</span>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleLogout} isDisabled={logoutMutation.isPending}>
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <Image src="/log-in.png" alt="logout" width={20} height={15} />
                      <span className="group-hover:text-casbSeaBlueSecondary">
                        {logoutMutation.isPending ? "Logging out..." : "Logout"}
                      </span>
                    </div>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link href="/" onClick={closeMenu}>
                <div className="flex gap-2 w-28 py-2 px-5 items-center border-casbSeaBlueSecondary border rounded-sm hover:bg-casbHover hover:text-white group">
                  <LoginModal />
                  <div className="relative group overflow-hidden m-0">
                    <Image
                      src="/log-in-blue.svg"
                      alt="log-in-blue"
                      width={20}
                      height={15}
                      className="object-fill transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <Image
                      src="/log-in.svg"
                      alt="log-in-white"
                      width={20}
                      height={15}
                      className="absolute inset-0 object-fill transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeNavbar;