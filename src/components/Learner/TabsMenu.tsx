import React from "react";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";


import LearnerApplication from "./LearnerApplication";
import LearnerProfile from "./LearnerProfile";



const TabsMenu = () => {
    
  return (
    <div>
      <Tabs variant="unstyled">
        <TabList>
          <Tab
            _selected={{ color: "black", fontWeight: "bold" }} 
            color="gray.500" 
          >
            Application
          </Tab>
          <Tab
            _selected={{ color: "black", fontWeight: "bold" }} 
            color="gray.500" 
          >
            Profile
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LearnerApplication/>
          </TabPanel>
          <TabPanel>
          <LearnerProfile/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default TabsMenu;
