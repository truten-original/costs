type SpinnerProps = {
  top: number
  left: number
}
const Spinner = ({ top, left }: SpinnerProps) => {
  return (
    <div
      style={{ top: `${top}px`, left: `${left}px` }}
      className="spinner-border main-sppinner"
      role="status"
    ></div>
  )
}

export default Spinner
