import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import { tableIcons } from './TableConfigs';
import { getWebsitesSelectors, updateWebsiteSelector } from '../../../dispatchers/websitesDispatchers';
import { testProductsScan } from '../../../dispatchers/scansDispatchers';
import { useDispatch, useSelector } from 'react-redux'
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
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
  const [websitesSelectorsUnchanged, setWebsitesSelectorsUnchanged] = useState([]);
  const [testProductsData, setTestProductsData] = useState([]);

  useEffect(() => {
    dispatch(getWebsitesSelectors())
      .then(selectorsData => setWebsitesSelectors(selectorsData))
  }, [])

  const onSaveClick = (rowData) => {
    return rowData.map(singleRowData =>
      dispatch(updateWebsiteSelector(singleRowData))
        .then(() => {
          const updatedSelectors = websitesSelectors.map(selector => selector.id === singleRowData.id ? singleRowData : selector);
          return setWebsitesSelectorsUnchanged(updatedSelectors);
        })
        .catch(() => {
          alert(`${singleRowData.id} hasn't been updated`)
        })
  )
  }

   const onRowUpdate = (newData) => {
        const updatedSelectors = websitesSelectors.map(selector => selector.id === newData.id ? newData : selector);
        setWebsitesSelectors(updatedSelectors);
        return Promise.resolve();
  };

  const testProductsScan = (rowData) => {
    console.log('rowData: ', rowData);
    setTestProductsData(rowData)
  }

  const actions = [
    {
      icon: tableIcons.Save,
      tooltip: 'Save Row',
      onClick: (event, rowData) => onSaveClick(rowData)
    },
    {
      icon: 'T',
      tooltip: 'Test selectors',
      onClick: (event, rowData) => testProductsScan(rowData)
    }
  ]

  return (
      <div className="website-products-management">
        <Modal
          className="website-products-management__modal-product-test"
          open={testProductsData.length}
          onClose={() => setTestProductsData([])}
        >
          <Card>
                <ul>
                  <li className="">
                    <div>Product on discount</div>
                    <div>Product <u>NOT</u> discounted</div>
                  </li>
              {
                testProductsData.map(singleWebData => {
                    return <li>
                        <TextField name='Product on discount' label={singleWebData.hostName} value={singleWebData.id}/>
                        <TextField name='Product not discounted' label={singleWebData.hostName} value={singleWebData.id}/>
                      </li>
                })
              }
              </ul>
          </Card>
        </Modal>
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={websitesSelectors}
          editable={{
            onRowUpdate,
          }}
          options={{
            selection: true,
          }}
          actions={actions}
          title="Websites management"
        />
      </div>
  );
}

export default WebsitesSelectorsManagement