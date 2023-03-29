// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from "path";
import fs from "fs";
function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}
function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;
  const { email, eventID } = req.body;
  const file = buildPath();
  const { events_categories, allEvents } = extractData(file);

  if (!events_categories || !allEvents) {
    res.status(404).json({ message: "No data found" });
  }
  const newAllEvents = allEvents.map((ev) => {
    if (ev?.id === eventID) {
      if (ev.emails_registered.includes(email)) {
        res
          .status(401)
          .json({ message: "You have already registered for this event" });
        return ev;
      }

      return {
        ...ev,
        emails_registered: [...ev.emails_registered, email],
      };
    }
    return ev;
  });
  fs.writeFileSync(
    file,
    JSON.stringify({ events_categories, allEvents: newAllEvents })
  );
  if (method === "POST") {
    res.status(200).json({
      message: `You have successfully been registered for the event with the email ${email}`,
    });
  }
}
