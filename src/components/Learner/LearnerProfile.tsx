import { FieldIcons } from '@/lib/FormsIcons';
import { FormValues } from '@/lib/types';
import { Avatar, Divider } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const LearnerProfile = () => {
  const [focusNewPassword, setFocusNewPassword] = useState<boolean>(false);
  const [focusoldPassword, setFocusoldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showoldPassword, setShowoldPassword] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleNewPasswordVisibility = (): void => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleoldPasswordVisibility = (): void => {
    setShowoldPassword(!showoldPassword);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const onSubmit = (data: FormValues) => {
    console.log('Update Data', data);
    setIsEditing(false); // Reset isEditing only after successful update
    reset();
  };

  const newPassword = watch('newPassword');
  const oldPassword = watch('oldPassword');

  return (
    <div>
      <div className="mt-4">
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <div className="flex items-center justify-center flex-col md:flex-row gap-1">
            <Avatar name="Kent Dodds" size={['md', 'lg', 'xl']} />
            <div></div>
          </div>
          <div className="flex flex-col mt-4 items-center gap-3 md:flex-row">
            <div>
              <h1 className="text-casbDisabled">John Doe</h1>
              <p className="font-semi-bold">Johndoe@gmail.com</p>
            </div>
            <Divider orientation="vertical" height="40px" mx={4} />
            <div>
              <h1 className="text-casbDisabled">Location</h1>
              <p className="font-semi-bold">Kumasi</p>
            </div>
            <Divider orientation="vertical" height="40px" mx={4} />
            <div>
              <h1 className="text-casbDisabled">Gender</h1>
              <p className="font-semi-bold">Male</p>
            </div>
            <Divider orientation="vertical" height="40px" mx={4} />
            <div>
              <h1 className="text-casbDisabled">Phone</h1>
              <p className="font-semi-bold">+23341002402</p>
            </div>
            <Divider orientation="vertical" height="40px" mx={4} />
          </div>
        </div>
        <Divider orientation="horizontal" height="40px" mx={1} className="mb-8" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6">
        {/* Old Password Field */}
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-4">
          <div key="oldPassword" className="relative">
            <div className="relative flex items-center">
              <input
                type={showoldPassword ? 'text' : 'password'}
                placeholder="Old Password"
                {...register('oldPassword', {
                  required: 'Old Password is required',
                })}
                onFocus={() => setFocusoldPassword(true)}
                onBlur={() => setFocusoldPassword(false)}
                disabled={!isEditing}
                className={`border p-2 w-full pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
                  oldPassword
                    ? 'border-green-500'
                    : errors.oldPassword
                    ? 'border-red-500'
                    : 'border-gray-300'
                } ${!isEditing && 'cursor-not-allowed'}`}
              />
              {FieldIcons.password && (
                <Image
                  src={FieldIcons.password as string}
                  alt="password"
                  width={20}
                  height={20}
                  className="absolute left-2 top-5 transform -translate-y-1/2"
                  style={{
                    filter: focusoldPassword
                      ? 'invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)'
                      : errors.oldPassword
                      ? 'invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)'
                      : oldPassword
                      ? 'invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)'
                      : 'invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
                  }}
                />
              )}
              {oldPassword && (
                <Image
                  src={FieldIcons.successIcon as string}
                  alt="Success"
                  width={20}
                  height={20}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
              {errors.oldPassword && (
                <>
                  <Image
                    src={FieldIcons.errorIcon as string}
                    alt="Error"
                    width={20}
                    height={20}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                </>
              )}

              {/* Toggle Password Visibility Icon */}
              <div
                onClick={toggleoldPasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <Image
                  src={showoldPassword ? (FieldIcons.eye_close as string) : (FieldIcons.eye as string)}
                  alt={showoldPassword ? 'Hide Password' : 'Show Password'}
                  width={20}
                  height={20}
                />
              </div>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center">{errors.oldPassword.message}</p>
            )}
          </div>

          {/* New Password Field */}
          <div key="NewPassword" className="relative">
            <div className="relative flex items-center">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="New Password"
                {...register('newPassword', {
                  required: 'Password is required',
                  validate: (value) =>
                    value !== oldPassword || 'New password should not match the old password',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                  },
                })}
                onFocus={() => setFocusNewPassword(true)}
                onBlur={() => setFocusNewPassword(false)}
                disabled={!isEditing}
                className={`border p-2 w-full pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
                  newPassword
                    ? 'border-green-500'
                    : errors.newPassword
                    ? 'border-red-500'
                    : 'border-gray-300'
                } ${!isEditing && 'cursor-not-allowed'}`}
              />
              {FieldIcons.password && (
                <Image
                  src={FieldIcons.password as string}
                  alt="password"
                  width={20}
                  height={20}
                  className="absolute left-2 top-5 transform -translate-y-1/2"
                  style={{
                    filter: focusNewPassword
                      ? 'invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)'
                      : errors.newPassword
                      ? 'invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)'
                      : newPassword
                      ? 'invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)'
                      : 'invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
                  }}
                />
              )}
              {newPassword && (
                <Image
                  src={FieldIcons.successIcon as string}
                  alt="Success"
                  width={20}
                  height={20}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
              {errors.newPassword && (
                <>
                  <Image
                    src={FieldIcons.errorIcon as string}
                    alt="Error"
                    width={20}
                    height={20}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                </>
              )}

              {/* Toggle Password Visibility Icon */}
              <div
                onClick={toggleNewPasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <Image
                  src={showNewPassword ? (FieldIcons.eye_close as string) : (FieldIcons.eye as string)}
                  alt={showNewPassword ? 'Hide Password' : 'Show Password'}
                  width={20}
                  height={20}
                />
              </div>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Update Button */}
          {isEditing && (
            <div className="text-casbBluePrimary decoration-casbBluePrimary underline">
              <button className="underline">Update</button>
            </div>
          )}
        </div>

        {/* Back and Edit Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-12">
          <div className="flex items-center justify-center cursor-pointer text-black py-3 rounded w-52 bg-casbGreyPrimary">
            <Image src="/back.png" alt="back" width={20} height={20} className="text-white" />
            <button type="submit" className="">
              Back
            </button>
          </div>
          <div className="flex items-center justify-center cursor-pointer text-white py-3 rounded w-52 bg-casbBluePrimary">
            <button type="submit" className="" onClick={handleEditClick}>
              Edit
            </button>
            <Image
              src="/chevron-right-white.png"
              alt="chevron"
              width={20}
              height={20}
              className="text-white"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LearnerProfile;