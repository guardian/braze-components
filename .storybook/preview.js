import { addParameters } from "@storybook/react";
import { breakpoints } from "@guardian/src-foundations";


const viewportMeta = {
  mobile: {
    name: "Mobile",
    type: "mobile",
  },
  mobileMedium: {
    name: "Mobile Medium",
    type: "mobile",
  },
  mobileLandscape: {
    name: "Mobile Landscape",
    type: "mobile",
  },
  phablet: {
    name: "Phablet",
    type: "mobile",
  },
  tablet: {
    name: "Tablet",
    type: "tablet",
  },
  desktop: {
    name: "Desktop",
    type: "desktop",
  },
  leftCol: {
    name: "Left Col",
    type: "desktop",
  },
  wide: {
    name: "Wide",
    type: "desktop",
  },
};
const viewportEntries = Object.entries(breakpoints).map(([name, width]) => {
  return [
    name,
    {
      name: viewportMeta[name].name,
      styles: {
        width: `${width}px`,
        height: "100%",
      },
      type: viewportMeta[name].type,
    },
  ];
});
const viewports = Object.fromEntries(viewportEntries);

addParameters({
  viewport: {
    viewports,
    defaultViewport: "responsive",
  },
  layout: 'fullscreen'
});
