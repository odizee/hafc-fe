"use client";

import { Card } from "@/components/ui/card";
import { Image } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((folder) => (
          <Card key={folder} className="p-6 hover:bg-accent transition-colors cursor-pointer">
            <div className="flex items-center space-x-4">
              <Image className="w-6 h-6 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Training Session {folder}</h3>
                <p className="text-sm text-muted-foreground">12 photos</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}