"use client";

import * as React from "react";
// import { type Task } from "@/db/schema"
import { type Row } from "@tanstack/react-table";
import { Loader, Trash } from "lucide-react";
import { toast } from "sonner";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface MarkBulkDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  ids: Row<any>["original"][];
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export function MarkBulkDialog({
  ids,
  showTrigger = true,
  onSuccess,
  ...props
}: MarkBulkDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const onMarkBulk = () => {
    try {
    } catch (error) {}
  };

  if (isDesktop) {
    return (
      <Dialog {...props}>
        {showTrigger ? (
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Mark Bulk
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Bulk Attendance?</DialogTitle>
            <DialogDescription>
              This will change the attendance status for your{" "}
              <span className="font-medium">{ids.length}</span>
              {ids.length === 1 ? " player" : " players"}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              // onClick={onDelete}
              // disabled={isDeletePending}
            >
              {/* {isDeletePending && (
                <Loader
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )} */}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash className="mr-2 size-4" aria-hidden="true" />
            Delete ({ids.length})
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{ids.length}</span>
            {ids.length === 1 ? " task" : " tasks"} from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            // onClick={onDelete}
            // disabled={isDeletePending}
          >
            {/* {isDeletePending && (
              <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
            )} */}
            Confirm
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
