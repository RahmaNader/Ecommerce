interface ToggleRadioButtonProps {
    label: string;
    isChecked: boolean;  // Prop to control checked state
    onChange?: () => void; // Function to toggle state
    borderColor?: string;
    onClick?: () => void;  // Add this to allow `onClick` as an optional prop

}

const ToggleRadioButton: React.FC<ToggleRadioButtonProps> = ({
    label,
    isChecked,
    onChange,
    borderColor = '#721013'
}) => {
    return (
        <div className="radio-container w-full " onClick={onChange}>
            <input
                type="radio"
                checked={isChecked}
                onChange={onChange}
                className="custom-radio"
                style={{ display: 'none' }} // Hide default radio button
            />
            <label style={{ color: borderColor, cursor: 'pointer', fontSize: "18px", fontWeight: "bold", fontFamily: "Poppins" }}>
                <span
                    style={{
                        display: 'inline-block',
                        width: '26px', // Increased width for more spacing
                        height: '26px', // Increased height for more spacing
                        border: `2px solid ${borderColor}`,
                        borderRadius: '50%',
                        backgroundColor: isChecked ? 'transparent' : 'transparent',
                        position: 'relative',
                        marginRight: '8px', // Space between circle and label
                    }}
                >
                    {isChecked && (
                        <span
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '14px',
                                height: '14px',
                                borderRadius: '50%',
                                backgroundColor: borderColor,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    )}
                </span>
                {label}
            </label>
        </div>
    );
};

export default ToggleRadioButton;
