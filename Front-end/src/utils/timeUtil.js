export const convertTime = (props) => {
  const old = new Date(props);
  const now = new Date();
  const diff = now.getTime() - old.getTime();
  const diffDays = Math.floor(diff / 86400000); // days
  const diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
  const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
  let time;
  if (diffDays > 1) {
    time = Math.floor(diffDays) + "j";
  } else if (diffHrs < 24) {
    time = Math.floor(diffHrs) + "h";
  } else if (diffMins < 60) {
    time = Math.floor(diffMins) + "mn";
  }
  return time;
};
