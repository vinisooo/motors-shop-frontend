const getInitials=(name:string)=>{

    const names=name.split(" ")

    let iniciais

    switch (names.length) {
        case 1:
            iniciais= names[0][0]
            break;
        default:
            iniciais=names[0][0]+names[1][0]
            break;
    }
    return iniciais
}

export default getInitials