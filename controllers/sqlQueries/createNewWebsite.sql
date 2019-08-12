INSERT INTO discounthero.websites (hostName, url, createdAt, isActive)
SELECT * FROM (SELECT ?, ?, now(), ?) AS tmp

WHERE NOT EXISTS (
    SELECT hostName FROM discounthero.websites WHERE hostName = ?
) LIMIT 1;