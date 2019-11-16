import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialTable from "material-table";
import TableIcons from './TableIcons';
import { getWebsitesSelectors } from '../../dispatchers/websitesDispatchers';
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

class WebsitesSelectorsManagement extends React.Component<MyProps> {

  componentDidMount() {
    this.props.getWebsitesSelectors()
  }

  state = {
    isModalOpen: false,
    openMenu: false,
    anchorEl: null
  }

    render() {
      console.log(this.props.websites.selectors)
      const websiteSelectors = this.props.websites.selectors || []
      return (
        <div>
          <MaterialTable
            icons={TableIcons}
            columns={[
              { title: "hostName", field: "hostName" },
              { title: "url", field: "url" },
              { title: "isDiscountSelector", field: "isDiscountSelector" },
              { title: "isDiscountSelectorRegex", field: "isDiscountSelectorRegex" },
              { title: "isClientSideCheck", field: "isClientSideCheck" },
              { title: "imageSelector",  field: "imageSelector" },
              { title: "productNameSelector", field: "productNameSelector" },
              { title: "productPriceSelector", field: "productPriceSelector" },
              { title: "productDiscountedPriceSelector", field: "productDiscountedPriceSelector" },
            ]}
            data={websiteSelectors}
            editable={{
              isEditable: rowData => rowData.isClientSideCheck === "isClientSideCheck", // only name(a) rows would be editable
              onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    console.log('newData: ', newData);
                    console.log('oldData: ', oldData);
                  }
                }, 600);
              }),
            }}
            title="Websites management"
          />
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getWebsitesSelectors: bindActionCreators(getWebsitesSelectors, dispatch),
});

export default connect(state => state, mapDispatchToProps)(WebsitesSelectorsManagement)