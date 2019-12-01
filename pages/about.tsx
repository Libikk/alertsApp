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

                <p>As we all know there are lots of products which get discounted for a specific period of time and then after that it get back to normal :(
                    I think no one like to pay more for something that could get a cheaper, waiting for discount sometimes cost too much attention.</p>

                <p>As I respect the time I don't want to spend it on this sort of things, there is plenty of the amazing stuff that I want to do... and build :)</p>

                <p>I thought to myself... there must be a way to make this process automated! couple of days later, a very rough, blurry solution came up in my head.
                    I saw the "whole thing", which was later named as DDiscount hero, pretty much functional. Programming experience and working with the latest technology,
                    helped me to design the system which automates the entire process!</p>


                <p>Marek Kregiel - <a href="https://www.linkedin.com/in/marek-kregiel-259925103" target="_blank">LinkedIn</a></p>
            </Paper>
        </div>
    </Layout>
}

export default About;