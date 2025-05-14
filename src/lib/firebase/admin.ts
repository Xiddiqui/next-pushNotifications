// src/lib/firebase/admin.ts
import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = {
    type: "service_account",
    project_id: "push-notifications-79eab",
    private_key_id: "966fbac88adcf0487b9ec2b6540210931c32d720",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCkwHUa9UaYPSbv\ng/VdvzQZy/JFx715r3IY6wH8sv4rqu55Mc3tBsDdlw5VuPxMUUlmobTkHWoN7pKF\nZsigYgFO39tkA1RzcUOLUh5BFHsQMMA0EkRUk0nYqYDJI8qboqSQ7rjmMpEB4piG\n58HmcAe13AkpmIOJYJahIoFxTIFNSogSyJsuCq5jLkvsn5/9dZN6SoseedVpszjr\nxiZE4B7k4lIJsV5IWnmMfZ/2fPGThVVJ84Ljsej7xRowYFjaGLZfZecov2NklbUS\n+V6TOxccF6iQk67ffFe0JhYIwFFDagWHqj8PsYc3IJenwdzT0XUDquz93cO1HB78\nAajRK1kjAgMBAAECggEADE6CEOb0hIfA4lBhokSXoDuvV84RVccoxzq61cULHnjw\nwmXZg5SnEIZpoDamxg6mZH+80vNtiifhkwx3/R8FCP7I1SI4iz0RNhWGxAbDIJT7\nrogUyZqNAB29TIkbZ9/Q2jCy6CMr2M+z5BPo1I1WzhtnJc/KN5da+SNqNuvnlr3V\nWLZ8QYaQ9ln7ntau0lmF6pyY+WnMcoHZ+XRvQl4n1S8UlD+/GsdYeOpCNy8IOhvL\nGodQyyT7jmwMWbpk6nT+BDQ0gTDlL4E/42tfbCdAgpOXPR4qEV6/RuR1L7Xdyq1n\no/HG+uErI+mem2C/cZk4WaPB/ju2wEUWLDXHZnlpdQKBgQDN5tHbpAsPIBjypD+U\n8lkiVWqcF3flP8R+9hEKKffGvAtpKVd3kOaiULx3RXdlpupOMBgkfIwz5hYZOLmV\nWxpqRJZMN2DEoqzyYzIdRJa66m8Kbl4gaM92LLLzecyhG544aYg0SV531ZuOhQoJ\nGZsUZdapryNjBAWS6K0PSl4ghwKBgQDM1n/3adkBIe67Xg+VBD4hfq/l7YbSXfLH\nsmKUknrVHzIsV9mA7VfMcouhXESd08PvlBiI3eqNto6sKPNq5Lvprd+LLpVt+S+s\n3yRe9LcZPeqENin9dBizh7mfKeSgrKmBsWuYlbyPXRZbUGdOJzVcQeR+MJizrnSt\nbEHSHtO1hQKBgQCb7pI/pJw7eDNsjrcYNfEK72UtkRhbpU9KV0/QQrhC6WY63fQ/\nuJzxj/Mq4JDrit0nGYUvHKORKk7SCwOA+N2oXQj173p5cDlJ15W8VJVSOPifDbZ7\nFOUIuhFMEpHF8QSB9GoSLv48Aqkr5dUTzzCC4h0PpHNIKWOPPmbRjaB7QQKBgQCi\ntKtXApvdu29fI1rrOkCD6Jad46uZBAkpuLd3Xlb1XN9Eu89ICr8X5dClrp3OY/ya\nHB/U77k1MdJoS+r2eJQPDQ6pBqqpfSryfRjt2CJsiXLz6/Y0nfhU+rVmCSfSvPOz\n0hMuU5pAomd0xwwX1ysaijiOR9mzuBpz+q7Z0aTG5QKBgQC92fCYjxzpAb1j6cLQ\nNDiEGUqAIoN7DinCtx2yHrtX1vI4IU63pqPWwxpIHlUHI/gaa4r7H30EE4dsyxM+\nsjIAeDRM0nHiUumVyFl1pX4fqifPXFh7F76RATM3smJVV+Gz2OphIwHe8Bv9UhJv\nh6X1+LDq6VVR+qi44OzascVbzA==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-fbsvc@push-notifications-79eab.iam.gserviceaccount.com",
    client_id: "106426140967037942992",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40push-notifications-79eab.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  }
  ;
  console.log('serviceAccount',serviceAccount)

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
    }),
  });
}

export const messaging = admin.messaging();
export default admin;