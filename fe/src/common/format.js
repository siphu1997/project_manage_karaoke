/**FORMAT_ROOM */
export const formatDataRoomCTS = data => ({
  is_using: data.isUsing ? 1 : 0,
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
/**FORMAT_ACCOUNT */

export const formatDataAcountCTS = (data, allRoles) => {
  const resultData = { ...data };
  // const roles = allRoles.filter(r => r.id === resultData.roleType);
  delete resultData.roleType;
  return resultData;
};
export const formatDataAcountSTC = item => {
  console.log(item);
  if (Array.isArray(item)) {
    return item.map(i => ({
      ...i,
      roleType: i.roles_id
    }));
  }
  return { ...item, roleType: item.roles_id };
};

export const formatLookupRole = roles => {
  let result = {};
  roles.forEach(role => {
    result = { ...result, [role.id]: role.name };
  });
  // roles.map(role => {
  //   result = { ...result, [role.id]: role.name };
  //   return;
  // });
  return result;
};

// isActive: true;
// isUsing: false;
// roomId: 4;
// roomName: "P.201";
// roomPrice: 120000;
// roomType: 1;
// roomtype: {
//   roomtype_id: 4;
// }
