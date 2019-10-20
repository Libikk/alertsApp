SELECT userId,
case active WHEN '0' THEN 0 WHEN '1' THEN 1 END AS 'isActive',
email,
lastLoggedIn,
userName
FROM users
WHERE email = ?
LIMIT 1;