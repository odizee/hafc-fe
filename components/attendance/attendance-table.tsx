"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Player {
  id: number;
  name: string;
  position: string;
}

interface AttendanceTableProps {
  players: Player[];
  date: Date;
  data: any[];
}

export function AttendanceTable({ players, date, data }: AttendanceTableProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const { toast } = useToast();

  const toggleAll = () => {
    if (selectedPlayers.length === players.length) {
      setSelectedPlayers([]);
    } else {
      setSelectedPlayers(players.map((p) => p.id));
    }
  };

  const togglePlayer = (playerId: number) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  const markAttendance = () => {
    // Here you would typically save to your backend
    toast({
      title: "Attendance Marked",
      description: `Marked ${selectedPlayers.length} players present for training`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={toggleAll}>
          {selectedPlayers.length === players.length
            ? "Deselect All"
            : "Select All"}
        </Button>
        <Button
          onClick={markAttendance}
          disabled={selectedPlayers.length === 0}
        >
          Mark Selected Present
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                <Checkbox
                  checked={selectedPlayers.includes(player.id)}
                  onCheckedChange={() => togglePlayer(player.id)}
                />
              </TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.positions}</TableCell>
              <TableCell>{player.role}</TableCell>
              <TableCell>{player.status ? "Present" : "Absent"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
