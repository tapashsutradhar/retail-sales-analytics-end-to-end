-- Total sales per month
SELECT DATE_FORMAT(SaleDate, '%Y-%m') AS Month, SUM(Quantity*Price) AS TotalSales
FROM Sales
JOIN Products USING(ProductID)
GROUP BY Month
ORDER BY Month;

-- Top 10 selling products
SELECT ProductName, SUM(Quantity) AS TotalUnitsSold
FROM Sales
JOIN Products USING(ProductID)
GROUP BY ProductName
ORDER BY TotalUnitsSold DESC
LIMIT 10;

-- Customers with highest spend
SELECT CONCAT(FirstName,' ',LastName) AS Customer, SUM(Quantity*Price) AS TotalSpent
FROM Sales
JOIN Customers USING(CustomerID)
JOIN Products USING(ProductID)
GROUP BY Customer
ORDER BY TotalSpent DESC
LIMIT 10;
