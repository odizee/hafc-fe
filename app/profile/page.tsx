"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerStats } from "@/components/profile/player-stats";
import { PlayerInfo } from "@/components/profile/player-info";
import { MatchHistory } from "@/components/profile/match-history";

export default function ProfilePage() {
  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Player Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <PlayerInfo />
        <div className="space-y-6">
          <PlayerStats />
          <Card className="p-6">
            <Tabs defaultValue="history" className="space-y-4">
              <TabsList>
                <TabsTrigger value="history">Match History</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              <TabsContent value="history">
                <MatchHistory />
              </TabsContent>
              <TabsContent value="achievements">
                <div className="text-muted-foreground">No achievements yet</div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}