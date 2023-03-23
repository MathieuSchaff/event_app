import Image from "next/image";
const Event = ({ event }) => {
  console.log(event);
  return (
    <div>
      <Image src={event.image} alt={event.title} width={300} height={200} />
      <h1>{event.title}</h1>
      <p>{event.description}</p>
    </div>
  );
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
