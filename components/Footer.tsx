import React from 'react';
import '../styles/footer.scss';
import { version } from '../appConfig';


export default class Footer extends React.Component {
    render() {
      return (
        <div className="container__footer">
            v: { version }
        </div>
    );
  }
}