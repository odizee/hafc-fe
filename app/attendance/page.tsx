"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { AttendanceTable } from "@/components/attendance/attendance-table";
import { Download } from "lucide-react";
import { format, parse } from "date-fns";
import {
  useGetAttendanceHistoryQuery,
  useMarkAttendanceMutation,
} from "@/redux/services/attendance";
import { useSearchParams } from "next/navigation";
import { useQueryState, useQueryStates } from "nuqs";
import { formatDateString } from "@/lib/helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { FeatureFlagsProvider } from "@/components/ui/table-components/feature-flags-provider";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { TasksTable } from "@/components/ui/table-components/tasks-table";
import { AllPlayersDialog } from "./_components/all-players-dialog";
import { useGetPlayersQuery } from "@/redux/services/user-api";
import { getPlayersColumns } from "@/components/ui/table-components/players-table.tsx/players-table-columns";
import { ConfirmMarkDialog } from "./_components/confirm-mark-dialog";

const players = [
  { id: 1, name: "John Doe", position: "Forward" },
  { id: 2, name: "Jane Smith", position: "Midfielder" },
  { id: 3, name: "Mike Johnson", position: "Defender" },
];

interface Selected {
  id: string;
  name: string;
  positions: string;
  role: string;
  status: boolean;
}

export default function AttendancePage() {
  const searchParams = useSearchParams();

  const [date, setDate] = useState<any>(new Date());
  const [isOpen, setIsopen] = useState(false);
  const [selected, setSelected] = useState<Selected>({
    id: "",
    name: "",
    positions: "",
    role: "",
    status: false,
  });

  const sizeQuery = parseInt(searchParams.get("size") || "10", 10);
  const pageQuery = searchParams.get("page") || "";
  const searchQuery = searchParams.get("search") || "";
  const dateQuery = searchParams.get("date") || "";

  const initQuery = {
    page: pageQuery,
    size: sizeQuery,
    search: searchQuery,
    date: dateQuery,
  };
  const [query, setQuery] = useQueryStates<any>(initQuery);
  const [, setDateQuery] = useQueryState<any>("date");

  useEffect(() => {
    setDateQuery(formatDateString(date));
  }, [date]);

  const exportAttendance = () => {
    // Here you would implement the export functionality
    // This could use a library like jspdf or html2canvas
    console.log("Exporting attendance for:", date);
  };

  const { data, isFetching } = useGetAttendanceHistoryQuery({
    ...query,
    date: dateQuery,
  });

  const { data: players, isFetching: isFetchingPlayers } = useGetPlayersQuery({
    ...query,
  });
  const [markAttendance, { isLoading: markAttendanceLoading }] =
    useMarkAttendanceMutation();

  const mappedHistoryData = useMemo(
    () =>
      data
        ? data?.map((item: any) => {
            return {
              id: item.id,
              status: item.present,
              positions: item.user?.positions.join(", "),
              name: item.user?.name,
              role: item.user?.role,
            };
          })
        : [],
    [data]
  );

  const mappedPlayersData = useMemo(
    () =>
      players
        ? players?.map((item: any) => {
            return {
              id: item.id,
              positions: item?.positions?.join(", "),
              name: item?.name,
              role: item?.role,
            };
          })
        : [],
    [players]
  );

  const playersWithStatus = useMemo(() => {
    return mappedPlayersData.map((player: { name: string }) => {
      const historyRecord = mappedHistoryData.find(
        (history: { name: string }) => history.name === player.name
      );

      return {
        ...player,
        status: historyRecord ? historyRecord.status : false, // Default if no history
      };
    });
  }, [mappedPlayersData, mappedHistoryData]);

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

  const columns = React.useMemo(
    () =>
      getPlayersColumns({
        handleOpenConfirm,
        setSelected,
      }),
    []
  );

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top duration-500">
      {/* <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <Button variant="outline" onClick={exportAttendance}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>

        <Card className="p-4">
          <div className="mb-4">
            <h2 className="text-lg font-medium">
              Attendance for {date ? format(date, "PPP") : "Select a date"}
            </h2>
          </div>
          <AttendanceTable
            players={players}
            date={date!}
            data={mappedHistoryData}
          />
        </Card>
      </div> */}
      <ConfirmMarkDialog
        isOpen={isOpen}
        cancel={handleCloseConfirm}
        handleAction={handleMarkAttendance}
        loading={markAttendanceLoading}
      />
      <AllPlayersDialog
        playersData={playersWithStatus}
        date={date}
        // tasks={table
        //   .getFilteredSelectedRowModel()
        //   .rows.map((row) => row.original)}
        // onSuccess={() => table.toggleAllRowsSelected(false)}
      />
      <FeatureFlagsProvider>
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>
        <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
          {/* <DateRangePicker
            triggerSize="sm"
            triggerClassName="ml-auto w-56 sm:w-60"
            align="end"
            shallow={false}
          /> */}
        </React.Suspense>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={6}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem", "8rem"]}
              shrinkZero
            />
          }
        >
          <TasksTable
            data={playersWithStatus}
            pageCount={2}
            columns={columns}
          />
        </React.Suspense>
      </FeatureFlagsProvider>
    </div>
  );
}
