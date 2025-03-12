import { baseApi } from "../baseApi";

const attendanceAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //mark attendance mutation
    markAttendance: builder.mutation({
      query: (attendanceData) => ({
        url: `attendance`,
        method: "POST",
        body: attendanceData,
      }),
      invalidatesTags: ["attendance"],
    }),

    //create bulk user mutation
    markBulkAttendance: builder.mutation({
      query: (attendanceData) => ({
        url: `attendance/bulk`,
        method: "POST",
        body: attendanceData,
      }),
      invalidatesTags: ["attendance"],
    }),

    // Get Attendance History
    getAttendanceHistory: builder.query({
      query: ({ page, size, search, date }) => {
        const queryParams = [
          search && `q=${search}`,
          page && `page=${page}`,
          size && `size=${size}`,
          date && `date=${date}`,
        ]
          .filter(Boolean)
          .join("&");
        return `attendance/history?${queryParams}`;
      },
      providesTags: ["attendance"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAttendanceHistoryQuery,
  useMarkAttendanceMutation,
  useMarkBulkAttendanceMutation,
} = attendanceAPI;
