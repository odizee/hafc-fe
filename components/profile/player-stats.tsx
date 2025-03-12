"use client";

import { Card } from "@/components/ui/card";
import { GoalIcon, Target, Timer, Trophy } from "lucide-react";

export function PlayerStats() {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center space-x-2">
          <GoalIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Goals</span>
        </div>
        <div className="text-2xl font-bold mt-2">12</div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Assists</span>
        </div>
        <div className="text-2xl font-bold mt-2">8</div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center space-x-2">
          <Timer className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Minutes</span>
        </div>
        <div className="text-2xl font-bold mt-2">1,240</div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">MOTM</span>
        </div>
        <div className="text-2xl font-bold mt-2">3</div>
      </Card>
    </div>
  );
}
