"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamSettings } from "@/components/settings/team-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { ProfileSettings } from "@/components/settings/profile-settings";
import { InviteSettings } from "@/components/settings/invite/invite-settings";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="invite">Invite User</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="team">
            <TeamSettings />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="invite">
            <InviteSettings />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
