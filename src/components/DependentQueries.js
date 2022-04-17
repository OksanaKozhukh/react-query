import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueries = ({ email }) => {
  const { data: user, isLoading: isUserLoading } = useQuery(
    ["user", email],
    () => fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;

  const { data: courses, isLoading: isCoursesLoading } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  if (isUserLoading || isCoursesLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Dependent Queries</h2>
      {courses?.data?.courses?.map((el) => (
        <h3>{el}</h3>
      ))}
    </>
  );
};
