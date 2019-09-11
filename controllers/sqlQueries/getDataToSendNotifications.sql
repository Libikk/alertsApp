SELECT
  prod.productId,
  userProd.userId,
  prod.productUrl,
  website.hostName,
  website.url as "hostNameUrl",
  prod.imageUrl,
  prod.productName,
  userNotif.emailNotifications,
  userNotif.mobileAppNotifications,
  userNotif.smsNotifications
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

