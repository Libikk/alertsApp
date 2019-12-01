import PagesTabs from '../components/Shared/PagesTabs';
import Layout from '../components/Layout';
import Paper from '@material-ui/core/Paper';
import '../styles/about.scss'

const About = () => {
    return <Layout>
            <div className="about-container">
            {PagesTabs(0)}
            <Paper className="about-container__content">
                <h1>About DDiscount hero </h1>

                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit. Aenean commodo ligula eget dolor. Aenean massa
                <strong>strong</strong></p>

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
                Curabitur ullamcorper ultricies nisi.</p>

                <p>Lorem ipsum nim justo, rhoncus ut,
                imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede <a class="external ext" href="#">link</a>
                mollis pretium. Integer tincidunt. Cras dapibus.
                Curabitur ullamcorper ultricies nisi.</p>

                <p>Marek Kregiel - <a href="https://www.linkedin.com/in/marek-kregiel-259925103" target="_blank">LinkedIn</a></p>
            </Paper>
        </div>
    </Layout>
}

export default About;