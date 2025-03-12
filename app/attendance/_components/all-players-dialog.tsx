"use client";

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
import { PlayersTable } from "@/components/ui/table-components/players-table.tsx";
import { useMarkAttendanceMutation } from "@/redux/services/attendance";
import { useMemo, useState } from "react";
import { getPlayersColumns } from "@/components/ui/table-components/players-table.tsx/players-table-columns";
import { formatDateString } from "@/lib/helpers";
import { ConfirmMarkDialog } from "./confirm-mark-dialog";

interface AllPlayersDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  showTrigger?: boolean;
  playersData: any[];
  date: Date;
}

interface Selected {
  id: string;
  name: string;
  positions: string;
  role: string;
  status: boolean;
}
export function AllPlayersDialog({
  showTrigger = true,
  playersData,
  date,
  ...props
}: AllPlayersDialogProps) {
  const [selected, setSelected] = useState<Selected>({
    id: "",
    name: "",
    positions: "",
    role: "",
    status: false,
  });

  const [isOpen, setIsopen] = useState(false);

  const [markAttendance, { isLoading: markAttendanceLoading }] =
    useMarkAttendanceMutation();

  const handleOpenConfirm = () => setIsopen(true);
  const handleCloseConfirm = () => setIsopen(false);

  const handleMarkAttendance = async () => {
    const submitdata = {
      date: formatDateString(date),
      present: selected.status ? false : true,
      userId: selected.id,
    };

    try {
      const _data = await markAttendance(submitdata).unwrap();
    } catch (error) {}
  };

  const columns = useMemo(
    () =>
      getPlayersColumns({
        handleOpenConfirm,
        setSelected,
      }),
    []
  );

  //   const isDesktop = useMediaQuery("(min-width: 640px)");
  //   if (isDesktop) {
  return (
    <div>
      <ConfirmMarkDialog
        isOpen={isOpen}
        cancel={handleCloseConfirm}
        handleAction={handleMarkAttendance}
        loading={markAttendanceLoading}
      />
      <Dialog {...props}>
        {showTrigger ? (
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Trash className="mr-2 size-4" aria-hidden="true" />
              Open Player List
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent className="overflow-y-auto h-[80vh] min-w-[80vw]">
          <DialogHeader>
            <DialogTitle>Mark players present or absent</DialogTitle>
          </DialogHeader>
          <PlayersTable data={playersData} pageCount={2} columns={columns} />
        </DialogContent>
      </Dialog>
    </div>
  );
  //   }

  //   return (
  //     <Drawer {...props}>
  //       {showTrigger ? (
  //         <DrawerTrigger asChild>
  //           <Button variant="outline" size="sm">
  //             <Trash className="mr-2 size-4" aria-hidden="true" />
  //             Delete ({tasks.length})
  //           </Button>
  //         </DrawerTrigger>
  //       ) : null}
  //       <DrawerContent>
  //         <DrawerHeader>
  //           <DrawerTitle>Are you absolutely sure?</DrawerTitle>
  //           <DrawerDescription>
  //             This action cannot be undone. This will permanently delete your{" "}
  //             <span className="font-medium">{tasks.length}</span>
  //             {tasks.length === 1 ? " task" : " tasks"} from our servers.
  //           </DrawerDescription>
  //         </DrawerHeader>
  //         <DrawerFooter className="gap-2 sm:space-x-0">
  //           <DrawerClose asChild>
  //             <Button variant="outline">Cancel</Button>
  //           </DrawerClose>
  //           <Button
  //             aria-label="Delete selected rows"
  //             variant="destructive"
  //             // onClick={onDelete}
  //             disabled={isDeletePending}
  //           >
  //             {isDeletePending && (
  //               <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
  //             )}
  //             Delete
  //           </Button>
  //         </DrawerFooter>
  //       </DrawerContent>
  //     </Drawer>
  //   );
}
