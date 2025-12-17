from statsmodels.tsa.holtwinters import ExponentialSmoothing


def forecast_sales(df, periods=6):
monthly_sales = df.groupby(df['SaleDate'].dt.to_period('M'))['Quantity'].sum()
monthly_sales.index = monthly_sales.index.to_timestamp()
model = ExponentialSmoothing(monthly_sales, trend='add', seasonal='add', seasonal_periods=12)
fit = model.fit()
forecast = fit.forecast(periods)
return forecast