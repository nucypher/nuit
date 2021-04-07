export const light = {
    name: "light",
    colors:{
        body: '#F3F4F4',
        background: '#FFFFFF',
        extrabg: '#E9EDF0',
        text:{
            standard: '#111111',
            primary: '#1E65F3',
            grey75: '#828A9C',
        },
        blue: '#1E65F3',
        purple: '#6B32D8',
        shadow: '0px 16px 40px -16px rgba(55, 55, 55, 0.3)'
    },
    buttons:{
        primary: {
            background: '#1E65F3',
            text: {
                main:'#FFFFFF',
                sub: 'rgba(255, 255, 255, 0.4)',
            },
            border: 'none'
        },
        secondary: {
            background: 'none',
            text: {
                main:'#1E65F3',
                sub: 'rgba(30, 101, 243, 0.4)',
            },
            border: '2px solid #1E65F3'
        },
        disabled: {
            background: 'none',
            text: {
                main:'#828A9C',
                sub: '#828A9C'
            },
            border: '2px solid #E0E4E8',
        }
    }
}

export const dark = {
    name: "dark",
    colors:{
        body: '#19191C',
        background: '#111111',
        extrabg: '#1D1D21',
        text:{
            standard: '#FFFFFF',
            primary: '#1E65F3',
            grey75: '#828A9C',
        },
        blue: '#1E65F3',
        purple: '#6B32D8',
        shadow: '0px 16px 40px -16px rgba(55, 55, 55, 0.3)'
    },
    buttons:{
        primary: {
            background: '#1E65F3',
            text: {
                main:'#FFFFFF',
                sub: 'rgba(255, 255, 255, 0.4)',
            },
            border: 'none'
        },
        secondary: {
            background: 'none',
            text: {
                main:'#1E65F3',
                sub: 'rgba(30, 101, 243, 0.4)',
            },
            border: '2px solid #1E65F3',
        },
        disabled: {
            background: 'none',
            text: {
                primary:'#828A9C',
                secondary: '#828A9C'
            },
            border: '2px solid #323537'
        }
    }
}