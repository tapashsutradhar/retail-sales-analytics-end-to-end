-- Remove duplicate sales
DELETE FROM Sales
WHERE SaleID NOT IN (
    SELECT MIN(SaleID)
    FROM Sales
    GROUP BY CustomerID, ProductID, SaleDate
);

-- Fix missing prices
UPDATE Products
SET Price = 0
WHERE Price IS NULL;

-- Check for nulls
SELECT *
FROM Customers
WHERE FirstName IS NULL OR LastName IS NULL;
