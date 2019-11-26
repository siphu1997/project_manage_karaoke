export const formatDataRoomCTS = data => ({
  is_using: data.isUsing ? 1 : 0,
  room_name: data.roomName,
  room_id: data.roomId,
  roomtype: {
    roomtype_id: data.roomType
  },
  status: data.isActive ? 1 : 0
});

export const formatDataRoomSTC = item => ({
  isUsing: item.is_using === 1 ? true : false,
  isActive: item.status === 1 ? true : false,
  roomId: item.room_id,
  roomName: item.room_name,
  roomPrice: item.roomtype.roomtype_price,
  roomType: item.roomtype.roomtype_id
});

// isActive: true;
// isUsing: false;
// roomId: 4;
// roomName: "P.201";
// roomPrice: 120000;
// roomType: 1;
// roomtype: {
//   roomtype_id: 4;
// }
