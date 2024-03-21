import React from 'react'
import { GeneralInfo } from './GeneralInfo'
import { NavigationData } from './NavigationData'
import { FuelData } from './FuelData'

export const Main = () => {
    return (
        <div>
            <GeneralInfo/>
            <NavigationData/>
            <FuelData/>
        </div>
    )
}