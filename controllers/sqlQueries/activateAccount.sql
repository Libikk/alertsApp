UPDATE users SET active = 1
WHERE active = 0
AND activationToken = @token
LIMIT 1;

