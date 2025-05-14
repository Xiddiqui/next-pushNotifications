// import admin from 'firebase-admin';
// import { NextResponse } from 'next/server';

// // Initialize Firebase Admin SDK (do this once)
// // const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// // if (!admin.apps.length) {
// //   admin.initializeApp({
// //     credential: admin.credential.cert(serviceAccount),
// //   });
// // }


// try {
//     if (!admin.apps.length) {
//       const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      
//       admin.initializeApp({
//         credential: admin.credential.cert({
//           projectId: serviceAccount.project_id,
//           clientEmail: serviceAccount.client_email,
//           privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
//         }),
//       });
//     }
//   } catch (initError) {
//     console.error('Firebase initialization error:', initError);
//     return NextResponse.json(
//       { error: 'Server configuration error', details: initError.message },
//       { status: 500 }
//     );
//   }

// export async function POST(request) {
//   try {
//     const { token, title, body, data } = await request.json();

//     if (!token) {
//       return NextResponse.json(
//         { error: 'FCM token is required' },
//         { status: 400 }
//       );
//     }

//     const message = {
//       token: token,
//       notification: {
//         title: title || 'Default Title',
//         body: body || 'Default Message',
//       },
//       data: data || {},
//       apns: {
//         payload: {
//           aps: {
//             sound: 'default',
//             badge: 1,
//           },
//         },
//       },
//     };

//     const response = await admin.messaging().send(message);

//     return NextResponse.json({
//       success: true,
//       messageId: response,
//     });

//   } catch (error) {
//     console.error('Error sending message:', error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }


// app/api/send-notification/route.ts
// import admin from 'firebase-admin';
// import { NextResponse } from 'next/server';

// // Initialize Firebase outside the handler (but not at top level with returns)
// let firebaseInitialized = false;

// if (!firebaseInitialized && !admin.apps.length) {
//   try {
//     const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);
    
//     admin.initializeApp({
//       credential: admin.credential.cert({
//         projectId: serviceAccount.project_id,
//         clientEmail: serviceAccount.client_email,
//         privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
//       }),
//     });
//     firebaseInitialized = true;
//   } catch (error) {
//     console.error('Firebase initialization failed:', error);
//     // Don't return here - just let it fail when handling the request
//   }
// }

// export async function POST(request: Request) {
//   // Handle uninitialized Firebase
//   if (!admin.apps.length) {
//     return NextResponse.json(
//       { error: 'Firebase not initialized', details: 'Server configuration error' },
//       { status: 500 }
//     );
//   }

//   try {
//     const { token, title, body, data } = await request.json();

//     if (!token) {
//       return NextResponse.json(
//         { error: 'FCM token is required' },
//         { status: 400 }
//       );
//     }

//     const message = {
//       token,
//       notification: {
//         title: title || 'Default Title',
//         body: body || 'Default Message',
//       },
//       data: data || {},
//       apns: {
//         payload: {
//           aps: {
//             sound: 'default',
//             badge: 1,
//           },
//         },
//       },
//     };

//     const response = await admin.messaging().send(message);
//     return NextResponse.json({
//       success: true,
//       messageId: response,
//     });

//   } catch (error: any) {
//     console.error('Error sending message:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: error.message,
//         ...(error.code && { code: error.code }),
//       },
//       { status: 500 }
//     );
//   }
// }



// src/app/api/send-notification/route.ts
import { NextResponse } from 'next/server';
import { messaging } from '@/lib/firebase/admin';

export async function POST(req: Request) {
  try {
    if (!messaging) {
      throw new Error('Firebase not initialized');
    }

    const { token, title, body } = await req.json();

    const message = {
      token,
      notification: { title, body },
      apns: { payload: { aps: { sound: 'default' } } },
    };

    const response = await messaging.send(message);
    return NextResponse.json({ success: true, messageId: response });
    
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}