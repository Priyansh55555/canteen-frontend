import {  ChartColumn, Clock5, List } from "lucide-react"

const Statics =  [{
      heading: "Total Orders Today",
      statics: "23",
      icon: {
        icon: ChartColumn,
        color: "blue"
      }
    }, {
      heading: "Current Serving",
      statics: "23",
      icon: {
        icon: Clock5,
        color: "green"
      }
    }, {
      heading: "Pending Orders",
      statics: "23",
      icon: {
        icon: List,
        color: "orange"
      }
    }];

export { Statics };