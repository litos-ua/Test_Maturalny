
import './ContactsPage.css';
import { useState } from 'react';

export function ContactsPage() {
const [togglerState, setTogglerState] = useState(false);
    return (
        <div>
            <div className="contacts-page__content">
                { !togglerState && (<div>
                    <h1>ContactsTitle</h1>
                    <p>ContactsDescription</p>

                    <h2 className="contacts-page__content__h2">ContactsAddressTitle</h2>
                    <a href="https://www.google.com.ua/maps/place/Hillel+IT+School/@50.4370536,30.530262,17z/data=!4m14!1m7!3m6!1s0x40d4cf07295b8e39:0x41f43bbd96473152!2sHillel+IT+School!8m2!3d50.4370536!4d30.5328369!16s%2Fg%2F11bxfwtw36!3m5!1s0x40d4cf07295b8e39:0x41f43bbd96473152!8m2!3d50.4370536!4d30.5328369!16s%2Fg%2F11bxfwtw36?hl=ru&entry=ttu">
                        ContactsAddress
                    </a>

                    <h2 className="contacts-page__content__h2">ContactsPhoneTitle</h2>
                    <a href="tel:0800000000" className="phone">ContactsPhone</a>

                    <h2 className="contacts-page__content__h2">ContactsEmailTitle</h2>
                    <a href="mailto:react@example.com">ContactsEmail</a>

                    <h2 className="contacts-page__content__h2">ContactsHoursTitle</h2>
                    <p>ContactsHours</p>
                </div> 
            )}
            </div>
        </div>
    );
}
