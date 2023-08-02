import {ICity} from "../../types/city.types";
import {ISelectOption, ISelectValue, Override, SelectAsyncProps} from "../../../main/types/main.types";
import {FC, useEffect, useState} from "react";
import SelectAsync from "../../../main/components/select-async/select-async.component";
import {createSelectOption, mapToSelectOptions} from "../../../main/others/others.utils";
import {GEO_API_URL, geoApiOptions} from "../../apis/city.api";
import './city-select.componet.scss';

export type ICitySelectEvent = {
    type: "SELECTED",
    payload: {
        city: ICity | null
    }
};

type CitySelectProps = Override<SelectAsyncProps<ICity>, {
    value: ICity | undefined | null;
    onChange: (event: ICitySelectEvent) => void;
    loadOptions?: never;
}>;

const CitySelect: FC<CitySelectProps> = (props) => {

    const {
        value,
        label = "City",
        onChange,
    } = props;

    const [localSelected, localSelectedSet] = useState<ISelectValue<ICity>>(undefined);
    const [loading, loadingSet] = useState<boolean>(false);

    const loadOptions = (inputValue: string, callback: (options: ISelectOption<ICity>[]) => void) => {
        (async () => {
            try {
                loadingSet(true);

                if (inputValue === '') {
                    callback([]);
                    return;
                }

                const response = await fetch(`${GEO_API_URL}/cities?namePrefix=${inputValue}`, geoApiOptions);
                const result = await response.json();

                const cities: ISelectOption<ICity>[] = mapToSelectOptions(result.data, 'id', 'name');

                callback(cities);
                loadingSet(false);
            } catch (e) {
                console.error(e);
                callback([]);
                loadingSet(false);
            }
        })();
    }

    const onSelectChange = (selected: ISelectOption<ICity>) => {
        onChange({
            type: "SELECTED",
            payload: {
                city: selected?.value
            }
        });
    }

    useEffect(() => {
        if (value) {
            localSelectedSet(createSelectOption(value, "id", "name"));
        }
        else {
            localSelectedSet(undefined);
        }
    }, [value]);

    return (
        <div className="city-select-component">
            <SelectAsync
                placeholder="Type a location..."
                isDisabled={props.isDisabled}
                isLoading={loading || props.isLoading}
                value={localSelected}
                loadOptions={loadOptions}
                onChange={onSelectChange}
            />
        </div>
    );

}

export default CitySelect;
