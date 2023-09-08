import { IconAperture, IconLayoutDashboard, IconMoodHappy } from "@tabler/icons";
import { IconUsersGroup } from "@tabler/icons-react";
import { IconBuildingSkyscraper } from "@tabler/icons-react";
import { IconBrandBooking } from "@tabler/icons-react";
import { IconBuildingWarehouse } from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
   {
      navlabel: true,
      subheader: "Home",
   },
   {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/dashboard",
   },
   {
      id: uniqueId(),
      title: "Users",
      icon: IconUsersGroup,
      href: "/user",
   },
   {
      id: uniqueId(),
      title: "Hotels",
      icon: IconBuildingSkyscraper,
      href: "/hotel",
   },
   {
      id: uniqueId(),
      title: "Bookings",
      icon: IconBrandBooking,
      href: "/hotel",
   },
   {
      id: uniqueId(),
      title: "Inventory",
      icon: IconBuildingWarehouse,
      href: "/hotel",
   },

   {
      navlabel: true,
      subheader: "Extra",
   },
   {
      id: uniqueId(),
      title: "Icons",
      icon: IconMoodHappy,
      href: "/icons",
   },
   {
      id: uniqueId(),
      title: "Sample Page",
      icon: IconAperture,
      href: "/sample-page",
   },
];

export default Menuitems;
