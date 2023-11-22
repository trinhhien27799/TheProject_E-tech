import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import CheckPayScreen from './CheckPayScreen';
import tailwind from 'twrnc';

const FirstRoute = () => (
  <View style={tailwind `flex-1 justify-center bg-slate-200`} >
    <CheckPayScreen statusNumCheck={0}/>
  </View>
);

const SecondRoute = () => (
  <View style={tailwind `flex-1 justify-center bg-slate-200`} >
    <CheckPayScreen statusNumCheck={1}/>
  </View>
);

const ThirdRoute = () => (
  <View style={tailwind `flex-1 justify-center bg-slate-200`} >
    <CheckPayScreen statusNumCheck={2}/>
  </View>
);

const FourthRoute = () => (
  <View style={tailwind `flex-1 justify-center bg-slate-200`} >
    <CheckPayScreen statusNumCheck={3}/>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

export default function OrderScene() {
    const layout = useWindowDimensions();
  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Tất Cả' },
      { key: 'second', title: 'Xác Nhận Thanh Toán' },
      { key: 'third', title: 'Chờ Giao Hàng' },
      { key: 'fourth', title: 'Đã giao hàng' },
    ]);
  
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        sceneContainerStyle={tailwind}
      />
    );
  }