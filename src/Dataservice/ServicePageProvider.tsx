import axiosInstance from "./Configs/axiosInstance";



export function addServices(editData:any) {
  editData.price   = editData.price.replace(/\,/g,'')
  editData.maxPrice= editData.maxPrice.replace(/\,/g,'')
  editData.minPrice= editData.minPrice.replace(/\,/g,'')
  console.log(editData.price);
  console.log(editData.maxPrice);
  console.log(editData.minPrice);
  if(editData.priceType === 0 ){
    console.log('fixed');
    
    return axiosInstance
    .post(`Service/addService`,{
      priceType : editData.priceType,
      serviceGroupId: editData.serviceCategoryId,
      name: editData.name,
      price: editData.price,
      maxPrice: 0,
      minPrice: 0,
      // pricePercentageLists : editData.pricePercentageLists
    })
    .then((response) => response);
      
  } else{
    console.log('change');
    return axiosInstance
      .post(`Service/addService`,{
        priceType : editData.priceType,
        serviceGroupId: editData.serviceCategoryId,
        name: editData.name,
        price: editData.price,
        maxPrice: editData.maxPrice,
        minPrice: editData.minPrice,
        // pricePercentageLists : editData.pricePercentageLists
      })
      .then((response) => response);    
  }

  }
  
  export function getَAllServices() {
      return axiosInstance
        .get(`Service/getAllServices`)
        .then((response) => response);
    }
  
    export function deleteServices(id:any) {
      return axiosInstance
        .delete(`Service/deleteService?Id=${id}`)
        .then((response) => response);
    }
   // editData.price = editData.price.replace(/\,/g,'')

    export function editServices(editData:any) {
      if( editData.priceType === 0 ){
        editData.price = editData.price.toString().split(',').join('')
        console.log(editData.price);
        return axiosInstance
        .post(`Service/editService`,{
          id :editData.id,
          priceType : editData.priceType,
          serviceGroupId: editData.serviceCategoryId,
          name: editData.name,
          price: editData.price,
          maxPrice: 0,
          minPrice: 0,
        })
        .then((response) => response);
      } 
      else if(editData.priceType === 1){
      editData.price      = editData.price.toString().split(',').join('')
      editData.maxPrice   = editData.maxPrice.toString().split(',').join('')
      editData.minPrice   = editData.minPrice.toString().split(',').join('')
      // editData.price   = editData.price.replace(/\,/g,'')

      // editData.maxPrice= editData.maxPrice.replace(/\,/g,'')
      // editData.minPrice= editData.minPrice.replace(/\,/g,'')
       console.log(editData.price);
      console.log(editData.maxPrice);
      console.log(editData.minPrice);
      return axiosInstance
      .post(`Service/editService`,{
        id :editData.id,
        priceType : editData.priceType,
        serviceGroupId: editData.serviceCategoryId,
        name: editData.name,
        price: editData.price,
        maxPrice: editData.maxPrice,
        minPrice: editData.minPrice,
        
      })
      .then((response) => response);
      }
      else{
        return Promise.reject(new Error("Invalid condition"));
      }
    }

    export function getValueBySearch(value:any) {
        return axiosInstance
        .get(`Service/SearchService?searchValue=${value}`,{
        })
        .then((response) => response);
    }




     
