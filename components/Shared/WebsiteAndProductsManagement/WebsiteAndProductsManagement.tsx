import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import { tableIcons } from './TableConfigs';
import { getWebsitesSelectors, updateWebsiteSelector } from '../../../dispatchers/websitesDispatchers';
import { useDispatch, useSelector } from 'react-redux'
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { testProductsScan } from '../../../dispatchers/scansDispatchers';
import ProductTestedData from './ProductTestedData';
import '../../../styles/websitesSelectorsManagement.scss'


const columns = [
  { title: "url", field: "url" },
  { title: "isDiscountSelector", field: "isDiscountSelector" },
  { title: "isDiscountSelectorRegex", field: "isDiscountSelectorRegex" },
  { title: "isClientSideCheck", field: "isClientSideCheck" },
  { title: "imageSelector",  field: "imageSelector" },
  { title: "productNameSelector", field: "productNameSelector" },
  { title: "productPriceSelector", field: "productPriceSelector" },
  { title: "productDiscountedPriceSelector", field: "productDiscountedPriceSelector" },
  { title: "Discounted product url", field: "discountedProductUrl" },
  { title: "NOT discounted product url", field: "notDiscountedProductUrl" },
]

const WebsitesSelectorsManagement = () => {
  const dispatch = useDispatch()

  const [websitesSelectors, setWebsitesSelectors] = useState([]);
  const [isTesting, setIsTesting] = useState(false);
  const [websitesSelectorsUnchanged, setWebsitesSelectorsUnchanged] = useState([]);
  const [testData, setTestData] = useState([])

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

  const testProducts = (rowData) => {
      setIsTesting(true)
      return dispatch(testProductsScan(rowData))
          .then(res => {
              setTestData(res);
              setIsTesting(false)
          })
          .catch(console.error)
  }

   const onRowUpdate = (newData) => {
        const updatedSelectors = websitesSelectors.map(selector => selector.id === newData.id ? newData : selector);
        setWebsitesSelectors(updatedSelectors);
        return Promise.resolve();
  };

  const onModalClose = () => setTestData([]);

  const actions = [
    {
      icon: tableIcons.Save,
      tooltip: 'Save Row',
      onClick: (event, rowData) => onSaveClick(rowData)
    },
    {
      icon: 'T',
      tooltip: 'Test selectors',
      onClick: (event, rowData) => testProducts(rowData)
    }
  ]

  return (
      <div className="website-products-management">
        <Modal
          className="website-products-management__modal-product-test"
          open={testData.length}
        >
          <Card>
              <ProductTestedData testData={testData} onModalClose={onModalClose}/>
          </Card>
        </Modal>
        <MaterialTable
          paging={false}
          isLoading={isTesting}
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