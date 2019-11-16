import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialTable from "material-table";
import { tableIcons } from './TableConfigs';
import { getWebsitesSelectors } from '../../../dispatchers/websitesDispatchers';
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

class WebsitesSelectorsManagement extends React.Component<MyProps> {
  state = {
    websitesSelectors: []
  }

  componentDidMount() {
    this.props.getWebsitesSelectors().then(selectorsData => this.setState({ websitesSelectors: selectorsData }))
  }


    render() {
      console.log(this.props.websites.selectors)
      return (
        <div>
          <MaterialTable
            icons={tableIcons}
            columns={columns}
            data={this.state.websitesSelectors}
            editable={{
              onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  console.log('newData, oldData: ', newData, oldData);
                  resolve();

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