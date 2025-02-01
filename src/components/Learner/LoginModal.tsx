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
import LoginForms from "./LoginForms";
import ForgetPassword from "./ForgetPassword";
import SignUpForm from "./SignUpForm";
import ResetPassword from "./ResetPassword";
import OtpVerification from "./OtpVerification";

const LoginModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  // Detect screen size
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  // Close functions
  const closeVerification = () => setIsVerificationOpen(false);
  const closeSignup = () => setIsSignupOpen(false);
  const closeForgetPassword = () => setIsForgetPasswordOpen(false);
  const closeResetPassword = () => setIsResetPasswordOpen(false);

  // Open functions
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

  // Fix: Prevent default and ensure modal opens
  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen();
  };

  const renderLoginModal = () => {
    if (isLargeScreen) {
      return (
        <Popover placement="bottom" closeOnBlur={true}>
          <PopoverTrigger>
            <Button type="button" className="text-casbBluePrimary group-hover:text-white" variant="unstyled" size="base">
              Login
            </Button>
          </PopoverTrigger>
          <PopoverContent width="400px">
            <PopoverBody>
              {isForgetPasswordOpen ? (
                isResetPasswordOpen ? (
                  <ResetPassword onClose={closeResetPassword} onSignupClick={openSignup} />
                ) : (
                  <ForgetPassword onClose={closeForgetPassword} onResetPasswordClick={openResetPassword} openSignup={openSignup} />
                )
              ) : isSignupOpen ? (
                isVerificationOpen ? (
                  <OtpVerification onClose={closeVerification} onVerify={handleVerify} />
                ) : (
                  <SignUpForm onClose={closeSignup} onVerificationClick={openVerification} />
                )
              ) : (
                <LoginForms onForgotPasswordClick={openForgetPassword} onSignupClick={openSignup} onClose={onClose} />
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      );
    } else {
      return (
        <>
          <Button
            type="button"
            className="text-casbBluePrimary group-hover:text-white"
            variant="unstyled"
            size="base"
            onClick={handleOpen} // Ensure modal opens properly
          >
            Login
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent width={{ base: "90%", sm: "80%", md: "400px" }} maxWidth="400px" borderRadius="lg">
              <ModalBody p={4}>
                {isForgetPasswordOpen ? (
                  isResetPasswordOpen ? (
                    <ResetPassword onClose={closeResetPassword} onSignupClick={openSignup} />
                  ) : (
                    <ForgetPassword onClose={closeForgetPassword} onResetPasswordClick={openResetPassword} openSignup={openSignup} />
                  )
                ) : isSignupOpen ? (
                  isVerificationOpen ? (
                    <OtpVerification onClose={closeVerification} onVerify={handleVerify} />
                  ) : (
                    <SignUpForm onClose={closeSignup} onVerificationClick={openVerification} />
                  )
                ) : (
                  <LoginForms onForgotPasswordClick={openForgetPassword} onSignupClick={openSignup} onClose={onClose} />
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      );
    }
  };

  return <>{renderLoginModal()}</>;
};

export default LoginModal;
