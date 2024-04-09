// import {Layout, Divider, ConfigProvider, theme} from 'antd';
// import {Outlet} from "react-router-dom";
// const { Header, Footer, Sider, Content } = Layout;
// export default function _Layout(){
//   return <Layout>
//     <Header className="bg-white">header</Header>
//     <Divider/>
//     <Layout style={{marginTop: 10}}>
//       <Sider width="10%">left sidebar</Sider>
//       <Content><Outlet/></Content>
//     </Layout>
//
//     <Footer className="sticky bottom-0 left-0 w-full">© 2003–2024 Кинопоиск. 18+</Footer>
//   </Layout>
// }

import { Outlet } from "react-router-dom";
import { Box, Stack, Text } from "@chakra-ui/react";

export default function Layout() {
  return (
    <Box h="100%" bg="black">
      <Stack p={2}>
        <Text
          fontWeight={600}
          fontSize="4xl"
          color="orange.400"
          textAlign="center"
        >
          Кинопоиск
        </Text>
      </Stack>
      <Box
        h="100%"
        p={4}
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <Outlet />
      </Box>
    </Box>
  );
}
