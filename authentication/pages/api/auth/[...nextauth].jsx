import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import pool from "../../../lib/db";

export default NextAuth({
  sessions: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        // Próbáljuk meg lekérni az adott email című felhasználót az auth táblából
        const [auth] = await pool
          .promise()
          .query("SELECT * FROM auth WHERE email = ? ", [email]);

        // Ellenőrizzük, hogy az auth tömb üres-e vagy sem
        if (auth.length === 0) {
          // Ha az auth tömb üres, akkor a felhasználó nem létezik az adatbázisban
          throw new Error("User not found");
        }

        // Ellenőrizzük a jelszó egyezőségét
        const isValid = await verifyPassword(password, auth[0].password);
        console.log(isValid);
        console.log(password);
        console.log(auth[0].password);
       
        if (!isValid) {
          // Ha a jelszó nem egyezik, hibát dobunk
          throw new Error("Invalid password");
        }

        // Ha minden ellenőrzés sikeres, visszaadjuk a felhasználó adatait
        return { email: auth[0].email };
      },
    }),
  ],
});
