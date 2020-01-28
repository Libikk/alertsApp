UPDATE users
SET
    pushNotificationsToken = @token
WHERE
    userId = @userId;