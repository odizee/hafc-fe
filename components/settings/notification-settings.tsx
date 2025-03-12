"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function NotificationSettings() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="training-notifications" defaultChecked />
        <Label htmlFor="training-notifications">Training reminders</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="match-notifications" defaultChecked />
        <Label htmlFor="match-notifications">Match updates</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="team-notifications" />
        <Label htmlFor="team-notifications">Team announcements</Label>
      </div>
      <Button>Save Changes</Button>
    </div>
  );
}