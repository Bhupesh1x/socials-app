import useGetUser from "../../../hooks/useGetUser";
import Suggestions from "./Suggestions";
import User from "./User";

function Sidebar() {
  const { user } = useGetUser();

  return (
    <section className="hidden md:block md:w-[30%] border border-gray-300 hover:border-gray-400 h-fit py-3 px-4 rounded-md shadow sticky top-[4.8rem] right-0">
      <User
        fullName={user?.fullName}
        emailAddress={user?.emailAddress}
        avatar={user?.avatar}
        userId={user?.userId}
      />
      <Suggestions
        userId={user?.userId}
        following={user?.following}
        loggedInUserDocId={user?.docId}
      />
    </section>
  );
}

export default Sidebar;
