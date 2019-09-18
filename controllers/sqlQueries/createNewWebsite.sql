INSERT INTO discounthero.websites (hostName, url, createdAt, isActive)
SELECT * FROM (SELECT @host, @hostUrl, now(), 0) AS tmp

WHERE NOT EXISTS (
    SELECT hostName FROM discounthero.websites WHERE hostName = @host
) LIMIT 1;