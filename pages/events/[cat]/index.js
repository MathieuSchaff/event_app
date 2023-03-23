import Image from "next/image";
import Link from "next/link";
const Page = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((ev) => {
        return (
          <Link href={`/events/${ev.city}/${ev.id}`} key={ev.id}>
            <Image src={ev.image} alt={ev.title} width={300} height={200} />
            <h1>{ev.title}</h1>
            <p>{ev.description}</p>
          </Link>
        );
      })}
    </div>
  );
};
export default Page;
export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const paths = events_categories.map((ev) => ({
    params: { cat: ev.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { allEvents } = await import("/data/data.json");
  const data = allEvents.filter((ev) => ev.city.toLowerCase() === params.cat);
  return {
    props: {
      data,
    },
  };
}
