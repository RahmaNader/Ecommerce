interface ToggleRadioButtonProps {
    label: string;
    isChecked: boolean;  
    onChange?: () => void; 
    borderColor?: string;
    onClick?: () => void; 
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
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
        >
            <input
                type="radio"
                checked={isChecked}
                onChange={onChange}
                className="custom-radio"
                style={{ display: 'none' }} 
            />
            <span
                style={{
                    display: 'inline-block',
                    width: '24px', 
                    height: '24px',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '50%',
                    backgroundColor: isChecked ? 'transparent' : 'transparent',
                    position: 'relative',
                    marginRight: '10px', 
                    marginLeft: '10px',
                    flexShrink: 0,
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
