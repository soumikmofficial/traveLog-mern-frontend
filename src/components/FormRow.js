import React from "react";

function FormRow({ type, name, handleChange, value }) {
  return (
    <div className="form-group">
      <input
        required
        type={type}
        id={name}
        name={name}
        placeholder={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default FormRow;
