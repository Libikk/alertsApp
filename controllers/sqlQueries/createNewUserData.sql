INSERT INTO users (userName, email, password, createdAt, activationToken, active)
SELECT * FROM (SELECT @userName, @email, @hashPass, now(), @activationToken, 0) AS tmp

WHERE NOT EXISTS (
    SELECT userName
    FROM discounthero.users
    WHERE userName = @userName
        OR email = @email
) LIMIT 1;