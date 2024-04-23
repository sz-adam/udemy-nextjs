import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/dummy-data";
import React from "react";

function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
     <EventList items={featuredEvents}/>
    </div>
  );
}

export default HomePage;
