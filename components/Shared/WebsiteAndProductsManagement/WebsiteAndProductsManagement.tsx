import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialTable from "material-table";
import { tableIcons } from './TableConfigs';
import { getWebsitesSelectors, updateWebsiteSelector } from '../../../dispatchers/websitesDispatchers';
import { useDispatch, useSelector } from 'react-redux'
// // interface AuthObj {
// //   currentUser: {
// //     userName: string,
// //     userId: number,
// //     email: string
// //   }
// // }

// type MyProps = {
//   auth: AuthObj | null,
// };
const columns = [
  { title: "hostName", field: "hostName" },
  { title: "url", field: "url" },
  { title: "isDiscountSelector", field: "isDiscountSelector" },
  { title: "isDiscountSelectorRegex", field: "isDiscountSelectorRegex" },
  { title: "isClientSideCheck", field: "isClientSideCheck" },
  { title: "imageSelector",  field: "imageSelector" },
  { title: "productNameSelector", field: "productNameSelector" },
  { title: "productPriceSelector", field: "productPriceSelector" },
  { title: "productDiscountedPriceSelector", field: "productDiscountedPriceSelector" },
]

const WebsitesSelectorsManagement = () => {
  // const state = useSelector(state => state);
  const dispatch = useDispatch()

  const [websitesSelectors, setWebsitesSelectors] = useState([]);

  useEffect(() => {
    dispatch(getWebsitesSelectors())
      .then(selectorsData => setWebsitesSelectors(selectorsData))
  }, [])

   const onRowUpdate = (newData) => {
    return dispatch(updateWebsiteSelector(newData))
      .then(() => {
        const updatedSelectors = websitesSelectors.map(selector => selector.id === newData.id ? newData : selector);
        return setWebsitesSelectors(updatedSelectors);
      });
  };

  return (
      <div>
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={websitesSelectors}
          editable={{
            onRowUpdate,
          }}
          title="Websites management"
        />
      </div>
  );
}

export default WebsitesSelectorsManagement