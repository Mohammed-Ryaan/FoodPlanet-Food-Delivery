import React from "react";
import { useSelector } from "react-redux";
import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const user = useSelector((state) => state.user.userDetails);
  return (
    <div
      className="flex items-center justify-center flex-col pt-6 w-full
    h-full"
    >
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md: w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "GitHub Commits",
                    backgroundColor: "#f87979",
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                  },
                ],
              }}
              labels="months"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
                datasets: [
                  {
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                    ],
                    data: [40, 20, 80, 10],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DBHome;
