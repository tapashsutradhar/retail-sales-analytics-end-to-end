import pandas as pd


def clean_data(df):
df['Price'].fillna(0, inplace=True)
df.drop_duplicates(subset=['CustomerID','ProductID','SaleDate'], inplace=True)
df['SaleDate'] = pd.to_datetime(df['SaleDate'])
return df