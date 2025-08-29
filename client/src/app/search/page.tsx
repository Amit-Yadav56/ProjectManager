"use client";
import { useGetUsersQuery } from "@/state/api";
import React from "react";

const Search = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError || !users)
    return <div>An error occurred while fetching users</div>;
  return (
    <div>
      {users.map((user, idx) => (
        <div key={user.UserId ?? idx}>{JSON.stringify(user)}</div>
      ))}
    </div>
  );
};

export default Search;
