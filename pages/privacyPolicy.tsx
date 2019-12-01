import PagesTabs from '../components/Shared/PagesTabs';
import Layout from '../components/Layout';
import Paper from '@material-ui/core/Paper';
import '../styles/privacyPolicy.scss'

const PrivacyPolicy = () => {
    return <Layout>
        <div className="privacypolicy-container">
            {PagesTabs(2)}
            <Paper className="privacypolicy__content">
                <h1>Privacy Policy</h1>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit. Aenean commodo ligula eget dolor. Aenean massa
                <strong>strong</strong>. Cum sociis natoque penatibus
                et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque
                eu, pretium quis, sem. Nulla consequat massa quis
                enim. Donec pede justo, fringilla vel, aliquet nec,
                vulputate eget, arcu. In enim justo, rhoncus ut,
                imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede <a class="external ext" href="#">link</a>
                mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate
                eleifend tellus. Aenean leo ligula, porttitor eu,
                consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                dapibus in, viverra quis, feugiat a, tellus. Phasellus
                viverra nulla ut metus varius laoreet. Quisque rutrum.
                Aenean imperdiet. Etiam ultricies nisi vel augue.
                Curabitur ullamcorper ultricies nisi.</p>

                <h1>Cookie information</h1>
                <p>To give you the best possible experience, this site uses cookies and by continuing to use the site you agree that we can save them on your device.
                    Cookies are small text file which are placed on your computed and which remember you preferences/some details of your visit.
                </p>
            </Paper>
        </div>
    </Layout>
}

export default PrivacyPolicy;