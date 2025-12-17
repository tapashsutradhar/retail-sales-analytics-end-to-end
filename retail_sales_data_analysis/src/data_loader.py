import pandas as pd


def load_data():
customers = pd.read_csv('../data/raw/customers.csv')
products = pd.read_csv('../data/raw/products.csv')
sales = pd.read_csv('../data/raw/retail_sales_raw.csv')
return sales, customers, products




def merge_data(sales, customers, products):
df = sales.merge(customers, on='CustomerID').merge(products, on='ProductID')
return df