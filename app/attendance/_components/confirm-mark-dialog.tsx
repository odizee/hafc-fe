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

interface ConfirmMarkDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  showTrigger?: boolean;
  isOpen?: boolean;
  cancel: () => void;
  onSuccess?: () => void;
  handleAction?: () => void;
  loading?: boolean;
}

export function ConfirmMarkDialog({
  showTrigger = true,
  onSuccess,
  isOpen,
  cancel,
  loading,
  handleAction,
  ...props
}: ConfirmMarkDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  // function onDelete() {
  //   startDeleteTransition(async () => {
  //     const { error } = await deleteTasks({
  //       ids: tasks.map((task) => task.id),
  //     });

  //     if (error) {
  //       toast.error(error);
  //       return;
  //     }

  //     props.onOpenChange?.(false);
  //     toast.success("Tasks deleted");
  //     onSuccess?.();
  //   });
  // }

  // if (isDesktop) {
  return (
    <Dialog open={isOpen} {...props}>
      {/* {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash className="mr-2 size-4" aria-hidden="true" />
            Delete 
          </Button>
        </DialogTrigger>
      ) : null} */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>Mark this users attendance.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline" onClick={cancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            onClick={handleAction}
            disabled={loading}
          >
            {loading && (
              <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
            )}
            Mark
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  // }
}
