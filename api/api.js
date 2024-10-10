const url = "https://api.github.com";

export const getUserEvent = async (username) => {
  const response = await fetch(`${url}/users/${username}/events`, {
    headers: {
      "User-Agent": "node.js",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
// function capitalize
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const displayActivityEvent = (events) => {
  if (!events.length) {
    console.log("No recent activity found.");
    return;
  }

  events.forEach((event) => {
    let actions;
    console.log(event.type);

    switch (event.type) {
      case "PushEvent":
        const commits = event.payload.commits.length;
        actions = `Pushed ${commits} commits(s) to ${event.repo.name}`;
        break;
      case "IssuesEvent":
        actions = `${capitalizeFirstLetter(event.payload.action)} an issue in ${
          event.repo.name
        }`;
        break;
      case "WatchEvent":
        actions = `Starred ${event.repo.name}`;
        break;
      case "ForkEvent":
        actions = `Forked ${event.repo.name}`;
        break;
      case "CreateEvent":
        actions = `Created ${event.payload.ref_type} in ${event.repo.name}`;
        break;
      default:
        break;
    }
    console.log(`- ${actions}`);
  });
};
