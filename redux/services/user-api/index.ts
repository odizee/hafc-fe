import { baseApi } from "../baseApi";

const userAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create user mutation
    createPlayer: builder.mutation({
      query: (player) => ({
        url: `players`,
        method: "POST",
        body: player,
      }),
      invalidatesTags: ["players"],
    }),

    // Update User
    updatePlayer: builder.mutation({
      query: ({ id, ...player }) => ({
        url: `players/${id}`,
        method: "PATCH",
        body: player,
      }),
      invalidatesTags: ["players"],
    }),

    // delete User
    deletePlayer: builder.mutation({
      query: ({ id }) => ({
        url: `players/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["players"],
    }),

    // get users
    getPlayers: builder.query({
      query: ({ page, size, search, order, sort, filter }) => {
        const queryParams = [
          search && `q=${search}`,
          page && `page=${page}`,
          size && `size=${size}`,
          order && `order=${order}`,
          sort && `sort=${sort}`,
          filter && filter,
        ]
          .filter(Boolean)
          .join("&");
        return `players?${queryParams}`;
      },
      providesTags: ["players"],
    }),

    // get single users
    getSinglePlayer: builder.query({
      query: (_id) => `players/${_id}`,
      providesTags: ["players"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePlayerMutation,
  useDeletePlayerMutation,
  useGetPlayersQuery,
  useGetSinglePlayerQuery,
  useUpdatePlayerMutation,
} = userAPI;
