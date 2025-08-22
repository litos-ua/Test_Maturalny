import './AboutPage.css';
import { FOOTER_IMAGE } from "../../resources";


export function AboutPage() {

    return (
        <div>
            <div className="about-page__content">
                <h1>AboutTitle</h1>
                <p>AboutText1</p>

                <img
                    src={FOOTER_IMAGE.ABOUT}
                    alt='AboutAlt'
                    className="about-page__image"
                />

                <h2 className="about-page__content__h2">AboutMissionTitle</h2>
                <p>AboutMissionText</p>

                <h2 className="about-page__content__h2">AboutValuesTitle</h2>
                <ul>
                    <li>AboutValueQuality</li>
                    <li>AboutValueReliability</li>
                    <li>AboutValueProfessionalism</li>
                    <li>AboutValueResponsibility</li>
                </ul>
            </div>
        </div>
    );
}