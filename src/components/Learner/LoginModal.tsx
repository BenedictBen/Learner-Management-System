"use client";

import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Spinner } from "@chakra-ui/react";

// Dynamically import client-side only components
const LoginForms = dynamic(
  () => import("./LoginForms"),
  { 
    ssr: false,
    loading: () => <Spinner size="sm" />
  }
);

const ForgetPassword = dynamic(
  () => import("./ForgetPassword"),
  { ssr: false }
);

const SignUpForm = dynamic(
  () => import("./SignUpForm"),
  { ssr: false }
);

const ResetPassword = dynamic(
  () => import("./ResetPassword"),
  { ssr: false }
);

const OtpVerification = dynamic(
  () => import("./OtpVerification"),
  { ssr: false }
);

const LoginModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  // State management functions remain the same
  const closeVerification = () => setIsVerificationOpen(false);
  const closeSignup = () => setIsSignupOpen(false);
  const closeForgetPassword = () => setIsForgetPasswordOpen(false);
  const closeResetPassword = () => setIsResetPasswordOpen(false);

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsForgetPasswordOpen(false);
    setIsResetPasswordOpen(false);
  };

  const openForgetPassword = () => {
    setIsForgetPasswordOpen(true);
    setIsSignupOpen(false);
    setIsResetPasswordOpen(false);
  };

  const openResetPassword = () => {
    setIsResetPasswordOpen(true);
    setIsForgetPasswordOpen(false);
    setIsSignupOpen(false);
  };

  const openVerification = () => setIsVerificationOpen(true);

  const handleVerify = (code: string) => {
    console.log("Verification Code:", code);
    closeVerification();
  };

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen();
  };

  const renderContent = () => {
    if (isResetPasswordOpen) {
      return <ResetPassword onClose={closeResetPassword} onSignupClick={openSignup} />;
    }
    if (isForgetPasswordOpen) {
      return (
        <ForgetPassword 
          onClose={closeForgetPassword} 
          onResetPasswordClick={openResetPassword} 
          openSignup={openSignup} 
        />
      );
    }
    if (isSignupOpen) {
      return isVerificationOpen ? (
        <OtpVerification onClose={closeVerification} onVerify={handleVerify} />
      ) : (
        <SignUpForm onClose={closeSignup} onVerificationClick={openVerification} />
      );
    }
    return <LoginForms 
             onForgotPasswordClick={openForgetPassword} 
             onSignupClick={openSignup} 
             onClose={onClose} 
           />;
  };

  const renderLoginModal = () => {
    if (isLargeScreen) {
      return (
        <Popover placement="bottom" closeOnBlur={true}>
          <PopoverTrigger>
            <Button 
              type="button" 
              className="text-casbBluePrimary group-hover:text-white" 
              variant="unstyled" 
              size="base"
            >
              Login
            </Button>
          </PopoverTrigger>
          <PopoverContent width="400px">
            <PopoverBody>
              {renderContent()}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      );
    }

    return (
      <>
        <Button
          type="button"
          className="text-casbBluePrimary group-hover:text-white"
          variant="unstyled"
          size="base"
          onClick={handleOpen}
        >
          Login
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent width={{ base: "90%", sm: "80%", md: "400px" }} maxWidth="400px" borderRadius="lg">
            <ModalBody p={4}>
              {renderContent()}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return <>{renderLoginModal()}</>;
};

export default LoginModal;