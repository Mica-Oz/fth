"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import { createActivity } from "@/app/utilities/api/activities";
import updateStatus from "@/app/utilities/api/updateStatus";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";

const Action = () => {
  const router = useRouter();
  const { userData, setUserData } = useAppContext();
  console.log("USER DATA FROM CONTEXT BUT INIDE Action 3/9 COMP:", userData);

  // Create a ref for the form
  const formRef = useRef<HTMLFormElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = async (e: any) => {
    e.preventDefault();

    // Check if form ref exists
    if (!formRef.current) return;
    // Collect form data using the form elements
    const formData = {
      "2025-OFT": (
        formRef.current.querySelector(
          'input[id="2025-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2025-OST": (
        formRef.current.querySelector(
          'input[id="2025-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2025-OLT": (
        formRef.current.querySelector(
          'input[id="2025-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2025-UFT": (
        formRef.current.querySelector(
          'input[id="2025-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2025-UST": (
        formRef.current.querySelector(
          'input[id="2025-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2025-ULT": (
        formRef.current.querySelector(
          'input[id="2025-ULT"]'
        ) as HTMLInputElement
      )?.value,
      "2024-OFT": (
        formRef.current.querySelector(
          'input[id="2024-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2024-OST": (
        formRef.current.querySelector(
          'input[id="2024-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2024-OLT": (
        formRef.current.querySelector(
          'input[id="2024-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2024-UFT": (
        formRef.current.querySelector(
          'input[id="2024-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2024-UST": (
        formRef.current.querySelector(
          'input[id="2024-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2024-ULT": (
        formRef.current.querySelector(
          'input[id="2024-ULT"]'
        ) as HTMLInputElement
      )?.value,
      "2023-OFT": (
        formRef.current.querySelector(
          'input[id="2023-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2023-OST": (
        formRef.current.querySelector(
          'input[id="2023-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2023-OLT": (
        formRef.current.querySelector(
          'input[id="2023-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2023-UFT": (
        formRef.current.querySelector(
          'input[id="2023-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2023-UST": (
        formRef.current.querySelector(
          'input[id="2023-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2023-ULT": (
        formRef.current.querySelector(
          'input[id="2023-ULT"]'
        ) as HTMLInputElement
      )?.value,
      "2022-OFT": (
        formRef.current.querySelector(
          'input[id="2022-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2022-OST": (
        formRef.current.querySelector(
          'input[id="2022-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2022-OLT": (
        formRef.current.querySelector(
          'input[id="2022-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2022-UFT": (
        formRef.current.querySelector(
          'input[id="2022-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2022-UST": (
        formRef.current.querySelector(
          'input[id="2022-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2022-ULT": (
        formRef.current.querySelector(
          'input[id="2022-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2021-OFT": (
        formRef.current.querySelector(
          'input[id="2021-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2021-OST": (
        formRef.current.querySelector(
          'input[id="2021-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2021-OLT": (
        formRef.current.querySelector(
          'input[id="2021-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2021-UFT": (
        formRef.current.querySelector(
          'input[id="2021-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2021-UST": (
        formRef.current.querySelector(
          'input[id="2021-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2021-ULT": (
        formRef.current.querySelector(
          'input[id="2021-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2020-OFT": (
        formRef.current.querySelector(
          'input[id="2020-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2020-OST": (
        formRef.current.querySelector(
          'input[id="2020-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2020-OLT": (
        formRef.current.querySelector(
          'input[id="2020-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2020-UFT": (
        formRef.current.querySelector(
          'input[id="2020-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2020-UST": (
        formRef.current.querySelector(
          'input[id="2020-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2020-ULT": (
        formRef.current.querySelector(
          'input[id="2020-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2019-OFT": (
        formRef.current.querySelector(
          'input[id="2019-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2019-OST": (
        formRef.current.querySelector(
          'input[id="2019-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2019-OLT": (
        formRef.current.querySelector(
          'input[id="2019-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2019-UFT": (
        formRef.current.querySelector(
          'input[id="2019-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2019-UST": (
        formRef.current.querySelector(
          'input[id="2019-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2019-ULT": (
        formRef.current.querySelector(
          'input[id="2019-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2018-OFT": (
        formRef.current.querySelector(
          'input[id="2018-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2018-OST": (
        formRef.current.querySelector(
          'input[id="2018-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2018-OLT": (
        formRef.current.querySelector(
          'input[id="2018-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2018-UFT": (
        formRef.current.querySelector(
          'input[id="2018-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2018-UST": (
        formRef.current.querySelector(
          'input[id="2018-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2018-ULT": (
        formRef.current.querySelector(
          'input[id="2018-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2017-OFT": (
        formRef.current.querySelector(
          'input[id="2017-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2017-OST": (
        formRef.current.querySelector(
          'input[id="2017-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2017-OLT": (
        formRef.current.querySelector(
          'input[id="2017-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2017-UFT": (
        formRef.current.querySelector(
          'input[id="2017-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2017-UST": (
        formRef.current.querySelector(
          'input[id="2017-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2017-ULT": (
        formRef.current.querySelector(
          'input[id="2017-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2016-OFT": (
        formRef.current.querySelector(
          'input[id="2016-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2016-OST": (
        formRef.current.querySelector(
          'input[id="2016-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2016-OLT": (
        formRef.current.querySelector(
          'input[id="2016-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2016-UFT": (
        formRef.current.querySelector(
          'input[id="2016-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2016-UST": (
        formRef.current.querySelector(
          'input[id="2016-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2016-ULT": (
        formRef.current.querySelector(
          'input[id="2016-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2015-OFT": (
        formRef.current.querySelector(
          'input[id="2015-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2015-OST": (
        formRef.current.querySelector(
          'input[id="2015-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2015-OLT": (
        formRef.current.querySelector(
          'input[id="2015-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2015-UFT": (
        formRef.current.querySelector(
          'input[id="2015-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2015-UST": (
        formRef.current.querySelector(
          'input[id="2015-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2015-ULT": (
        formRef.current.querySelector(
          'input[id="2015-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2014-OFT": (
        formRef.current.querySelector(
          'input[id="2014-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2014-OST": (
        formRef.current.querySelector(
          'input[id="2014-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2014-OLT": (
        formRef.current.querySelector(
          'input[id="2014-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2014-UFT": (
        formRef.current.querySelector(
          'input[id="2014-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2014-UST": (
        formRef.current.querySelector(
          'input[id="2014-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2014-ULT": (
        formRef.current.querySelector(
          'input[id="2014-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2013-OFT": (
        formRef.current.querySelector(
          'input[id="2013-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2013-OST": (
        formRef.current.querySelector(
          'input[id="2013-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2013-OLT": (
        formRef.current.querySelector(
          'input[id="2013-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2013-UFT": (
        formRef.current.querySelector(
          'input[id="2013-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2013-UST": (
        formRef.current.querySelector(
          'input[id="2013-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2013-ULT": (
        formRef.current.querySelector(
          'input[id="2013-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2012-OFT": (
        formRef.current.querySelector(
          'input[id="2012-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2012-OST": (
        formRef.current.querySelector(
          'input[id="2012-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2012-OLT": (
        formRef.current.querySelector(
          'input[id="2012-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2012-UFT": (
        formRef.current.querySelector(
          'input[id="2012-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2012-UST": (
        formRef.current.querySelector(
          'input[id="2012-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2012-ULT": (
        formRef.current.querySelector(
          'input[id="2012-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2011-OFT": (
        formRef.current.querySelector(
          'input[id="2011-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2011-OST": (
        formRef.current.querySelector(
          'input[id="2011-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2011-OLT": (
        formRef.current.querySelector(
          'input[id="2011-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2011-UFT": (
        formRef.current.querySelector(
          'input[id="2011-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2011-UST": (
        formRef.current.querySelector(
          'input[id="2011-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2011-ULT": (
        formRef.current.querySelector(
          'input[id="2011-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2010-OFT": (
        formRef.current.querySelector(
          'input[id="2010-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2010-OST": (
        formRef.current.querySelector(
          'input[id="2010-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2010-OLT": (
        formRef.current.querySelector(
          'input[id="2010-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2010-UFT": (
        formRef.current.querySelector(
          'input[id="2010-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2010-UST": (
        formRef.current.querySelector(
          'input[id="2010-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2010-ULT": (
        formRef.current.querySelector(
          'input[id="2010-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2009-OFT": (
        formRef.current.querySelector(
          'input[id="2009-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2009-OST": (
        formRef.current.querySelector(
          'input[id="2009-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2009-OLT": (
        formRef.current.querySelector(
          'input[id="2009-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2009-UFT": (
        formRef.current.querySelector(
          'input[id="2009-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2009-UST": (
        formRef.current.querySelector(
          'input[id="2009-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2009-ULT": (
        formRef.current.querySelector(
          'input[id="2009-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2008-OFT": (
        formRef.current.querySelector(
          'input[id="2008-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2008-OST": (
        formRef.current.querySelector(
          'input[id="2008-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2008-OLT": (
        formRef.current.querySelector(
          'input[id="2008-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2008-UFT": (
        formRef.current.querySelector(
          'input[id="2008-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2008-UST": (
        formRef.current.querySelector(
          'input[id="2008-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2008-ULT": (
        formRef.current.querySelector(
          'input[id="2008-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2007-OFT": (
        formRef.current.querySelector(
          'input[id="2007-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2007-OST": (
        formRef.current.querySelector(
          'input[id="2007-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2007-OLT": (
        formRef.current.querySelector(
          'input[id="2007-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2007-UFT": (
        formRef.current.querySelector(
          'input[id="2007-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2007-UST": (
        formRef.current.querySelector(
          'input[id="2007-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2007-ULT": (
        formRef.current.querySelector(
          'input[id="2007-ULT"]'
        ) as HTMLInputElement
      )?.value,

      "2006-OFT": (
        formRef.current.querySelector(
          'input[id="2006-OFT"]'
        ) as HTMLInputElement
      )?.value,
      "2006-OST": (
        formRef.current.querySelector(
          'input[id="2006-OST"]'
        ) as HTMLInputElement
      )?.value,
      "2006-OLT": (
        formRef.current.querySelector(
          'input[id="2006-OLT"]'
        ) as HTMLInputElement
      )?.value,
      "2006-UFT": (
        formRef.current.querySelector(
          'input[id="2006-UFT"]'
        ) as HTMLInputElement
      )?.value,
      "2006-UST": (
        formRef.current.querySelector(
          'input[id="2006-UST"]'
        ) as HTMLInputElement
      )?.value,
      "2006-ULT": (
        formRef.current.querySelector(
          'input[id="2006-ULT"]'
        ) as HTMLInputElement
      )?.value,
    };
    const caseID = userData?.data.CaseID;
    console.log("Form Data:", formData);
    console.log("id from action  3/9", userData?.data.CaseID);
    console.log(
      "Form Data string:",
      JSON.stringify(formData)
        .replace(/,/g, `',\n'`)
        .replace(/["']+/g, "")
        .replace(/:/g, ": ")
        .replace(/[{}]+/g, "")
    );
    const processedJSON = JSON.stringify(formData)
      .replace(/,/g, `',<br/>'`)
      .replace(/["']+/g, "")
      .replace(/:/g, ": ")
      .replace(/[{}]+/g, "");

    createActivity(
      userData?.data.CaseID,
      "Tax Years",
      processedJSON,
      "FinancialInterview"
    );
    await updateStatus(189, caseID);
    const updatedUser = await getLogicsUser(caseID);
    setUserData(updatedUser);
    // Your existing routing logic
    router.push("/dashboard/status6");
  };
  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-1-1"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Eligibility Request Form</div>

        <div className="square">
          <p
            className="sub-heading"
            style={{ visibility: "hidden", marginBottom: "0" }}
          >
            We just need a few more details before we can submit your request!
          </p>
          <p className="form-group">Tax Years</p>
          <p
            className="sub-heading"
            style={{ marginBottom: "0", marginTop: "7px" }}
          >
            What years do you owe back taxes on and what years have you not
            filed?
          </p>
          <form className="form-cont" ref={formRef}>
            <div className="form-cat">
              <table>
                <thead>
                  <tr>
                    <td>&nbsp;</td>
                    <td>Owe Federal Taxes</td>
                    <td>Owe State Taxes</td>
                    <td>Owe Local Taxes</td>
                    <td>Unfiled Federal Taxes</td>
                    <td>Unfiled State Taxes</td>
                    <td>Unfiled Local Taxes</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="cat-title">2025:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2025-OFT"
                        name="2025-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2025-OST"
                        name="2025-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2025-OLT"
                        name="2025-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2025-UFT"
                        name="2025-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2025-UST"
                        name="2025-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2025-ULT"
                        name="2025-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2024:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2024-OFT"
                        name="2024-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2024-OST"
                        name="2024-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2024-OLT"
                        name="2024-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2024-UFT"
                        name="2024-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2024-UST"
                        name="2024-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2024-ULT"
                        name="2024-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2023:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2023-OFT"
                        name="2023-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2023-OST"
                        name="2023-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2023-OLT"
                        name="2023-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2023-UFT"
                        name="2023-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2023-UST"
                        name="2023-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2023-ULT"
                        name="2023-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2022:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2022-OFT"
                        name="2022-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2022-OST"
                        name="2022-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2022-OLT"
                        name="2022-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2022-UFT"
                        name="2022-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2022-UST"
                        name="2022-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2022-ULT"
                        name="2022-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2021:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2021-OFT"
                        name="2021-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2021-OST"
                        name="2021-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2021-OLT"
                        name="2021-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2021-UFT"
                        name="2021-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2021-UST"
                        name="2021-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2021-ULT"
                        name="2021-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2020:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2020-OFT"
                        name="2020-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2020-OST"
                        name="2020-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2020-OLT"
                        name="2020-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2020-UFT"
                        name="2020-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2020-UST"
                        name="2020-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2020-ULT"
                        name="2020-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2019:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2019-OFT"
                        name="2019-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2019-OST"
                        name="2019-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2019-OLT"
                        name="2019-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2019-UFT"
                        name="2019-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2019-UST"
                        name="2019-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2019-ULT"
                        name="2019-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2018:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2018-OFT"
                        name="2018-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2018-OST"
                        name="2018-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2018-OLT"
                        name="2018-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2018-UFT"
                        name="2018-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2018-UST"
                        name="2018-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2018-ULT"
                        name="2018-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2017:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2017-OFT"
                        name="2017-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2017-OST"
                        name="2017-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2017-OLT"
                        name="2017-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2017-UFT"
                        name="2017-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2017-UST"
                        name="2017-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2017-ULT"
                        name="2017-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2016:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2016-OFT"
                        name="2016-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2016-OST"
                        name="2016-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2016-OLT"
                        name="2016-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2016-UFT"
                        name="2016-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2016-UST"
                        name="2016-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2016-ULT"
                        name="2016-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2015:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2015-OFT"
                        name="2015-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2015-OST"
                        name="2015-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2015-OLT"
                        name="2015-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2015-UFT"
                        name="2015-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2015-UST"
                        name="2015-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2015-ULT"
                        name="2015-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2014:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2014-OFT"
                        name="2014-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2014-OST"
                        name="2014-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2014-OLT"
                        name="2014-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2014-UFT"
                        name="2014-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2014-UST"
                        name="2014-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2014-ULT"
                        name="2014-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2013:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2013-OFT"
                        name="2013-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2013-OST"
                        name="2013-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2013-OLT"
                        name="2013-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2013-UFT"
                        name="2013-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2013-UST"
                        name="2013-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2013-ULT"
                        name="2013-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2012:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2012-OFT"
                        name="2012-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2012-OST"
                        name="2012-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2012-OLT"
                        name="2012-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2012-UFT"
                        name="2012-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2012-UST"
                        name="2012-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2012-ULT"
                        name="2012-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2011:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2011-OFT"
                        name="2011-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2011-OST"
                        name="2011-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2011-OLT"
                        name="2011-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2011-UFT"
                        name="2011-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2011-UST"
                        name="2011-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2011-ULT"
                        name="2011-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2010:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2010-OFT"
                        name="2010-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2010-OST"
                        name="2010-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2010-OLT"
                        name="2010-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2010-UFT"
                        name="2010-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2010-UST"
                        name="2010-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2010-ULT"
                        name="2010-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2009:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2009-OFT"
                        name="2009-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2009-OST"
                        name="2009-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2009-OLT"
                        name="2009-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2009-UFT"
                        name="2009-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2009-UST"
                        name="2009-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2009-ULT"
                        name="2009-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2008:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2008-OFT"
                        name="2008-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2008-OST"
                        name="2008-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2008-OLT"
                        name="2008-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2008-UFT"
                        name="2008-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2008-UST"
                        name="2008-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2008-ULT"
                        name="2008-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2007:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2007-OFT"
                        name="2007-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2007-OST"
                        name="2007-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2007-OLT"
                        name="2007-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2007-UFT"
                        name="2007-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2007-UST"
                        name="2007-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2007-ULT"
                        name="2007-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2006:</td>
                    <td>
                      <input
                        type="checkbox"
                        id="2006-OFT"
                        name="2006-OFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2006-OST"
                        name="2006-OST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2006-OLT"
                        name="2006-OLT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2006-UFT"
                        name="2006-UFT"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2006-UST"
                        name="2006-UST"
                        value="X"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="2006-ULT"
                        name="2006-ULT"
                        value="X"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>

          <button onClick={submit} className="next-btn">
            Next
          </button>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action;
