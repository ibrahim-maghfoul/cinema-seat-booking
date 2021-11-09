const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI();

/* Functions */
function updateSelectedCount() {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");
  /* Saving Localy */
  const seatsIndex = [...selectedSeat].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  //   console.log(localStorage.getItem("selectedSeats"));
  count.innerHTML = selectedSeat.length;
  total.innerHTML = selectedSeat.length * ticketPrice;
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  //   console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

/* Events */
movieSelect.addEventListener("change", (event) => {
  ticketPrice = +event.target.value;
  setMovieData(event.target.selectedIndex, event.target.value);
  //   console.log(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
});
container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

updateSelectedCount();
