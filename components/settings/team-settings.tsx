"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function TeamSettings() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="team-name">Team Name</Label>
        <Input id="team-name" defaultValue="United FC" />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="public-profile" />
        <Label htmlFor="public-profile">Make team profile public</Label>
      </div>
      <Button>Save Changes</Button>
    </div>
  );
}