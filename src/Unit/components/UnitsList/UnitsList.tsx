import React from 'react';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
//Styled components
import { 
    UnitsListItem,
    UnitListItemRow, 
    UnitsListContainer, 
} from './UnitsList.styles';
//Hooks
import useSupervision from '../../../Shared/store/hooks/supervision/useSupervision';

const UnitsList: React.FC = () => {
    /**
     * Hooks
     */
    //Store
    const { 
        units,
        setCurrentUnit 
    } = useSupervision();

    return (
        <UnitsListContainer>
            <Label fontWeight='600'>Seleccione la unidad:</Label>
            {
                units.map(unit => (
                    <UnitsListItem 
                        key = { unit.id_unit }
                        onPress = { () => setCurrentUnit(unit) }
                    >
                        <UnitListItemRow>
                            <Label fontWeight='bold'>Eco: </Label>
                            <Label> { unit.eco }</Label>
                        </UnitListItemRow>
                        <UnitListItemRow>
                            <Label fontWeight='bold'>Ruta: </Label>
                            <Label> { unit.route.name }</Label>
                        </UnitListItemRow>
                        <UnitListItemRow>
                            <Label fontWeight='bold'>Placas: </Label>
                            <Label> { unit.licence_plate }</Label>
                        </UnitListItemRow>
                    </UnitsListItem>
                ))
            }
        </UnitsListContainer>
    )
}

export default UnitsList;