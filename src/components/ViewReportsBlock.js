import xc from "../@x-console/x-console";

import { REPORT_UNC_MATERIALS_URL } from "../assets/data/urls";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { showNotification } from "../redux/features/notificationSlice";
import { showProgress, hideProgress } from "../redux/features/progressSlice";

export default function ViewReportsBlock() {
  const [materials, setMaterials] = useState({
    confirmed: [],
    unconfirmed: [],
    returned: [],
  });

  const [materialsReports, setMaterialsReports] = useState({
    confirmed: [],
    unconfirmed: [],
    returned: [],
  });

  const dispatch = useDispatch();

  // xc.rnd("ViewReportsBlock");
  // console.log(`materials`, materials);
  // console.log(`materialsReports`, materialsReports);

  useEffect(() => {
    getMaterialsReport();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unconfirmedReports = [];

    const previousReport = () => {
      if (unconfirmedReports.length > 0) {
        return unconfirmedReports.length - 1;
      } else {
        return 0;
      }
    };

    let reportSum = 0;

    for (let i = 0; i < materials.unconfirmed.length; i++) {
      if (i === 0) {
        reportSum = materials.unconfirmed[i].sum;

        addReport();
      } else {
        if (
          materials.unconfirmed[i].report !==
          materials.unconfirmed[i - 1].report
        ) {
          unconfirmedReports[previousReport()] = {
            ...unconfirmedReports[previousReport()],
            reportSum,
          };

          reportSum = materials.unconfirmed[i].sum;

          addReport();
        } else {
          reportSum += materials.unconfirmed[i].sum;
        }
      }

      if (i === materials.unconfirmed.length - 1)
        unconfirmedReports[previousReport()] = {
          ...unconfirmedReports[previousReport()],
          reportSum,
        };

      function addReport() {
        const report = materials.unconfirmed[i];

        unconfirmedReports.push({
          reportNumber: report.report,
          reportDate: report.date,
          reportTime: report.time,
          reportType: report.type,
          reportLabel: report.label,
        });
      }
    }

    setMaterialsReports({
      ...materialsReports,
      unconfirmed: unconfirmedReports,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materials]);

  async function getMaterialsReport() {
    dispatch(showProgress("Завантаження звітів..."));

    await fetch(REPORT_UNC_MATERIALS_URL)
      .then((response) => response.json())
      .then((response) => {
        setMaterials({ ...materials, unconfirmed: response.data });
        dispatch(hideProgress());
      })
      .catch((error) => {
        dispatch(hideProgress());
        dispatch(showNotification(error));

        xc.e(error);
      });
  }

  return (
    <div>
      {materialsReports.unconfirmed[0]?.reportNumber && (
        <div>
          <ul>
            {materialsReports.unconfirmed.map((item) => {
              return (
                <li
                  style={{
                    display: "flex",
                    width: "95%",
                    gap: "20px",
                    marginBottom: "20px",
                    padding: "10px 0",
                    borderTop: "2px solid #a55",
                    borderBottom: "2px solid #a55",
                  }}
                  key={item.reportNumber}
                >
                  <div>
                    Звіт <b>{item.reportNumber}</b> від {item.reportDate}{" "}
                    {item.reportTime}
                  </div>

                  <div>{item.reportType}</div>

                  <div>
                    Сума: <b>{item.reportSum} грн</b>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
