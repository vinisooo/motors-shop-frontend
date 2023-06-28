import "../../styles/components/pageCard/pageCard.sass"

const PageCard = ({children, className}: {children: React.ReactNode, className?:string}) => {
    return(
        <div className={`page-card ${className}`}>
            {children}
        </div>
    )
}

export default PageCard
