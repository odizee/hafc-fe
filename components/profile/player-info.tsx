"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";

export function PlayerInfo() {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <UserCircle className="h-24 w-24" />
        </Avatar>
        <div className="text-center">
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-sm text-muted-foreground">Forward</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Jersey Number</span>
          <span className="font-medium">10</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Joined</span>
          <span className="font-medium">2023</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Appearances</span>
          <span className="font-medium">24</span>
        </div>
      </div>
    </Card>
  );
}