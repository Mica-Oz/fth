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

    if (!formRef.current) return;

    // Create an empty object to store form data
    const formData: Record<string, string> = {};

    // Get all checkboxes in the form
    const checkboxes = formRef.current.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );

    // Loop through each checkbox and add its ID and value to formData
    checkboxes.forEach((checkbox) => {
      // Set the value to "X" if checked, otherwise ""
      formData[checkbox.id] = checkbox.checked ? "X" : "";
    });

    const caseID = userData?.data.CaseID;
    console.log("Form Data:", formData);

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
    router.push("/dashboard/status6");
  };

  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-3"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Eligibility Request Form</div>

        <div className="square">
          <p
            className="sub-heading hide"
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
                    <td className="cat-title2">
                      Owe <br /> Federal Taxes
                    </td>
                    <td className="cat-title2">
                      Owe <br /> State Taxes
                    </td>
                    <td className="cat-title2">
                      Owe <br /> Local Taxes
                    </td>
                    <td className="cat-title2">
                      Unfiled <br /> Federal Taxes
                    </td>
                    <td className="cat-title2">
                      Unfiled <br /> State Taxes
                    </td>
                    <td className="cat-title2">
                      Unfiled <br /> Local Taxes
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="cat-title">2025:</td>
                    <td>
                      <input type="checkbox" id="2025-OFT" name="2025-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2025-OST" name="2025-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2025-OLT" name="2025-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2025-UFT" name="2025-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2025-UST" name="2025-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2025-ULT" name="2025-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2024:</td>
                    <td>
                      <input type="checkbox" id="2024-OFT" name="2024-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2024-OST" name="2024-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2024-OLT" name="2024-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2024-UFT" name="2024-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2024-UST" name="2024-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2024-ULT" name="2024-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2023:</td>
                    <td>
                      <input type="checkbox" id="2023-OFT" name="2023-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2023-OST" name="2023-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2023-OLT" name="2023-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2023-UFT" name="2023-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2023-UST" name="2023-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2023-ULT" name="2023-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2022:</td>
                    <td>
                      <input type="checkbox" id="2022-OFT" name="2022-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2022-OST" name="2022-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2022-OLT" name="2022-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2022-UFT" name="2022-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2022-UST" name="2022-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2022-ULT" name="2022-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2021:</td>
                    <td>
                      <input type="checkbox" id="2021-OFT" name="2021-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2021-OST" name="2021-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2021-OLT" name="2021-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2021-UFT" name="2021-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2021-UST" name="2021-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2021-ULT" name="2021-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2020:</td>
                    <td>
                      <input type="checkbox" id="2020-OFT" name="2020-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2020-OST" name="2020-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2020-OLT" name="2020-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2020-UFT" name="2020-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2020-UST" name="2020-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2020-ULT" name="2020-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2019:</td>
                    <td>
                      <input type="checkbox" id="2019-OFT" name="2019-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2019-OST" name="2019-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2019-OLT" name="2019-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2019-UFT" name="2019-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2019-UST" name="2019-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2019-ULT" name="2019-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2018:</td>
                    <td>
                      <input type="checkbox" id="2018-OFT" name="2018-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2018-OST" name="2018-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2018-OLT" name="2018-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2018-UFT" name="2018-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2018-UST" name="2018-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2018-ULT" name="2018-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2017:</td>
                    <td>
                      <input type="checkbox" id="2017-OFT" name="2017-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2017-OST" name="2017-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2017-OLT" name="2017-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2017-UFT" name="2017-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2017-UST" name="2017-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2017-ULT" name="2017-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2016:</td>
                    <td>
                      <input type="checkbox" id="2016-OFT" name="2016-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2016-OST" name="2016-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2016-OLT" name="2016-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2016-UFT" name="2016-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2016-UST" name="2016-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2016-ULT" name="2016-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2015:</td>
                    <td>
                      <input type="checkbox" id="2015-OFT" name="2015-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2015-OST" name="2015-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2015-OLT" name="2015-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2015-UFT" name="2015-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2015-UST" name="2015-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2015-ULT" name="2015-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2014:</td>
                    <td>
                      <input type="checkbox" id="2014-OFT" name="2014-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2014-OST" name="2014-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2014-OLT" name="2014-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2014-UFT" name="2014-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2014-UST" name="2014-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2014-ULT" name="2014-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2013:</td>
                    <td>
                      <input type="checkbox" id="2013-OFT" name="2013-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2013-OST" name="2013-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2013-OLT" name="2013-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2013-UFT" name="2013-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2013-UST" name="2013-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2013-ULT" name="2013-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2012:</td>
                    <td>
                      <input type="checkbox" id="2012-OFT" name="2012-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2012-OST" name="2012-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2012-OLT" name="2012-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2012-UFT" name="2012-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2012-UST" name="2012-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2012-ULT" name="2012-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2011:</td>
                    <td>
                      <input type="checkbox" id="2011-OFT" name="2011-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2011-OST" name="2011-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2011-OLT" name="2011-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2011-UFT" name="2011-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2011-UST" name="2011-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2011-ULT" name="2011-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2010:</td>
                    <td>
                      <input type="checkbox" id="2010-OFT" name="2010-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2010-OST" name="2010-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2010-OLT" name="2010-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2010-UFT" name="2010-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2010-UST" name="2010-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2010-ULT" name="2010-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2009:</td>
                    <td>
                      <input type="checkbox" id="2009-OFT" name="2009-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2009-OST" name="2009-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2009-OLT" name="2009-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2009-UFT" name="2009-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2009-UST" name="2009-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2009-ULT" name="2009-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2008:</td>
                    <td>
                      <input type="checkbox" id="2008-OFT" name="2008-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2008-OST" name="2008-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2008-OLT" name="2008-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2008-UFT" name="2008-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2008-UST" name="2008-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2008-ULT" name="2008-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2007:</td>
                    <td>
                      <input type="checkbox" id="2007-OFT" name="2007-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2007-OST" name="2007-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2007-OLT" name="2007-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2007-UFT" name="2007-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2007-UST" name="2007-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2007-ULT" name="2007-ULT" />
                    </td>
                  </tr>
                  <tr>
                    <td className="cat-title">2006:</td>
                    <td>
                      <input type="checkbox" id="2006-OFT" name="2006-OFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2006-OST" name="2006-OST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2006-OLT" name="2006-OLT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2006-UFT" name="2006-UFT" />
                    </td>
                    <td>
                      <input type="checkbox" id="2006-UST" name="2006-UST" />
                    </td>
                    <td>
                      <input type="checkbox" id="2006-ULT" name="2006-ULT" />
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
