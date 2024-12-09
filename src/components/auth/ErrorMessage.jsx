import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ errors, field }) => {
    // Convert errors object into an array of formatted errors
    const formattedErrors = Object.entries(errors).map(([key, value]) => ({
        key,
        value,
    }));

    // Helper function to get the error message
    const getErrorMessage = (arr) => arr.toString();

    // Find the error matching the field
    const fieldError = formattedErrors.find((error) => error.key === field);

    return (
        <div className="py-0.5">
            {fieldError && (
                <div className="text-danger flex max-w-full items-center">
                    <span className="text-pink-600 text-sm">{getErrorMessage(fieldError.value)}</span>
                </div>
            )}
        </div>
    );
};

// Prop types validation
ErrorMessage.propTypes = {
    errors: PropTypes.object.isRequired,
    field: PropTypes.string.isRequired,
};

export default ErrorMessage;
