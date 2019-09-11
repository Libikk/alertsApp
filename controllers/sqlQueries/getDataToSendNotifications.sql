SELECT
  prod.productId,
  userProd.userId,
  prod.productUrl,
  website.hostName,
  website.url AS "hostNameUrl",
  prod.imageUrl,
  prod.productName,
  CASE userNotif.emailNotifications WHEN 0 THEN 0 WHEN 1 THEN 1 END AS "emailNotifications",
  CASE userNotif.mobileAppNotifications  WHEN 0 THEN 0 WHEN 1 THEN 1 END AS "mobileAppNotifications",
  CASE userNotif.smsNotifications  WHEN 0 THEN 0 WHEN 1 THEN 1 END AS "smsNotifications",
  user.email
FROM
  discounthero.products AS prod
  LEFT JOIN discounthero.scans scan ON scan.scanid = (
    SELECT
      scanLoop.scanid
    FROM
      discounthero.scans AS scanLoop
    WHERE
      scanLoop.productid = prod.productid
    ORDER BY
      scanLoop.createdat DESC
    LIMIT 1
  )
  JOIN discounthero.websites website on website.websiteId = prod.websiteId
  JOIN discounthero.usersProducts userProd on userProd.productId = prod.productId
  JOIN discounthero.usersNotifications userNotif on userNotif.userId = userProd.userId
  JOIN discounthero.users user on user.userid = userProd.userId
WHERE
  scan.ispromo
  AND website.isActive = 1
  AND prod.isActive = 1
  AND DATEDIFF(NOW(), 
	 COALESCE((
		SELECT 
			notifLoop.sentNotificationDate 
        FROM 
			notifications notifLoop
        WHERE 
			notifLoop.userId = userProd.userId AND notifLoop.productId = prod.productId
        ORDER BY 
			notifLoop.sentNotificationDate DESC
		LIMIT 1
  ), '1999-10-10')) > ?
  
