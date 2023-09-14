import Sidebar from "../components/Home/Sidebar/Sidebar";
import Timeline from "../components/Home/Timeline";
import Header from "../components/shared/Header";

function Home() {
  return (
    <section className="bg-gray-100/50 min-h-screen">
      <Header />
      <div className="container flex justify-between gap-[4rem] w-full mt-[2rem]">
        <Timeline />
        <Sidebar />
      </div>
    </section>
  );
}

export default Home;
