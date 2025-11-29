// This route is replaced by simplified auth routes
// import { betterAuth } from 'better-auth';
// import { db } from '../../../../db';

// const auth = betterAuth({
//   database: db,
//   users: {
//     email: true,
//     password: true,
//     name: true,
//   },
//   emailAndPassword: {
//     enabled: true,
//   },
//   session: {
//     expiresIn: '7d',
//   },
//   pages: {
//     signIn: '/login',
//     signUp: '/login',
//     home: '/dashboard',
//   },
// });

// export const { GET, POST } = auth.handlers;