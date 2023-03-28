import EventCard from "@/src/components/events/eventCard";
const Event = ({ event }) => {
  console.log(event);
  return <EventCard event={event} />;
};
export default Event;
export async function getStaticPaths() {
  const data = await import("/data/data.json");
  const paths = data.allEvents.map((ev) => ({
    params: { id: ev.id, cat: ev.city },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const data = await import("/data/data.json");
  const event = data.allEvents.find((ev) => ev.id === params.id);
  return {
    props: {
      event,
    },
  };
}
