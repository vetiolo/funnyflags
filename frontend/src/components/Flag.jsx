import "../styles/Flag.css";

export const Flag = ({ country_code }) => {
  return <img src={`/src/assets/flags/${country_code}.svg`} className="flag" />;
};
