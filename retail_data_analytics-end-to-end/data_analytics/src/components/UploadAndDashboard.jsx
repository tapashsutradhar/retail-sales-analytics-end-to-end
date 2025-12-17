import React, { useState, useMemo } from 'react'
const key = r.Date.toISOString().slice(0,10)
map.set(key, (map.get(key) || 0) + r.Price * r.Quantity)
})
return Array.from(map.entries()).sort((a,b)=>a[0].localeCompare(b[0])).map(([date,revenue])=>({date,revenue}))
}, [filtered])


const revenueByCategory = useMemo(() => {
const map = new Map()
filtered.forEach(r => map.set(r.Category, (map.get(r.Category)||0) + r.Price * r.Quantity))
return Array.from(map.entries()).map(([name,value]) => ({ name, value }))
}, [filtered])


const topProducts = useMemo(() => {
const map = new Map()
filtered.forEach(r => map.set(r.Product, (map.get(r.Product)||0) + r.Price * r.Quantity))
return Array.from(map.entries()).map(([product,revenue])=>({product,revenue})).sort((a,b)=>b.revenue-a.revenue).slice(0,10)
}, [filtered])


function uniqueValues(field){ return Array.from(new Set(rows.map(r => r[field] || 'All'))).filter(Boolean) }
function downloadCSV(){
const header = ['OrderID','Date','Customer','Product','Category','Quantity','Price','Region']
const lines = [header.join(',')].concat(filtered.map(r => [r.OrderID, r.Date.toISOString(), r.Customer, r.Product, r.Category, r.Quantity, r.Price, r.Region].join(',')))
const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a'); a.href = url; a.download = 'retail_filtered_export.csv'; a.click(); URL.revokeObjectURL(url)
}


const COLORS = ['#0088FE','#00C49F','#FFBB28','#FF8042','#A28FFF','#FF6B6B']


return (
<div>
<header className="flex items-center justify-between mb-6">
<h1 className="text-2xl font-semibold">Retail Analytics — Visual Insights</h1>
<div className="flex gap-2 items-center">
<label className="bg-white px-3 py-2 rounded shadow-sm cursor-pointer">
Upload CSV
<input type="file" accept=".csv" onChange={handleFile} className="hidden" />
</label>
<button onClick={downloadCSV} className="bg-indigo-600 text-white px-3 py-2 rounded">Export CSV</button>
</div>
</header>


{/* Filters, KPIs and charts omitted here for brevity — they are the same as in single-file app */}


<div className="bg-white p-4 rounded shadow-sm">
<div className="text-sm text-gray-500">Total revenue</div>
<div className="text-xl font-semibold">₹{kpis.totalRevenue.toFixed(2)}</div>
</div>


<div className="mt-6 h-72 bg-white p-4 rounded shadow-sm">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={revenueByDay}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="date" />
<YAxis />
<Tooltip />
<Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} dot={false} />
</LineChart>
</ResponsiveContainer>
</div>


</div>
)
}