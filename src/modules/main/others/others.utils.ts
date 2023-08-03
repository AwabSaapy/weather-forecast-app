import {ISelectOption} from "../types/main.types";

export const createSelectOption = <ItemType>(item: ItemType, keyBy: keyof ItemType, labelBy: keyof ItemType | ((item: ItemType) => React.ReactNode)): ISelectOption<ItemType> => {

    let label: React.ReactNode;
    if (typeof labelBy === 'function') {
        label = labelBy(item);
    }
    else {
        label = item[labelBy] as unknown as React.ReactNode;
    }

    const option: ISelectOption<ItemType> = {
        key: item[keyBy] as unknown as string,
        label: label,
        value: item,
    }
    return option;
}

export const mapToSelectOptions = <ItemType>(items: ItemType[], keyBy: keyof ItemType, labelBy: keyof ItemType | ((item: ItemType) => React.ReactNode)): ISelectOption<ItemType>[] => {
    const options: ISelectOption<ItemType>[] = items.map((item) => {
        return createSelectOption(item, keyBy, labelBy);
    });
    return options;
};

export const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
