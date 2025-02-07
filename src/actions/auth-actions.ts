// src/actions/auth-actions.ts


'use server';

import { signIn } from '@/googleAuth/googleAuth';
import {signOut} from "@/googleAuth/googleAuth"

export async function handleGoogleSignIn() {
  await signIn('google');
}


export async function handleGoogleSignOut(){
  await signOut();
}