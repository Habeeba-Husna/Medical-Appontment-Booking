import { Card, CardContent, CardHeader, CardTitle } from "./Card";

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon,
  trend,
  className 
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-800">{value}</div> {/* Optional: keep main value darker */}
        {description && (
          <p className="text-xs text-gray-500 pt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center pt-1">
            <span className="text-xs text-gray-500">
              {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-gray-500 ml-1">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

