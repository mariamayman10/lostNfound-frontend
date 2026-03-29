function Btn({
  onClick,
  classN,
  children,
}) {
  return (
    <button
      className={`${classN} border px-6 py-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Btn;
