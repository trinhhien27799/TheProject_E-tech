import React from 'react'
import { Button, Image, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import { Table, Row, Rows } from 'react-native-table-component';
import { Touchable } from 'react-native-web';

const tableHeader = ["Tên Sản Phẩm", "Số Lượng", "Giá Tiền"];

const tableBody = [
    ['John', '25', 'Pizza'],
    ['Jane', '30', 'Sushi'],
    ['Mike', '35', 'Burger']
];

const BillScreen = () => {
  return (
    <View>
        {/* Order Result */}
        <View style={tailwind `py-5 flex-auto flex-row justify-center bg-lime-600 w-full`}>
            <Text style={tailwind`text-xl font-bold text-white`}>
                Đơn hàng đã giao thành công
            </Text>

            <Image 
                source={require('../img/billScreen/check_463574.png')}
                style={tailwind `ml-3 w-5 h-5 self-center mt-1`}
            />
        </View>    
        
          <View style={tailwind `p-5 px-10 flex-auto`}>
              {/* Bill Detail */}
              <View>
                  <Text>Mã đơn hàng: ẠUN132443</Text>
                  <Text>Ngày mua: 30/10/2023</Text>
                  <Text>Người mua: Nguyễn Văn A</Text>
                  <Text>Các đơn hàng: </Text>
              </View>

              {/* Bill Table */}
              <Table
                  borderStyle={{ borderWidth: 1 }}
                  style={tailwind`my-5`}
              >
                  <Row data={tableHeader} style={{ backgroundColor: '#f1f8ff' }} textStyle={{ margin: 6 }} />
                  <Rows data={tableBody} textStyle={{ margin: 6 }} />
              </Table>

              <View style={tailwind`mb-5`}>
                  <Text>Phương thức thanh toán: Chuyển khoản</Text>
                  <Text>Địa chỉ thanh toán: số nhà 15, ngõ 350, đường Lạc Long Quân, Tây Hồ, Hà Nội</Text>
              </View>

              <TouchableOpacity
                  style={tailwind`rounded-lg bg-blue-400 py-3`}
              >
                  <Text style={tailwind`font-bold text-white self-center`}>Lưu ảnh hóa đơn</Text>
              </TouchableOpacity>
          </View>
        
    </View>
  )
}

export default BillScreen