import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

st.title("Retail Sales Dashboard")

# Load data
df = pd.read_csv('../data/processed/retail_sales_cleaned.csv')
df['SaleDate'] = pd.to_datetime(df['SaleDate'])

# Sidebar
category_filter = st.sidebar.multiselect(
    "Select Category",
    options=df['Category'].unique(),
    default=df['Category'].unique()
)

filtered_df = df[df['Category'].isin(category_filter)]

# KPIs
total_sales = (filtered_df['Quantity']*filtered_df['Price']).sum()
total_orders = filtered_df['SaleID'].nunique()
st.metric("Total Sales ($)", total_sales)
st.metric("Total Orders", total_orders)

# Monthly Sales Trend
monthly_sales = filtered_df.groupby(filtered_df['SaleDate'].dt.to_period('M'))['Quantity'].sum()
monthly_sales.index = monthly_sales.index.to_timestamp()
st.line_chart(monthly_sales)

# Top Products
top_products = filtered_df.groupby('ProductName')['Quantity'].sum().sort_values(ascending=False).head(10)
st.bar_chart(top_products)
