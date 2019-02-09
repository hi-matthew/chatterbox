const getTimestamp = () => {
  const date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();
  time = time.split(' ')

  if (time[0].length > 7) {
    time = time[0]
      .slice(0, 5)
      .concat(' ')
      .concat(time[1]);
  } else {
    time = time[0]
      .slice(0, 4)
      .concat(' ')
      .concat(time[1]);
  }

  return { date, time };
}

export default getTimestamp;