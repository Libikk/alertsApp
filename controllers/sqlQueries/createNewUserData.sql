insert into users (userName, email, password, createdAt)
SELECT * FROM (SELECT @userName, @email, @hashPass, now()) AS tmp

WHERE NOT EXISTS (
    SELECT userName
    FROM discounthero.users
    WHERE userName = @userName
        OR email = @email
) LIMIT 1;