import React, { useState } from 'react';

interface ToggleRadioButtonProps {
    label: string;
    borderColor?: string;
}

const ToggleRadioButton: React.FC<ToggleRadioButtonProps> = ({ label, borderColor = '#721013' }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="radio-container w-full mb-3" onClick={handleToggle}>
            <input
                type="radio"
                checked={isChecked}
                onChange={handleToggle}
                className="custom-radio"
                style={{ display: 'none' }} // Hide default radio button
            />
            <label style={{ color: borderColor, cursor: 'pointer',  fontSize: "26px", fontWeight: "bold"}}>
                <span
                    style={{
                        display: 'inline-block',
                        width: '26px', // Increased width for more spacing
                        height: '26px', // Increased height for more spacing
                        border: `2px solid ${borderColor}`,
                        borderRadius: '50%', // Makes it circular
                        backgroundColor: isChecked ? 'transparent' : 'transparent', // No background filled
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
                                width: '14px', // Inner circle size
                                height: '14px', // Inner circle size
                                borderRadius: '50%',
                                backgroundColor: borderColor, // Inner filled circle color
                                transform: 'translate(-50%, -50%)', // Center it
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