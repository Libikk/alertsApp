UPDATE users
SET password = @hashPass
WHERE email = @email
LIMIT 1;

SELECT userName
FROM users
WHERE email = @email
LIMIT 1;