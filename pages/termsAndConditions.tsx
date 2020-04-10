import PagesTabs from '../components/Shared/PagesTabs';
import Layout from '../components/Layout';
import Paper from '@material-ui/core/Paper';
import '../styles/termsAndConditions.scss'

const termsAndConditions = () => {
    return <Layout title="DDiscount Hero  | Terms & Conditions">
        <div className="termsandconditions-container">
            {PagesTabs(1)}
            <Paper className="termsandconditions-container__content">
                <h1>Terms & Conditions</h1>

                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit. Aenean commodo ligula eget dolor. Aenean massa
                <strong>strong</strong>. Cum sociis natoque penatibus
                et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque
                eu, pretium quis, sem. Nulla consequat massa quis
                enim. Donec pede justo, fringilla vel, aliquet nec,
                vulputate eget, arcu. In enim justo, rhoncus ut,
                imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede <a href="#">link</a>
                mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate
                eleifend tellus. Aenean leo ligula, porttitor eu,
                consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                dapibus in, viverra quis, feugiat a, tellus. Phasellus
                viverra nulla ut metus varius laoreet. Quisque rutrum.
                Aenean imperdiet. Etiam ultricies nisi vel augue.
                Curabitur ullamcorper ultricies nisi.</p>
            </Paper>
        </div>
    </Layout>
}

export default termsAndConditions;