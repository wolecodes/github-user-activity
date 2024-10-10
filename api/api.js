const url = "https://api.github.com";

export const getUserCommit = async (username) => {
  const response = await fetch(`${url}/users/${username}/repos`); //?

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const repos = await response.json();

  const commits = [];

  for (const repo in repos) {
    const repoCommits = await fetch(
      `${url}/repos/${username}/${repo.name}/commits`
    );

    commits.push(repoCommits);
  }
  return commits.flat();
};

export const getUserIssues = (username) => {
  return async () => {
    try {
      const response = await fetch(`${url}/users/${username}/repos`);

      if (!response.ok) {
        throw new Error(`Error fetching repos: ${repoResponse.statusText}`);
      }
      const repos = await response.json();
      const issues = [];

      for (const repo of repos) {
        const issuesResponse = await fetch(
          `https://api.github.com/repos/${username}/${repo}/issues`
        );
        if (!issuesResponse.ok) {
          console.log(
            `Error fetching issues for ${repo.name}: ${issuesResponse.statusText}`
          );
          continue; // Skip this repo on error
        }
        issues.push(...issuesResponse);
      }
      if (issues.length === 0) {
        return [];
      }
    } catch (error) {
      console.error("Error: ", error.message);
      return [];
    }
  };
};

export const getUserStar = async (username) => {
  const response = await fetch(`${url}/users/${username}/starred`);

  if (!response) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};
