export async function getActivities(id) {
  console.log("api call to getactivities initiated:", id);

  try {
    const response = await fetch("/api/activities/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        CaseID: id,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(
      "Ativities Retrieved successfully From utilities---- response in front end::",
      data
    );

    return data;
  } catch (err) {
    // setError("There was an error submitting the case. Please try again.");
    console.error(err);
    alert("There was an error retrieving your account details");
    router.refresh();
  }
}

export async function createActivity(id, subject, comment, activityType) {
  console.log("api call to createactivities initiated:", id);

  try {
    const response = await fetch("/api/activities/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        CaseID: id,
        subject,
        comment,
        activityType,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(
      "Activity created successfully From utilities---- response in front end::",
      data
    );

    return data;
  } catch (err) {
    // setError("There was an error submitting the case. Please try again.");
    console.error(err);
    alert("There was an error collecting your eligibility details, page 1");
    // router.refresh();
  }
}
