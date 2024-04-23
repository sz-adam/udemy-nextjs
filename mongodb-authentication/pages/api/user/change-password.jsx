import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    // Ellenőrzi, hogy a kérés metódusa PATCH-e
    return; // Ha nem, akkor kilép a függvényből
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    // van-e munkamenet ? Ha nincs, akkor hibát ad vissza
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("auth-users");

  const user = await usersCollection.findOne({ email: userEmail }); // felhasználó az email címe alapján

  if (!user) {
    // Ellenőrzi, hogy talált-e felhasználót
    res.status(404).json({ message: "User not found." }); // Ha nem, akkor hibát ad vissza
    client.close();
    return;
  }

  const currentPassword = user.password; // felhasználó jelszava az adatbázisból

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword); // Összehasonlítja az új és a régi jelszavakat

  if (!passwordsAreEqual) {
    // Ellenőrzi, hogy a jelszavak megegyeznek-e
    res.status(403).json({ message: "Invalid password." }); // Ha nem, akkor hibát ad vissza
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword); // Hasheli az új jelszót

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  ); // Frissíti a felhasználó jelszavát az adatbázisban

  client.close();
  res.status(200).json({ message: "Password updated!" });
}

export default handler;
