"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoalIcon, Timer, Target, Shield } from "lucide-react";

const players = [
  {
    id: 1,
    name: "John Doe",
    position: "Forward",
    stats: {
      goals: 12,
      assists: 8,
      minutesPlayed: 1240,
      cleanSheets: 0,
    },
  },
  {
    id: 2,
    name: "Mike Smith",
    position: "Midfielder",
    stats: {
      goals: 6,
      assists: 15,
      minutesPlayed: 1350,
      cleanSheets: 0,
    },
  },
  {
    id: 3,
    name: "Tom Wilson",
    position: "Defender",
    stats: {
      goals: 2,
      assists: 3,
      minutesPlayed: 1440,
      cleanSheets: 8,
    },
  },
];

export default function StatsPage() {
  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Stats Center</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <GoalIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Total Goals</span>
          </div>
          <div className="text-2xl font-bold mt-2">20</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Total Assists</span>
          </div>
          <div className="text-2xl font-bold mt-2">26</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Timer className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Minutes Played</span>
          </div>
          <div className="text-2xl font-bold mt-2">4,030</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Clean Sheets</span>
          </div>
          <div className="text-2xl font-bold mt-2">8</div>
        </Card>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Players</TabsTrigger>
            <TabsTrigger value="forwards">Forwards</TabsTrigger>
            <TabsTrigger value="midfielders">Midfielders</TabsTrigger>
            <TabsTrigger value="defenders">Defenders</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Goals</TableHead>
                  <TableHead>Assists</TableHead>
                  <TableHead>Minutes</TableHead>
                  <TableHead>Clean Sheets</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.stats.goals}</TableCell>
                    <TableCell>{player.stats.assists}</TableCell>
                    <TableCell>{player.stats.minutesPlayed}</TableCell>
                    <TableCell>{player.stats.cleanSheets}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="forwards">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Goals</TableHead>
                  <TableHead>Assists</TableHead>
                  <TableHead>Minutes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players
                  .filter((p) => p.position === "Forward")
                  .map((player) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">
                        {player.name}
                      </TableCell>
                      <TableCell>{player.stats.goals}</TableCell>
                      <TableCell>{player.stats.assists}</TableCell>
                      <TableCell>{player.stats.minutesPlayed}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
          {/* Similar structure for midfielders and defenders tabs */}
        </Tabs>
      </Card>
    </div>
  );
}
