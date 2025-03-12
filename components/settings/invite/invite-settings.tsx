"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BulkInvite } from "./bulk-invite";
import { SingleInvite } from "./single-invite";

export function InviteSettings() {
  return (
    <Card className="p-6">
      <Tabs defaultValue="single" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">Single Invite</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Invite</TabsTrigger>
        </TabsList>
        <TabsContent value="single">
          <SingleInvite />
        </TabsContent>
        <TabsContent value="bulk">
          <BulkInvite />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
