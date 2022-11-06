/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useConfig } from '../../store/config/configHook';

function ContactBubble() {
    const config = useConfig();
    const urlZalo = `https://zalo.me/${config?.zalo}`;

    const onRedirect = () => {
        if (urlZalo) {
            window.open(urlZalo, '_blank')?.focus();
        }
    };

    return (
        <div className="zalo-bubble-wrapper" onClick={onRedirect} />
    );
}

export default ContactBubble;
