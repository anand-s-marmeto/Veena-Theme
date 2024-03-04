// const cartCountDowndata = document.querySelector(".drawer__cart-items-wrapper");
// console.log(data.dataset.date)
let CrequiredDate = "2024/08/23";
//console.log(requiredDate)
var countDownDateC = new Date(CrequiredDate).getTime();
//console.log(countDownDateC)

// Update the countdown every 1 second
let Cx = setInterval(function () {
  // Get the current date and time
  let now = new Date().getTime();

  // Calculate the remaining time
  let distanceC = countDownDateC - now;
  //console.log(distance)

  // Calculate days, hours, minutes, and seconds
  let Cdays = Math.floor(distanceC / (1000 * 60 * 60 * 24));
  let Chours = Math.floor(
    (distanceC % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let Cminutes = Math.floor((distanceC % (1000 * 60 * 60)) / (1000 * 60));
  let Cseconds = Math.floor((distanceC % (1000 * 60)) / 1000);

  // Display the countdown
  // document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  if (document.querySelector(".drawer__cart-items-wrapper .days")) {
    document.querySelector(".drawer__cart-items-wrapper .days").textContent =
      Cdays;
    document.querySelector(".drawer__cart-items-wrapper .hours").textContent =
      Chours;
    document.querySelector(".drawer__cart-items-wrapper .mins").textContent =
      Cminutes;
    document.querySelector(".drawer__cart-items-wrapper .secs").textContent =
      Cseconds;
  }

  if (document.querySelector(".drawer__footer .days")) {
    document.querySelector(".drawer__footer .days").textContent = Cdays;
    document.querySelector(".drawer__footer .hours").textContent = Chours;
    document.querySelector(".drawer__footer .mins").textContent = Cminutes;
    document.querySelector(".drawer__footer .secs").textContent = Cseconds;
  }

  // If the countdown is over, display a message
  if (distanceC < 0) {
    clearInterval(Cx);
    // document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);
