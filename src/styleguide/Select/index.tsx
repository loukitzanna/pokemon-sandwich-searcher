const Select = ({ options, placeholder }) => {
    return (
        <div>
            <div>{placeholder}</div>
            {
                options.map((option) => <div>{option}</div>)
            }
        </div>
    )
}
export default Select;