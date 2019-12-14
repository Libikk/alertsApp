UPDATE users
SET userName = @userName
WHERE userId = @userId AND @userName IS NOT NULL;

UPDATE users
SET password = @password
WHERE userId = @userId AND @password IS NOT NULL;
