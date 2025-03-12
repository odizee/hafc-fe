"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileSettings() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="John Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue="john@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="position">Position</Label>
        <Input id="position" defaultValue="Forward" />
      </div>
      <Button>Save Changes</Button>
    </div>
  );
}