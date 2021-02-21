var Countdown= setInterval(this.counter,1000);


function StopCountdown(){
  return clearInterval(Countdown);
}

export default {
  Countdown,
  StopCountdown
};
