// import React from "react";
// import { Users, UserCheck, Calendar, ShieldAlert } from "lucide-react";
// import { StatsCard } from "../../../ui/statsCard";


// const AdminQuickActions = () => {
//   return (
   
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
//           <StatsCard
//             title="Total Users"
//             value="1,258"
//             icon={Users}
//             trend={{ value: 12, isPositive: true }}
//           />
//           <StatsCard
//             title="Registered Doctors"
//             value="84"
//             icon={UserCheck}
//             description="2 pending approvals"
//           />
//           <StatsCard
//             title="Today's Appointments"
//             value="156"
//             icon={Calendar}
//           />
//           <StatsCard
//             title="System Alerts"
//             value="3"
//             icon={ShieldAlert}
//             description="Action required"
//             className="border-l-4 border-medical-amber"
//           />
//         </div>
//   );
// };

// export default AdminQuickActions;



import React from "react";
import { Users, UserCheck, Calendar, ShieldAlert } from "lucide-react";
import { StatsCard } from "../../../ui/statsCard";

const AdminQuickActions = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Users"
        value="1,258"
        icon={Users}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Registered Doctors"
        value="84"
        icon={UserCheck}
        description="2 pending approvals"
      />
      <StatsCard
        title="Today's Appointments"
        value="156"
        icon={Calendar}
      />
      <StatsCard
        title="System Alerts"
        value="3"
        icon={ShieldAlert}
        description="Action required"
        className="border-l-4 border-amber-400"
      />
    </div>
  );
};

export default AdminQuickActions;