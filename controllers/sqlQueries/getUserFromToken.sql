SELECT
case active when '0' then 0 when '1' then 1 end AS "isActive"
FROM users
where activationToken = @token