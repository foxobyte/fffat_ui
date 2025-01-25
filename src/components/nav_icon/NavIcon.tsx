import React, { ReactSVG } from 'react';
import creditCard from '../../icons/CreditCard.tsx';
import buildingColumns from '../../icons/BuildingColumns.tsx';
import moneyBill from '../../icons/MoneyBill.tsx';
import Wallet from '../../icons/Wallet.tsx';

interface NavIconProps {
    icon: string,
    text: string
}

const iconMap = {
    "credit-card": creditCard(),
    "building-columns": buildingColumns(),
    "money-bill": moneyBill(),
    "wallet": Wallet()
}

export default function NavIcon(props: NavIconProps) {
    return(
        <div className="nav-icon-link flexc">
            <div className="nav-icon flexc">
                {iconMap[props.icon]}
            </div>
            <div className="nav-icon-text">
                {props.text}
            </div>
        </div>
    )
}