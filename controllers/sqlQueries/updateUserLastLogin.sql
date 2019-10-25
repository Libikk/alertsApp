UPDATE users
SET
    lastLoggedIn = now()
WHERE
    email = ?;