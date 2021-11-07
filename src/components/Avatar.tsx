import React from 'react'

function Avatar({ src, alt, size, addedClass }: { src: string; alt: string; size?: string; addedClass?: string; }) {
    let imgSize = "h-12 w-12"

    if( size === 'small' ) {
        imgSize = "h-8 w-8"
    }

    return (
        <img 
            className={`rounded-full ${imgSize} ${addedClass}`}
            src={src} 
            alt={alt}
        />
    );
}


export default Avatar
