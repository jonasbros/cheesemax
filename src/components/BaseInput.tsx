import React from 'react'
import _ from 'lodash'

interface inputPropsInterface {
    type: string; 
    labelHidden: boolean; 
    required: boolean;
    label: string;
}

interface BaseInputInterface { 
    inputProps: inputPropsInterface;
    onInput: Function;
    onDebouncedInput: Function;
    onClick: Function;
    onBlur: Function;
}

function BaseInput({ inputProps, onInput, onDebouncedInput, onClick, onBlur }: BaseInputInterface) {
    const debounceInput = _.debounce((target) => {
        onDebouncedInput(target)
    }, 500)

    const debounceBlur = _.debounce(() => {
        onBlur()
    }, 100)

    return (
        <>
            <label className={inputProps.labelHidden ? 'hidden' : ''} htmlFor={inputProps.type}>{inputProps.label}</label>
            <input 
                className="p-4 w-full border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 ring-blue-500" 
                id={inputProps.type} 
                type={inputProps.type} 
                placeholder={inputProps.label}
                required={inputProps.required}
                autoComplete="pepelaugh"
                onKeyUp={(e) => {
                    onInput()
                    debounceInput(e.target)
                }}
                onClick={(e) => onClick(e.target)}
                onBlur={() => debounceBlur()}
            />
        </>
    )
}



export default BaseInput