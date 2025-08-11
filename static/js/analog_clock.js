
(function(window) {
  'use strict';

  function analog_clock()
  {

    // main container
    const minute_hand = document.createElement("div");
    minute_hand.classList.add("clock-min-hand")

    const hour_hand = document.createElement("div");
    hour_hand.classList.add("clock-hour-hand")


    const middle_dot = document.createElement("div");
    middle_dot.classList.add("clock-middle-dot")

    const markers = document.createElement("div");
    const mark = document.createElement("div");
    mark.classList.add("clock-mark")
    for (let i = 0; i < 12; ++i)
    {
      markers.appendChild(mark.cloneNode());
    }

    const ret = document.createElement("div");
    ret.classList.add("clock")
    ret.appendChild(minute_hand);
    ret.appendChild(hour_hand);
    ret.appendChild(middle_dot);
    ret.appendChild(markers);


    function update() 
    {
      const now = new Date();
      const gmt_plus = 8;
      const gmt_date = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours() + gmt_plus,
        now.getUTCMinutes(),
        now.getUTCSeconds()
      ));
      //const seconds = gmt_date.getUTCSeconds(); 
      const minutes = gmt_date.getUTCMinutes();
      const hours = gmt_date.getUTCHours();


      const minutes_ratio = minutes / 60; //@note: always < 1
      const hours_ratio = (hours  % 12 + minutes_ratio) / 12;

      const minute_degrees = minutes_ratio * 360;
      const hour_degrees = hours_ratio * 360;
      rotate_hand(hour_hand, hour_degrees);
      rotate_hand(minute_hand, minute_degrees);
    }

    function rotate_hand(hand_element, degrees) 
    {
      hand_element.style.transform = `translate(-50%, 0%) rotate(${degrees}deg)`;
    }
    setInterval(update, 1001);
    return ret;

  }

  content.appendChild(analog_clock());

})(window);
