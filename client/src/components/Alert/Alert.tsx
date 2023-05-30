type AlertProps = {
  text: string
  status: string
}
const Alert = ({ text, status }: AlertProps) => {
  return <div className={`alert alert-wrapper alert-${status}`}>{text}</div>
}
export default Alert
