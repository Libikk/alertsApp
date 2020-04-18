import PagesTabs from '../components/Shared/PagesTabs';
import Layout from '../components/Layout';
import Paper from '@material-ui/core/Paper';
import '../styles/about.scss'

const About = () => {
    return <Layout title="DDiscount Hero  | About">
            <div className="about-container">
            {PagesTabs(0)}
            <Paper className="about-container__content">
                <h1>About DDiscount hero </h1>

                <p>As we all know there are lots of products which get discounted for a specific period of time and then after that it gets back to normal :(
                    I think no one likes to pay more for something they could get cheaper. DDiscount hero is here to help.</p>

                <p>As I respect time, I don't want to spend it on continuous discount hunting, as there is plenty of other amazing things I want to do... and create :)</p>

                <p>I thought to myself - there must be a way around it! Couple of days later, a very rough, blurry solution came up in my head. I saw the "whole thing", which was later named DDiscount Hero, easy and functional site to use. Programming experience and working with the latest technology, helped me to design the system which allows anybody to find the product they love, at a cheaper price!</p>


                <p>Marek Kregiel - <a href="https://www.linkedin.com/in/marek-kregiel-259925103" target="_blank"><b>LinkedIn</b></a> or <b>developer@marekregiel.com</b></p>
            </Paper>
        </div>
    </Layout>
}

export default About;