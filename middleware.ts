import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// نقوم بتعريف الـ middleware وتصديره كـ default
const { auth } = NextAuth(authConfig);
export default auth; 

// إذا كنت تحتاج استخدام 'auth' في أماكن أخرى كـ named export
export { auth as middleware };
