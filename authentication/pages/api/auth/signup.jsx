// pages/api/register.js

import { hashPassword } from '../../../lib/auth';
import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password); // Hash-eljük a jelszót

    // Ellenőrizzük, hogy az email már létezik-e az adatbázisban
    const [existingUser] = await pool.promise().query('SELECT * FROM auth WHERE email = ?', [email]);
    
    if (existingUser.length > 0) {
      // Ha az email már létezik, küldjünk vissza hibaüzenetet
      return res.status(400).json({ message: 'Az email cím már foglalt' });
    } else {
      // Ha az email még nem létezik, regisztráljuk az új felhasználót
      await pool.promise().query('INSERT INTO auth (email, password) VALUES (?, ?)', [email, hashedPassword]);
      
      // Sikeres regisztráció esetén visszaküldünk egy megerősítő üzenetet
      return res.status(201).json({ message: 'Sikeres regisztráció' });
    }
  } catch (error) {
    console.error('Hiba a regisztráció közben:', error);
    return res.status(500).json({ message: 'Szerverhiba' });
  }
}
