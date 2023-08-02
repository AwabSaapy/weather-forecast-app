import React, {useEffect, useId} from 'react';
import AsyncSelect from 'react-select/async';
import {SelectAsyncProps} from "../../types/main.types";
import "./select-async.component.scss";

const timeouts: { [target: string]: any } = {};

function SelectAsync<ValueType>(props: SelectAsyncProps<ValueType>): JSX.Element {

    const uniqId = useId();

    const {
        name,
        id = name,
        value = undefined,
        onChange,
        label = '',
        error = false,
        helperText,
        readOnly = false,
        debounce = 700,
        loadOptions,
        ...rest
    } = props;

    const handleChange = (value: any) => {
        if (readOnly) {
            return;
        }
        onChange(value);
    }

    const localLoadOptions = (inputValue: string, callback: (options: ValueType[]) => void ) => {
        clearTimeout(timeouts[uniqId]);
        timeouts[uniqId] = setTimeout(() => {
            loadOptions(inputValue, callback);
        }, debounce);
    }

    useEffect(() => {
        return () => {
            clearTimeout(timeouts[uniqId]);
        }
    }, []);

    return (
        <div className={["select-component", error? 'has-error' : '', readOnly? 'is-read-only' : ''].join(' ')}>
            <input type="hidden" stringified-value="true" name={ name } id={id+''} />
            <AsyncSelect
                id={id + '_react_select'}
                name={ name + '_select'}
                className={"hrc-select"}
                classNamePrefix={"hrc-select"}
                onChange={handleChange}
                menuPosition={'fixed'}
                value={value}
                openMenuOnClick={!readOnly}
                openMenuOnFocus={!readOnly}
                isClearable={!readOnly}
                isSearchable={!readOnly}
                {...rest}
                loadOptions={localLoadOptions}
                isMulti={false}
            />
        </div>
    );
}

export default SelectAsync;
