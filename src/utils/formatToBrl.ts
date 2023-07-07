const formatToPrice = (price: string | number) => {
    const priceNumber = Number(price)
    if(!priceNumber){
        return price
    }
    const formattedNumber = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceNumber);
    return formattedNumber;
}

export default formatToPrice