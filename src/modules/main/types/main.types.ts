import {GroupBase} from "react-select";
import {AsyncProps} from "react-select/async";
import React from "react";

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type ISelectOption<ValueType> =  {
    key: string,
    label: React.ReactNode,
    value: ValueType
};

export type ISelectValue<ValueType> =  ISelectOption<ValueType> | undefined | null;

export type SelectAsyncProps<ValueType, IsMulti extends boolean = false, Group extends GroupBase<ValueType> = GroupBase<ValueType>> = Override<AsyncProps<ValueType, IsMulti, Group> , {
    value: ValueType | null | undefined
    onChange: (value: ValueType) => void;
    label?: string;
    error?: boolean;
    helperText?: React.ReactNode;
    readOnly?: boolean;
    debounce?: number;
    loadOptions: (inputValue: string, callback: (options: ValueType[]) => void ) => void,
}>;
