import React from 'react'

interface btnPropsInterface {
    type: any; 
    color: string; 
    text: string;
    size?: string;
}

interface BaseBtnInterface { 
    btnProps: btnPropsInterface;
    onClick?: Function;
}

function BaseBtn({ btnProps, onClick }: BaseBtnInterface) {
    let btnSize = 'py-3 px-6'

    if( btnProps.size === 'small' ) {
        btnSize = 'py-0.5 px-4 text-sm h-8'
    }

    if( btnProps.size === 'fullheight' ) {
        btnSize = 'h-full w-24'
    }

    return (
        <button 
            onClick={() => { if(onClick) onClick() }}
            className={`${btnSize} text-white rounded-md bg-${btnProps.color}-500 hover:bg-${btnProps.color}-700 transform transition-transform hover:-translate-y-0.5 hover:shadow-md`}
            type={btnProps.type} 
        >
            {btnProps.text}
        </button>
    )
}

export default BaseBtn