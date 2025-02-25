import { getAllEvents } from "../../dummy-data";
import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import { Fragment } from "react";
import { useRouter } from "next/router";

function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function finEventsHandler(year, month) {
    const fullPath=`/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <Fragment>
      <EventsSearch onSearch={finEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;
