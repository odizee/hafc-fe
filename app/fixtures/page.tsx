import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";

const fixtures = [
  {
    id: 1,
    homeTeam: "Our Team",
    awayTeam: "Rivals FC",
    date: "2024-04-15",
    time: "15:00",
    venue: "City Stadium",
    status: "upcoming",
  },
  {
    id: 2,
    homeTeam: "United FC",
    awayTeam: "Our Team",
    date: "2024-04-08",
    time: "18:30",
    venue: "Sports Complex",
    status: "completed",
    score: "2-1",
  },
];

export default function FixturesPage() {
  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fixtures</h1>
      </div>

      <div className="grid gap-4">
        {fixtures.map((fixture) => (
          <Card key={fixture.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-lg font-medium">
                  {fixture.homeTeam} vs {fixture.awayTeam}
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {fixture.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {fixture.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {fixture.venue}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {fixture.status === "completed" && (
                  <div className="text-lg font-bold">{fixture.score}</div>
                )}
                <Link href={`/fixtures/${fixture.id}`}>
                  <Button>View Details</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}