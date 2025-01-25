import React from 'react';
import creditCard from '../../icons/CreditCard.tsx';
import buildingColumns from '../../icons/BuildingColumns.tsx';
import moneyBill from '../../icons/MoneyBill.tsx';
import wallet from '../../icons/Wallet.tsx';
import moneyBillTrendUp from '../../icons/MoneyBillTrendUp.tsx';
import user from '../../icons/User.tsx';
import './navIcon.css';

interface NavIconProps {
    icon: string,
    text: string
}

const iconMap = {
    "credit-card": creditCard(),
    "building-columns": buildingColumns(),
    "money-bill": moneyBill(),
    "money-bill-trend-up": moneyBillTrendUp(),
    "wallet": wallet(),
    "user": user()
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