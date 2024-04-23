import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        let client;
        let session;
        try {
          // Ellenőrzi, hogy lejárt-e a munkamenet
          client = await connectToDatabase();
          const usersCollection = client.db().collection("auth-users");

          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("No User Found!!");
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          // A munkamenet még mindig érvényes, ezért hitelesíti a felhasználót
          return { email: user.email };
        } catch (error) {
          if (error.email === "MongoExpiredSessionError") {
            // Ha a munkamenet lejárt, akkor létrehoz egy újat
            session = await createNewSession(client); // Új munkamenet létrehozása
            // Lehetséges, hogy később fel szeretné ezt használni egy központi helyen
            return { sessionId: session.id }; // Visszaadja az új munkamenet azonosítóját
          } else {
            // Egyéb hibák kezelése
            console.error("An error occurred:", error.message);
            throw error; // Újrahajítja a hibát, hogy a NextAuth kezelje
          }
        } finally {
          if (session) {
            session.endSession(); // Lezárja a munkamenetet
          }
          if (client) {
            client.close(); // Lezárja a MongoDB kapcsolatot
          }
        }
      },
    }),
  ],
  session: {
    jwt: true, // Beállítja az alapértelmezett JWT munkamenet használatát
  },
});
