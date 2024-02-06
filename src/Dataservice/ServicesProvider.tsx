import axiosInstance from "./Configs/axiosInstance";



export function createGroup(data:any) {
  return axiosInstance
    .post(`ServiceGroup/AddServiceGroup`,{
        groupName : data
    })
    .then((response) => response);
}

export function getGroup() {
    return axiosInstance
      .get(`ServiceGroup/GetServiceGroup`)
      .then((response) => response);
  }

  export function deleteGroup(id:any) {
    return axiosInstance
      .delete(`ServiceGroup/deleteServiceGroup?ServiceGroupId=${id}`)
      .then((response) => response);
  }


  export function editGroup(id:any,editData:any) {
    return axiosInstance
      .post(`ServiceGroup/EditServiceGroup`,{
        id:  id,
        groupName: editData
      })
      .then((response) => response);
  }

  export function getGroupByFilterSearch(id:any) {
    return axiosInstance
    .get(`Service/getServicesByServiceGroupId?groupId=${id}`,{
    })
    .then((response) => response);
}
export function getGroupBySearch(value:any) {
  return axiosInstance
  .get(`ServiceGroup/SearchServiceGroup?searchValue=${value}`,{
  })
  .then((response) => response);
}

export function getGroupByid(id:any) {
  return axiosInstance
  .get(`/Service/getServicesByServiceGroupId?groupId=${id}`,{
  })
  .then((response) => response);
}





  




  
