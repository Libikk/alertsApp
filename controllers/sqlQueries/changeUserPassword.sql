UPDATE users
SET password = ?
WHERE email = ?
LIMIT 1;