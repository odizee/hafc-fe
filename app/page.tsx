import { Card } from "@/components/ui/card";
import {
  Users,
  Calendar,
  Trophy,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Total Players</span>
          </div>
          <div className="text-2xl font-bold">24</div>
        </Card>
        <Card className="p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Next Match</span>
          </div>
          <div className="text-2xl font-bold">2d 14h</div>
        </Card>
        <Card className="p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Season Wins</span>
          </div>
          <div className="text-2xl font-bold">12</div>
        </Card>
        <Card className="p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Attendance Rate</span>
          </div>
          <div className="text-2xl font-bold">87%</div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Recent Performance</h3>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            Performance Chart
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Top Performers</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Player {i}</div>
                  <div className="text-xs text-muted-foreground">
                    {Math.floor(Math.random() * 10)} goals
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}