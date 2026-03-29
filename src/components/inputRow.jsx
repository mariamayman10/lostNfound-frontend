function InputRow({labelTxt, label, type, onChange}) {
  return (
    <div className={`input-row px-[2.5px] w-full sm:w-1/2 mb-4 sm:mb-0`}>
      <label htmlFor={label} className="block">
        {labelTxt}
      </label>
      <input
        type={type}
        id={label}
        name={label}
        required
        className="mt-2 px-4 py-2 rounded-2xl w-full border border-[#ff9800]"
        onChange={onChange}
      />
    </div>
  );
}

export default InputRow
