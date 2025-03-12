"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const matchHistory = [
  {
    id: 1,
    date: "2024-03-15",
    opponent: "Rivals FC",
    result: "W 2-1",
    goals: 1,
    assists: 1,
  },
  {
    id: 2,
    date: "2024-03-08",
    opponent: "United FC",
    result: "D 0-0",
    goals: 0,
    assists: 0,
  },
  {
    id: 3,
    date: "2024-03-01",
    opponent: "City FC",
    result: "W 3-1",
    goals: 2,
    assists: 0,
  },
];

export function MatchHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Opponent</TableHead>
          <TableHead>Result</TableHead>
          <TableHead>Goals</TableHead>
          <TableHead>Assists</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matchHistory.map((match) => (
          <TableRow key={match.id}>
            <TableCell>{match.date}</TableCell>
            <TableCell>{match.opponent}</TableCell>
            <TableCell>{match.result}</TableCell>
            <TableCell>{match.goals}</TableCell>
            <TableCell>{match.assists}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}