import React, { useEffect } from "react";

import { useGetPhotosQuery } from "src/data/api";

const ProfilePage = (props: any) => {
  const { data, error, isLoading, refetch } = useGetPhotosQuery(null);
  useEffect(() => {
    console.log({ data, error, isLoading });
  }, []);

  return (
    <h1>
      ProfilePage
      <button onClick={() => refetch()}>get photos</button>
    </h1>
  );
};

export default ProfilePage;
