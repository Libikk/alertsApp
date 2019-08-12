INSERT INTO discounthero.websites (hostName, url)
SELECT * FROM (SELECT ?, ?) AS tmp

WHERE NOT EXISTS (
    SELECT hostName FROM discounthero.websites WHERE hostName = ?
) LIMIT 1;