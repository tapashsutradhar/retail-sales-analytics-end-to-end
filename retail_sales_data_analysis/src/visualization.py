import matplotlib.pyplot as plt
import seaborn as sns


def plot_monthly_sales(df):
monthly_sales = df.groupby(df['SaleDate'].dt.to_period('M'))['Quantity'].sum()
monthly_sales.index = monthly_sales.index.to_timestamp()
monthly_sales.plot(kind='line', figsize=(10,5), title='Monthly Sales Trend')
plt.ylabel('Units Sold')
plt.show()




def plot_top_products(df, top_n=10):
top_products = df.groupby('ProductName')['Quantity'].sum().sort_values(ascending=False).head(top_n)
sns.barplot(x=top_products.values, y=top_products.index)
plt.title(f'Top {top_n} Products')
plt.show()