import { getUserEvent, displayActivityEvent } from "./api/api.js";
const [, , args] = process.argv;

console.log(args);

if (!args) {
  console.log("Please provide a Github Username");
  process.exit(1);
}

getUserEvent(args)
  .then((events) => {
    displayActivityEvent(events);
  })
  .catch((err) => {
    console.log(err.message);
  });
