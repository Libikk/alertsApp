insert into products (productUrl, createdAt, isActive, websiteId)
select ?, now(), 0, websiteId
from websites
where hostName = ?