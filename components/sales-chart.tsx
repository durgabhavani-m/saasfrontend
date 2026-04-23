"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { apiUrl } from "@/lib/api";

interface AnalyticsData {
  date: string;
  sales: number;
  inventory: number;
}

const FALLBACK_ANALYTICS_DATA: AnalyticsData[] = [
  { date: "Week 1", sales: 2800, inventory: 1450 },
  { date: "Week 2", sales: 3200, inventory: 1320 },
  { date: "Week 3", sales: 2950, inventory: 1210 },
  { date: "Week 4", sales: 3600, inventory: 1150 },
  { date: "Week 5", sales: 3400, inventory: 1080 },
  { date: "Week 6", sales: 3850, inventory: 980 },
];

export default function SalesChart() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(apiUrl("analytics"));
        if (!res.ok) {
          setAnalyticsData(FALLBACK_ANALYTICS_DATA);
          setUsingFallback(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        const normalized = Array.isArray(data) ? data : [];
        if (normalized.length === 0) {
          setAnalyticsData(FALLBACK_ANALYTICS_DATA);
          setUsingFallback(true);
        } else {
          setAnalyticsData(normalized);
          setUsingFallback(false);
        }
      } catch {
        // Keep chart visible even if analytics endpoint is temporarily unavailable.
        setAnalyticsData(FALLBACK_ANALYTICS_DATA);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted-foreground py-10">
        Loading analytics data...
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 mt-4">
      <h3 className="text-lg font-bold mb-4">Sales & Inventory Trends</h3>
      {usingFallback && (
        <p className="text-xs text-muted-foreground mb-3">
          Live analytics is unavailable right now, showing sample trend data.
        </p>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={analyticsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="inventory"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}



