"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

export default function FixtureDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fixture Details</h1>
      </div>

      <Card className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Team vs Rivals FC</h2>
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                April 15, 2024
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                15:00
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                City Stadium
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="w-4 h-4 mr-2" />
                League Match
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 bg-muted rounded-lg">
            <div className="text-center">
              <div className="text-6xl font-bold">VS</div>
              <div className="mt-2 text-muted-foreground">Upcoming Match</div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="lineup" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lineup">Lineup</TabsTrigger>
          <TabsTrigger value="stats">Match Stats</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="lineup" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Expected Lineup</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { number: 1, name: "John Doe", position: "Goalkeeper" },
                  { number: 4, name: "Mike Smith", position: "Defender" },
                  { number: 10, name: "Tom Wilson", position: "Midfielder" },
                ].map((player) => (
                  <TableRow key={player.number}>
                    <TableCell>{player.number}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        <TabsContent value="stats">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Match Statistics</h3>
            <div className="text-center text-muted-foreground">
              Statistics will be available after the match
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="summary">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Match Summary</h3>
            <div className="text-center text-muted-foreground">
              Summary will be available after the match
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}