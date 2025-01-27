import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { 
    faCreditCard, 
    faMoneyBillTrendUp,
    faUser,
    faWallet
} from '@fortawesome/free-solid-svg-icons';
import './navIcon.css';

interface NavIconProps {
    target: string,
    handleClick: Function,
    icon: IconDefinition,
    text: string
}

const iconMap = {
    "credit-card": faCreditCard,
    // "building-columns": buildingColumns(),
    // "money-bill": moneyBill(),
    "money-bill-trend-up": faMoneyBillTrendUp,
    "wallet": faWallet,
    "user": faUser
}

export default function NavIcon(props: NavIconProps): React.FunctionalComponent {
    return(
        <div onClick={(e) => props.handleClick(e)} className="nav-icon-link flexc noselect">
            <div className="nav-icon flexc">
                <FontAwesomeIcon size="lg" icon={props.icon} />
            </div>
            <div className="nav-icon-text">
                {props.text}
            </div>
        </div>
    )
}