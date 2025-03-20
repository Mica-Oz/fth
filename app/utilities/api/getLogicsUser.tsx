//this functiolns gets the user form logics caseid from stytch metadata
//then it will set the user data on the context
//running this at every page load to get updated logics user info on context every page

export default async function fetchLogicsUser(caseID: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  try {
    const response = await fetch("/api/case", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        caseID: caseID,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
    console.log("Get request submitted successfully:", data);
  } catch (err) {
    console.error(err);
  }
}
