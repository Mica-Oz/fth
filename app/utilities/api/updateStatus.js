import idNameKey from "@/app/utilities/statusData/idNameKey";

async function updateStatus(status, id) {
  console.log("api call to update status initiated:", status, id);
  const name = idNameKey[status];
  console.log("status name:", name);
  try {
    const response = await fetch("/api/case/update/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        CaseID: id,
      },
      body: JSON.stringify({
        StatusID: status,
        StatusName: name,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(
      "Case StatusUpdated successfully From action1/2---- response in front end::",
      data
    );

    // return Response;
  } catch (err) {
    // setError("There was an error submitting the case. Please try again.");
    console.error(err);
    alert(
      "There was an error submitting your signature (updatingstatus), please try again."
    );
    router.refresh();
  }
}

export default updateStatus;
