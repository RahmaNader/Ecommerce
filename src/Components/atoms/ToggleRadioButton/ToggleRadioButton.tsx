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
        <div 
            className="radio-container w-full" 
            onClick={onChange} 
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} // Flex container
        >
            <input
                type="radio"
                checked={isChecked}
                onChange={onChange}
                className="custom-radio"
                style={{ display: 'none' }} // Hide default radio button
            />
            <span
                style={{
                    display: 'inline-block',
                    width: '24px', // Increased width for more spacing
                    height: '24px', // Increased height for more spacing
                    border: `1px solid ${borderColor}`,
                    borderRadius: '50%',
                    backgroundColor: isChecked ? 'transparent' : 'transparent',
                    position: 'relative',
                    marginRight: '8px', // Space between circle and label
                    flexShrink: 0 // Prevent shrinking of the radio button
                }}
            >
                {isChecked && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: borderColor,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                )}
            </span>
            <label 
                style={{ 
                    color: borderColor, 
                    fontSize: "18px", 
                    fontWeight: "bold", 
                    fontFamily: "Poppins" 
                }}
            >
                {label}
            </label>
        </div>
    );
};

export default ToggleRadioButton;
